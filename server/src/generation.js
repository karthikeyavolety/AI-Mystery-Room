import { GoogleGenerativeAI } from '@google/generative-ai';
import { Mystery, GenerationJob } from './models.js';
import { z } from 'zod';

const schema = z.object({ title: z.string().min(3).max(100), incident: z.object({ description: z.string(), location: z.string(), occurredAt: z.string() }), background: z.string(), suspects: z.array(z.object({ id: z.string(), name: z.string(), role: z.string(), profile: z.string(), motive: z.string(), alibi: z.string() })).min(3).max(8), timeline: z.array(z.object({ time: z.string(), title: z.string(), description: z.string() })).min(3), evidence: z.array(z.object({ id: z.string(), type: z.enum(['CHAT','DOCUMENT','IMAGE','AUDIO','STATEMENT']), title: z.string(), description: z.string(), content: z.union([z.string(), z.array(z.object({ sender: z.string(), time: z.string(), text: z.string() }))]), suspectIds: z.array(z.string()) })).min(3), solution: z.object({ culpritId: z.string(), motive: z.string(), explanation: z.string(), decisiveEvidenceIds: z.array(z.string()).min(1) }) });

export async function generateMystery(mysteryId, jobId) {
 const mystery = await Mystery.findById(mysteryId);
 const job = await GenerationJob.findById(jobId);
 try {
  if (!process.env.GEMINI_API_KEY) throw Object.assign(new Error('Mystery generation is unavailable because Gemini is not configured. Add GEMINI_API_KEY to the server environment, then retry.'), { code: 'AI_NOT_CONFIGURED' });
  await Promise.all([Mystery.updateOne({ _id: mysteryId }, { status: 'GENERATING_CASE' }), GenerationJob.updateOne({ _id: jobId }, { status: 'GENERATING_CASE', stage: 'GENERATING_CASE', progressPercentage: 20, startedAt: new Date() })]);
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = ai.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash', generationConfig: { responseMimeType: 'application/json', temperature: 0.75 } });
  const prompt = `Build a fair, fictional, solvable detective mystery from this scenario. Establish the canonical solution first, then make all evidence consistent with it. Give exactly ${mystery.suspectCount || 4} suspects. Include at least one corroborating clue and one explainable contradiction. Do not put the culprit in the public-facing case description. Evidence types requested: ${(mystery.evidenceTypes || ['CHAT','DOCUMENT','STATEMENT']).join(', ')}. Difficulty: ${mystery.difficulty}; genre: ${mystery.genre}. Return ONLY JSON matching this structure: {title, incident:{description,location,occurredAt}, background, suspects:[{id,name,role,profile,motive,alibi}], timeline:[{time,title,description}], evidence:[{id,type,title,description,content,suspectIds}], solution:{culpritId,motive,explanation,decisiveEvidenceIds}}. Chat content should be an array of {sender,time,text}; other content can be a string. IDs must be unique and references valid. Scenario: ${mystery.scenario}`;
  const response = await model.generateContent(prompt);
  const result = schema.parse(JSON.parse(response.response.text()));
  const activeJob = await GenerationJob.findById(jobId);
  if (!activeJob || activeJob.status === 'CANCELLED') return;
  const suspectIds = new Set(result.suspects.map(s => s.id)); const evidenceIds = new Set(result.evidence.map(e => e.id));
  if (!suspectIds.has(result.solution.culpritId) || result.evidence.some(e => e.suspectIds.some(id => !suspectIds.has(id))) || result.solution.decisiveEvidenceIds.some(id => !evidenceIds.has(id))) throw new Error('The generated case did not pass consistency checks. Please retry.');
  const publicCase = { incident: result.incident, background: result.background };
  await Mystery.updateOne({ _id: mysteryId }, { $set: { title: result.title, publicCase, suspects: result.suspects.map(s => ({ _id: s.id, name: s.name, role: s.role, publicProfile: s.profile, publicMotive: s.motive, claimedAlibi: s.alibi })), evidence: result.evidence.map(e => ({ _id: e.id, type: e.type, title: e.title, description: e.description, content: e.content, relatedSuspectIds: e.suspectIds })), timeline: result.timeline, canonicalSolution: { culpritId: result.solution.culpritId, motive: result.solution.motive, solutionExplanation: result.solution.explanation, decisiveEvidenceIds: result.solution.decisiveEvidenceIds }, status: 'READY', progress: { reviewedEvidenceIds: [], flaggedEvidenceIds: [], generalNotes: '' } } });
  await GenerationJob.updateOne({ _id: jobId }, { status: 'READY', stage: 'READY', progressPercentage: 100, completedAt: new Date() });
 } catch (error) {
  const latestJob = await GenerationJob.findById(jobId);
  if (!latestJob || latestJob.status === 'CANCELLED') return;
  const safeMessage = error.code === 'AI_NOT_CONFIGURED' ? error.message : 'We couldn’t validate this generated case. Check the scenario and try again.';
  await Promise.all([Mystery.updateOne({ _id: mysteryId }, { status: 'FAILED' }), GenerationJob.updateOne({ _id: jobId }, { status: 'FAILED', stage: 'FAILED', errorCode: error.code || 'GENERATION_FAILED', message: safeMessage, completedAt: new Date() })]);
 }
}
