# AI MYSTERY
## Master Product & Technical Specification

**Document:** `SPEC.md`  
**Version:** 1.0.0  
**Project Type:** AI-Powered Interactive Mystery Investigation Platform  
**Development Methodology:** Spec-Driven Development (SDD)  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Provider:** Google Gemini API  
**Language:** JavaScript with ES Modules  
**API Architecture:** REST  
**Primary Audience:** Users who enjoy mystery solving, detective stories, investigative challenges, and interactive puzzles.

---

# 1. SINGLE SOURCE OF TRUTH

## 1.1 Purpose

This document defines the complete requirements, architecture, behavior, data models, interfaces, security policies, design system, testing strategy, and acceptance criteria for AI Mystery.

Every implementation decision must follow this specification.

The following rules apply to all development work:

1. `SPEC.md` is the authoritative source of truth.
2. No feature may be silently omitted, simplified, or replaced with a nonfunctional placeholder.
3. All buttons, forms, menus, filters, interactions, and navigation elements must perform their documented functions.
4. All persistent data must use the appropriate backend and database operations.
5. AI-generated content must be validated before it becomes a playable mystery.
6. The frontend must never receive the canonical answer or hidden solution before the investigation is completed.
7. The backend must enforce game rules regardless of frontend behavior.
8. Secrets, API keys, internal prompts, and database credentials must never be exposed to the browser.
9. Every API endpoint must implement appropriate validation, authorization, and error handling.
10. All major features must have automated tests.
11. No fake success messages, hardcoded production data, or simulated backend operations may be used in place of required functionality.
12. If a requirement cannot be implemented as written because of a technical limitation, document the limitation and implement the closest secure, functional alternative without silently changing the specification.

## 1.2 Requirement Priority

Requirements are classified as follows:

- **P0 — Critical:** Required for a playable and secure application.
- **P1 — Important:** Required for a complete initial release.
- **P2 — Enhancement:** Optional future functionality that must not block the initial release.

P0 and P1 requirements are mandatory for the initial production release.

## 1.3 Development Completion Rule

A feature is not complete merely because its interface exists.

A feature is complete only when:

- Its interface is implemented.
- Its backend behavior works.
- Its data is persisted when necessary.
- Its loading, empty, success, and error states are implemented.
- Its security requirements are satisfied.
- Its acceptance tests pass.
- Its responsive behavior is verified.

---

# 2. PROJECT OVERVIEW

## 2.1 Project Name

AI Mystery

## 2.2 Product Concept

AI Mystery is an AI-powered interactive investigation platform that transforms a user's short story or scenario into a complete fictional mystery.

The platform uses Google Gemini to generate an investigation containing:

- A fictional crime or mysterious incident.
- A list of suspects.
- Background information about the incident.
- Suspect profiles and motives.
- Timelines and alibis.
- WhatsApp-style conversations.
- Photographic evidence.
- Scanned documents.
- Audio recordings and transcripts.
- Witness statements.
- Contradictions and hidden clues.
- An investigation challenge.
- A final culprit and explanation.

The player investigates the case by examining evidence, comparing statements, identifying contradictions, and selecting the person they believe is responsible.

The platform then evaluates the player's accusation and provides an explanation of the solution.

**The objective is to turn an ordinary story into a playable detective investigation.**

## 2.3 Example User Journey

A user enters the following scenario:

"Five college students attended a farewell party. At 9:30 PM, the college trophy disappeared from a locked room. Everyone claims they were somewhere else, but one student is lying."

The user selects the mystery difficulty and clicks **Generate Mystery**.

The backend uses Gemini to create a complete fictional case.

The generated investigation includes:

1. Case briefing describing the missing trophy.
2. Five suspect profiles.
3. A timeline covering the events surrounding the disappearance.
4. WhatsApp-style conversations between suspects.
5. A photograph showing the room before the incident.
6. A scanned visitor register.
7. An audio recording of a witness interview.
8. Conflicting alibis and hidden clues.
9. A final culprit and the reasoning behind the crime.

The user examines the evidence, forms a theory, and accuses one suspect.

The system checks the accusation against the hidden solution and explains why the answer is correct or incorrect.

All people, incidents, messages, and evidence in this example are fictional.

---

# 3. PRODUCT OBJECTIVES

## 3.1 Primary Objectives

The application must:

1. Allow users to submit custom mystery scenarios.
2. Convert scenarios into structured, playable investigations.
3. Use Gemini as the primary intelligence engine for mystery creation.
4. Generate multiple evidence types for every investigation.
5. Maintain consistency across all generated evidence.
6. Allow users to inspect evidence through an interactive interface.
7. Allow users to submit a final accusation.
8. Evaluate the accusation against the canonical solution.
9. Explain the solution using evidence from the investigation.
10. Save investigations and player progress.
11. Provide a premium, responsive, immersive detective experience.

## 3.2 Non-Goals for the Initial Release

The following features are outside the mandatory initial scope:

- Real police investigations.
- Access to real WhatsApp accounts or private messages.
- Real criminal identification.
- Real-world surveillance.
- Multiplayer cooperative investigations.
- User-generated public mystery marketplaces.
- Live voice conversations with suspects.
- Paid subscriptions and billing.
- Social feeds and public leaderboards.

The application is a fictional entertainment product, not a forensic or law-enforcement tool.

---

# 4. USER ROLES

## 4.1 Guest User

A guest user may:

- Visit the landing page.
- Learn how the application works.
- View available demonstration content.
- Access registration and login.

Guest users cannot save private investigations or access another user's data.

Whether anonymous gameplay is enabled must be controlled by an explicit application configuration.

## 4.2 Registered User

A registered user may:

- Create an investigation from a custom scenario.
- Select investigation settings.
- Play generated mysteries.
- Examine available evidence.
- Record personal investigation notes.
- Mark evidence as reviewed.
- Maintain a list of suspects they consider suspicious.
- Submit an accusation.
- View the final explanation after the game ends.
- Revisit completed investigations.
- Delete their own investigations.
- Manage their account and preferences.

## 4.3 Administrator

An administrator may have access to:

- System health information.
- Generation failure statistics.
- AI usage and cost metrics.
- Moderation and abuse reports.
- Operational logs.

Administrator access is not required for normal gameplay.

Administrative endpoints must use separate authorization controls. Ordinary users must never gain administrative access by changing frontend values or request parameters.

---

# 5. CORE USER WORKFLOW

The application must implement the following end-to-end workflow.

## Step 1: Landing Page

The user visits the website and sees:

- Product introduction.
- A clear description of how AI Mystery works.
- A primary "Create a Mystery" action.
- A secondary "Explore Demo" action.
- Example evidence cards.
- Feature highlights.
- Frequently asked questions.

## Step 2: Create Mystery

The user opens the mystery creation page.

The user enters a scenario and configures the investigation.

Required input:

- Scenario description.

Optional inputs:

- Mystery title.
- Genre.
- Difficulty.
- Desired number of suspects.
- Investigation setting.
- Desired evidence types.
- Language.
- Optional thematic preferences.

The application must provide sensible defaults for optional settings.

## Step 3: Validate Scenario

The backend validates:

- Scenario length.
- Required fields.
- Supported difficulty.
- Supported genre.
- Suspect count limits.
- Requested evidence types.
- User permissions.
- Rate limits.

Invalid scenarios must produce actionable validation errors.

The backend must not accept unlimited text or arbitrary generation parameters.

## Step 4: Generate Investigation

The backend creates a generation job.

The job progresses through the following states:

`QUEUED → GENERATING_CASE → GENERATING_EVIDENCE → VALIDATING → READY`

Other permitted terminal states:

- `FAILED`
- `CANCELLED`

A failed generation must never be presented as a playable investigation.

The frontend displays generation progress and handles delayed responses without requiring the user to repeatedly submit the scenario.

## Step 5: Review Case Briefing

When generation succeeds, the user sees:

- Case title.
- Incident description.
- Case background.
- Incident time and location.
- List of suspects.
- Initial investigative objectives.
- Available evidence categories.

The canonical culprit and complete solution remain hidden.

## Step 6: Investigate Evidence

The user opens individual evidence items.

The application supports:

- Reading messages.
- Inspecting images.
- Reading scanned documents.
- Playing audio where actual audio assets are available.
- Reading transcripts when available.
- Reviewing witness statements.
- Examining timelines.
- Recording notes.
- Flagging suspicious evidence.
- Comparing evidence across suspects.

Each evidence item must have a unique identifier and a stable reference to the case.

## Step 7: Build a Theory

The user can record:

- Suspects they consider suspicious.
- Suspected motives.
- Important clues.
- Contradictions.
- Personal notes.

These are investigative aids. They must not reveal the hidden solution.

## Step 8: Submit Accusation

The user selects one suspect and submits a final accusation.

The backend verifies that:

- The case belongs to the user.
- The case is ready for gameplay.
- The case has not already been completed.
- The selected suspect belongs to that case.
- The accusation is valid.
- The request satisfies the game's attempt policy.

The initial release should allow one final accusation per investigation.

The attempt policy must be configurable on the server.

## Step 9: Evaluate Result

The backend compares the selected suspect with the canonical culprit.

It returns the result and, if the investigation is complete, the appropriate explanation.

The system must not evaluate an accusation using a new Gemini call that independently guesses the culprit.

The answer must be determined from the previously established canonical solution.

## Step 10: Reveal the Solution

After the final accusation, the user can see:

- Whether the accusation was correct.
- The culprit's identity.
- The motive.
- The sequence of events.
- The decisive evidence.
- The important contradictions.
- Why alternative suspects were less likely.
- The complete explanation of the mystery.

The solution must reference evidence IDs and factual details that exist in the investigation.

## Step 11: Save and Revisit

The completed investigation is saved to the user's account.

The user can reopen it and review its evidence and solution.

Deleting an investigation must remove or appropriately anonymize its associated user-owned data according to the application's retention policy.

---

# 6. FUNCTIONAL REQUIREMENTS

## FR-001: Authentication — P0

Implement secure user registration, login, logout, and session management.

Requirements:

- Unique email addresses.
- Secure password hashing if passwords are used.
- Server-side authorization.
- Protected user routes.
- Protected investigation resources.
- Appropriate session expiration.
- Secure cookie settings when cookie-based authentication is used.
- Account deletion.
- Authentication error handling.

Passwords must never be stored in plaintext.

If a managed authentication provider is used, it must be explicitly configured and integrated rather than simulated.

## FR-002: Mystery Creation — P0

Users must be able to submit a custom scenario.

The system must support configurable mystery parameters and validate them on the server.

The scenario must serve as the foundation of the generated investigation.

Gemini must not replace the user's central premise with an unrelated story.

## FR-003: AI Case Generation — P0

Generate a structured investigation containing:

- Case metadata.
- Incident description.
- Suspects.
- Motives.
- Relevant relationships.
- Timeline.
- Canonical culprit.
- Canonical event sequence.
- Evidence plan.
- Investigation hints.
- Final explanation.

The generation process must produce structured data rather than an unvalidated block of prose.

## FR-004: Evidence Generation — P0

Generate evidence associated with the case.

Supported evidence types:

1. `CHAT`
2. `IMAGE`
3. `DOCUMENT`
4. `AUDIO`
5. `TRANSCRIPT`
6. `WITNESS_STATEMENT`
7. `TIMELINE`
8. `PHYSICAL_EVIDENCE`

Every generated item must be fictional and connected to the case.

The application must clearly distinguish actual generated media from text-based representations.

## FR-005: Evidence Viewer — P0

The frontend must display each evidence type using an appropriate viewer.

Examples:

- Chat viewer for messaging evidence.
- Image viewer with zoom for image evidence.
- Document viewer for scanned records.
- Audio player for playable audio.
- Transcript reader for audio transcripts.
- Timeline viewer for chronological events.

Unsupported or unavailable media must produce a clear fallback state.

## FR-006: Suspect Management — P0

Display the suspects and their public investigative profiles.

Each profile may contain:

- Name.
- Fictional age, where appropriate.
- Occupation or role.
- Relationship to the incident.
- Publicly known motive.
- Stated alibi.
- Relevant background.
- Associated evidence.

The profile must not expose hidden solution fields.

## FR-007: Investigation Workspace — P0

Provide a unified workspace where users can:

- Open evidence.
- Switch between evidence items.
- Search evidence by title or content.
- Filter by evidence type.
- Mark evidence as reviewed.
- Write investigation notes.
- Flag suspicious items.
- Review suspects.
- Access the case timeline.

Investigation progress must persist across sessions.

## FR-008: Final Accusation — P0

Provide a dedicated accusation screen.

The user selects one suspect and confirms the decision.

The backend evaluates the selection against the canonical answer.

The application must prevent unauthorized changes to the answer or attempt state.

## FR-009: Solution Reveal — P0

The system must provide a coherent explanation supported by existing case evidence.

The solution must identify the decisive clues and explain how they establish the culprit's responsibility.

## FR-010: Dashboard — P1

The dashboard displays:

- Total investigations created.
- Active investigations.
- Completed investigations.
- Recent cases.
- Case status.
- Last activity.
- Actions to continue or revisit a case.

These statistics must be calculated from actual persisted data.

## FR-011: Search and Filtering — P1

Users must be able to search their own investigations and filter by:

- Case status.
- Genre.
- Difficulty.
- Creation date.

Search must not expose another user's private investigations.

## FR-012: Generation Recovery — P0

If an AI request fails:

- Record the failure safely.
- Preserve the original scenario.
- Retry only where appropriate.
- Prevent duplicate case creation.
- Display a meaningful error.
- Allow the user to retry generation.
- Ensure partially generated cases cannot be played.

## FR-013: Demo Experience — P1

Provide at least one complete, deterministic demo mystery.

The demo must contain working evidence viewers, suspects, an accusation flow, and a complete solution.

Demo content must be identified as fictional.

It must not require a successful Gemini API call every time a user opens it.

---

# 7. AI ARCHITECTURE

## 7.1 Primary AI Provider

Use the Google Gemini API through a server-side integration.

The frontend must never call Gemini directly with a secret API key.

Create a dedicated AI service layer that isolates provider-specific implementation details.

Suggested structure:

`server/src/services/ai/`

Files:

- `geminiProvider.js`
- `mysteryGenerator.service.js`
- `evidenceGenerator.service.js`
- `consistencyValidator.service.js`
- `generationOrchestrator.service.js`
- `prompts/`
- `schemas/`

The provider adapter must support configured model selection through environment variables.

Do not hardcode a model name throughout the application.

## 7.2 AI Responsibilities

Gemini is responsible for:

- Interpreting the submitted scenario.
- Developing the fictional investigation.
- Creating suspects and relationships.
- Designing the culprit's motive.
- Constructing a canonical event sequence.
- Planning evidence.
- Writing fictional messages.
- Writing witness statements.
- Creating document content.
- Describing images and other media.
- Developing clues and red herrings.
- Producing a solution explanation.
- Suggesting hints based on existing evidence.

Media generation must use a provider capability that is actually available for the configured model and API.

Do not assume every Gemini model supports image generation, audio generation, or arbitrary media output.

Where separate media-generation capabilities are needed, use a dedicated provider adapter configured on the server.

Gemini remains the primary reasoning and orchestration provider.

## 7.3 Canonical Solution Rule

**The canonical solution must be established before evidence generation begins.**

The generation pipeline must create a canonical case model containing:

- The true culprit.
- The true motive.
- The true sequence of events.
- The actual incident time.
- The actual incident location.
- Relevant relationships.
- What each suspect knows.
- What each suspect claims.
- What actually happened.
- Which evidence supports or contradicts each claim.

This model is the internal authority for all subsequent generation.

Evidence generators receive only the case facts required to create their assigned evidence.

All generated evidence is checked against the canonical model.

The frontend receives only the public case representation and evidence intended for gameplay.

## 7.4 Structured AI Output

Gemini must produce data matching explicit schemas.

Example:

{
  "title": "The Missing Trophy",
  "genre": "COLLEGE_MYSTERY",
  "difficulty": "MEDIUM",
  "incident": {
    "type": "THEFT",
    "description": "A college trophy disappears during a farewell party.",
    "location": "College auditorium",
    "occurredAt": "2026-10-24T21:30:00Z"
  },
  "suspects": [
    {
      "id": "suspect_01",
      "name": "Arjun",
      "role": "Student",
      "publicMotive": "Wanted recognition for the event.",
      "alibi": "Claims to have been backstage."
    }
  ],
  "evidencePlan": [
    {
      "id": "evidence_01",
      "type": "CHAT",
      "title": "Group Conversation",
      "purpose": "Establish a contradiction in a suspect's alibi."
    }
  ]
}

This is an illustrative schema example, not a complete mystery.

Production schemas must define every required property, data type, length limit, allowed enum, and validation rule.

The backend must reject malformed or incomplete AI responses.

Do not parse AI responses using fragile string splitting or assumptions about Markdown fences.

## 7.5 Multi-Stage Generation Pipeline

Implement the following pipeline:

**Stage 1 — Scenario Analysis**

Extract the user's premise, incident, setting, constraints, and desired mystery style.

**Stage 2 — Case Design**

Generate the canonical solution, suspects, relationships, timeline, and event sequence.

**Stage 3 — Case Validation**

Check that:

- A culprit exists.
- The culprit is a valid suspect.
- The incident has a coherent explanation.
- The timeline is possible.
- The number of suspects is within the configured limit.
- The mystery has enough evidence to support a fair accusation.

**Stage 4 — Evidence Planning**

Create a plan for each evidence item, including its purpose, content requirements, involved suspects, and relevant canonical facts.

**Stage 5 — Evidence Generation**

Generate each item using the appropriate text or media provider.

**Stage 6 — Consistency Validation**

Check every item against the canonical solution.

**Stage 7 — Mystery Quality Validation**

Verify that the intended culprit is inferable from the available evidence and that alternative suspects have plausible but distinguishable explanations.

**Stage 8 — Persistence**

Save the canonical case, public case, suspects, evidence metadata, generated assets, and initial game state.

**Stage 9 — Publication**

Set the investigation status to `READY` only after all mandatory checks succeed.

## 7.6 AI Consistency Rules

The generated investigation must satisfy these rules:

1. No suspect may appear in evidence without existing in the case.
2. No evidence may reference an unknown event or location unless explicitly identified as uncertain testimony.
3. Timestamps must be chronologically consistent with the case timeline.
4. Suspects' alibis must match their actual knowledge and the established event sequence.
5. Contradictions must be intentional and explainable.
6. Red herrings must not make the mystery impossible to solve.
7. The culprit must be supported by evidence.
8. The solution must reference existing evidence IDs.
9. Generated documents must agree with the case facts unless the document is intentionally forged or unreliable.
10. All fictional media must be clearly represented as fictional within the application.
11. Evidence must not contradict the canonical solution accidentally.
12. The culprit must not change during a generation retry or subsequent gameplay request.

A second AI validation pass may identify inconsistencies, but deterministic server-side checks must enforce structural and referential integrity.

If validation fails, the system may regenerate the affected item or the case within configured retry limits.

After repeated failures, generation must fail safely.

## 7.7 AI Generation Configuration

Support server-side configuration for:

- Gemini API credentials.
- Text-generation model.
- Media-generation provider and model.
- Maximum scenario length.
- Maximum suspect count.
- Evidence count limits.
- AI request timeout.
- Retry count.
- Generation concurrency.
- Token budgets.
- Rate limits.
- Generation cost monitoring.

Use environment variables for secrets and deployment-specific settings.

Never expose API keys or internal prompts through public endpoints, client bundles, error messages, or logs.

---

# 8. EVIDENCE GENERATION SYSTEM

## 8.1 WhatsApp-Style Messages

Generate fictional chat evidence containing:

- Conversation participants.
- Messages.
- Sender identifiers.
- Timestamps.
- Message types.
- Optional attachments.
- Relevant clues.

Example:

{
  "type": "CHAT",
  "title": "Private Conversation",
  "participants": [
    "Arjun",
    "Meera"
  ],
  "messages": [
    {
      "id": "message_01",
      "sender": "Arjun",
      "timestamp": "2026-10-24T21:12:00Z",
      "content": "Did you leave the auditorium?",
      "kind": "TEXT"
    }
  ]
}

The frontend may display the evidence in a familiar messaging interface.

However, the interface must not falsely imply that the messages were retrieved from real WhatsApp accounts.

The application must identify them as AI-generated fictional evidence.

## 8.2 Image Evidence

Images may depict:

- Crime scenes.
- Rooms.
- Objects.
- Fictional suspects.
- Relevant physical details.
- Environmental clues.

Requirements:

- Images must be associated with an evidence record.
- Generated image URLs must be stored through a supported media-storage integration.
- The database must store asset references, not large binary image data.
- Image generation must have configurable limits.
- Image viewers must support responsive sizing.
- Broken images must display an error state.
- Images must be checked for consistency with the canonical case.

If a configured image provider cannot generate the required image, the application must not pretend that a real image was produced.

A clearly labeled text-based evidence representation may be used as a fallback when permitted by the case configuration.

## 8.3 Scanned Documents

Generate fictional documents such as:

- Visitor registers.
- Incident reports.
- Receipts.
- Letters.
- Schedules.
- Notes.
- Attendance records.
- Medical-style fictional reports where appropriate for the story.

Each document must have:

- A title.
- Document type.
- Content.
- Optional date.
- Optional author.
- Optional associated suspect.
- Relevant evidence references.
- A presentation format.

The UI should display these items as document previews.

Optional document rendering may produce an image or PDF from validated content.

Documents must not be presented as authentic official records.

## 8.4 Audio Recordings

Audio evidence may include:

- Fictional witness interviews.
- Voicemail-style recordings.
- Environmental sounds.
- Spoken statements.
- Recorded conversations between fictional characters.

Audio evidence must distinguish between:

1. Actual generated audio.
2. A transcript without audio.
3. A simulated audio representation.

If actual audio generation is configured, store the resulting asset and provide a working player.

If only a transcript is available, display the transcript clearly rather than a nonfunctional audio player.

Do not use an animated waveform to imply that a real recording exists when no playable audio asset is available.

## 8.5 Evidence Metadata

Every evidence item must contain:

- Unique ID.
- Case ID.
- Evidence type.
- Title.
- Description.
- Content or asset reference.
- Related suspect IDs.
- Related event IDs.
- Creation timestamp.
- Evidence status.
- Validation status.
- Optional clue references.

Hidden validation metadata and internal generation notes must remain server-side.

## 8.6 Evidence Quality

Every mystery must have enough evidence to support a defensible accusation.

For the default medium-difficulty configuration:

- Generate 3–5 suspects.
- Generate approximately 8–12 evidence items.
- Include multiple evidence types where configured providers support them.
- Include at least 3 meaningful clues.
- Include at least 2 intentional contradictions or misleading claims when appropriate.
- Include at least one decisive connection that supports the canonical culprit.
- Ensure the solution can be derived from the available evidence.

These values must be configurable.

The generator must prioritize logical consistency over simply producing a large number of evidence items.

---

# 9. DIFFICULTY SYSTEM

Support three difficulty levels.

## EASY

- Fewer suspects.
- Shorter investigation.
- More direct clues.
- Fewer red herrings.
- Clearer contradictions.
- More explicit optional hints.

## MEDIUM

- Several plausible suspects.
- Multiple evidence categories.
- Contradictory statements.
- Moderate red herrings.
- Clues requiring cross-referencing.
- A solution supported by multiple pieces of evidence.

## HARD

- More complex relationships.
- Subtle clues.
- Interdependent evidence.
- More sophisticated misdirection.
- Timeline analysis.
- Greater emphasis on connecting information across evidence types.

Difficulty must affect the generated content, not merely change a label in the UI.

The backend must validate the resulting mystery against the selected difficulty profile.

---

# 10. APPLICATION ARCHITECTURE

## 10.1 High-Level Architecture

React Frontend  
↓ HTTPS / REST API  
Node.js + Express Backend  
↓  
Authentication and Authorization  
↓  
Application Services  
├── User Service  
├── Mystery Service  
├── Investigation Service  
├── Evidence Service  
├── AI Generation Service  
├── Validation Service  
└── Media Service  
↓  
MongoDB + Media Storage + Gemini API

All privileged operations must pass through the backend.

## 10.2 Repository Structure

Use a monorepo structure:

ai-mystery/
│
├── SPEC.md
├── README.md
├── .gitignore
├── .env.example
├── package.json
│
├── client/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── routes/
│       ├── pages/
│       ├── components/
│       ├── layouts/
│       ├── hooks/
│       ├── contexts/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       └── assets/
│
├── server/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── config/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── models/
│       ├── middleware/
│       ├── validators/
│       ├── utils/
│       ├── jobs/
│       ├── prompts/
│       └── tests/
│
└── docs/
    ├── ARCHITECTURE.md
    ├── API.md
    ├── DATA_MODEL.md
    ├── AI_PIPELINE.md
    ├── SECURITY.md
    └── TESTING.md

This structure is a baseline. Additional modules may be added when required.

Do not create empty folders or placeholder files merely to imitate the structure.

## 10.3 Frontend Technologies

Use:

- React.
- Vite.
- React Router.
- JavaScript ES Modules.
- A consistent styling system.
- A suitable icon library.
- A lightweight state-management approach.
- A centralized API client.

Use a component library or utility-first CSS framework only if it supports the defined design system without introducing unnecessary complexity.

Use reusable components and keep API logic separate from presentation components.

## 10.4 Backend Technologies

Use:

- Node.js.
- Express.js.
- MongoDB.
- Mongoose.
- Google Gemini SDK or the currently supported official API client.
- A validation library such as Zod.
- A secure authentication implementation.
- Structured logging.
- A testing framework such as Vitest or Jest.
- A supported media-storage integration.

Choose compatible stable dependency versions at implementation time.

Pin dependencies through the package manager lockfile.

## 10.5 Architectural Boundaries

Controllers must handle HTTP input and output.

Services must contain business logic.

Models must define persistence structures and indexes.

Validators must validate incoming requests and AI-generated data.

Middleware must handle cross-cutting concerns such as authentication, authorization, request limits, and error handling.

The AI provider adapter must isolate Gemini-specific behavior.

The frontend must not contain privileged business logic or the canonical solution.

Avoid putting the entire application into one controller or one large React component.

---

# 11. DATABASE DESIGN

Use MongoDB with Mongoose.

Every document must have a clear ownership model and appropriate indexes.

## 11.1 User Model

Collection: `users`

Fields:

- `_id`
- `email`
- `passwordHash`, when using password authentication
- `displayName`
- `role`
- `preferences`
- `createdAt`
- `updatedAt`
- `lastLoginAt`

Requirements:

- Email must be unique.
- Password hashes must never be exposed in API responses.
- Sensitive account data must be excluded from normal queries.
- Account deletion must follow the defined retention policy.

## 11.2 Mystery Model

Collection: `mysteries`

Fields:

- `_id`
- `ownerId`
- `title`
- `scenario`
- `genre`
- `difficulty`
- `language`
- `status`
- `generationJobId`
- `publicCase`
- `canonicalSolution`
- `timeline`
- `evidenceIds`
- `suspectIds`
- `createdAt`
- `updatedAt`
- `completedAt`

The `canonicalSolution` field contains sensitive internal information.

It must never be included in general mystery responses.

Use explicit response DTOs or projections rather than returning raw database documents.

Where appropriate, store the canonical solution in a separate collection with restricted access.

Recommended stronger isolation:

`mystery_solutions`

Fields:

- `_id`
- `mysteryId`
- `culpritSuspectId`
- `motive`
- `eventSequence`
- `decisiveEvidenceIds`
- `solutionExplanation`
- `validationMetadata`
- `createdAt`

Only authorized backend services may access this collection before completion.

## 11.3 Suspect Model

Collection: `suspects`

Fields:

- `_id`
- `mysteryId`
- `name`
- `role`
- `publicProfile`
- `publicMotive`
- `claimedAlibi`
- `relationshipSummary`
- `portraitAssetId`
- `createdAt`

Internal-only suspect knowledge may be stored separately if necessary.

The frontend must never receive hidden knowledge simply because it belongs to the suspect object.

## 11.4 Evidence Model

Collection: `evidence`

Fields:

- `_id`
- `mysteryId`
- `type`
- `title`
- `description`
- `content`
- `assetIds`
- `relatedSuspectIds`
- `relatedEventIds`
- `clueReferences`
- `validationStatus`
- `createdAt`

Evidence content must be validated according to its type.

For large media files, store asset references instead of file contents.

## 11.5 Investigation Progress Model

Collection: `investigation_progress`

Fields:

- `_id`
- `userId`
- `mysteryId`
- `reviewedEvidenceIds`
- `flaggedEvidenceIds`
- `suspectNotes`
- `generalNotes`
- `currentView`
- `lastActivityAt`
- `updatedAt`

Enforce one progress document per user and mystery.

Use a unique compound index on `{ userId, mysteryId }`.

Progress operations must be scoped to the authenticated user.

## 11.6 Accusation Model

Collection: `accusations`

Fields:

- `_id`
- `userId`
- `mysteryId`
- `selectedSuspectId`
- `isCorrect`
- `submittedAt`
- `resultExplanation`

Enforce the configured attempt policy.

For the initial one-attempt policy, prevent multiple successful accusation submissions for the same user and mystery.

The database and service layer must both defend against concurrent duplicate requests.

## 11.7 Generation Job Model

Collection: `generation_jobs`

Fields:

- `_id`
- `userId`
- `mysteryId`
- `status`
- `stage`
- `progressPercentage`
- `attemptCount`
- `errorCode`
- `createdAt`
- `startedAt`
- `completedAt`
- `updatedAt`

Do not store API keys, full secret-bearing request headers, or sensitive internal prompts in logs.

## 11.8 Media Asset Model

Collection: `media_assets`

Fields:

- `_id`
- `mysteryId`
- `evidenceId`
- `mediaType`
- `storageProvider`
- `storageKey`
- `mimeType`
- `fileSize`
- `checksum`
- `status`
- `createdAt`

Use private storage by default.

Access must be authorized through signed URLs or a secure media endpoint.

## 11.9 Database Indexes

Create indexes for:

- Unique user email.
- Mystery owner and creation date.
- Mystery owner and status.
- Evidence by mystery.
- Suspects by mystery.
- Progress by user and mystery.
- Accusations by user and mystery.
- Generation jobs by status and creation time.
- Media assets by mystery and evidence.

Index design must support the actual query patterns.

Do not index every field indiscriminately.

---

# 12. REST API SPECIFICATION

All application endpoints must use the `/api/v1` prefix.

Responses must use a consistent JSON format.

## 12.1 Standard Success Response

{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}

## 12.2 Standard Error Response

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted scenario is invalid",
    "details": []
  }
}

Never return stack traces, secrets, raw provider errors, or hidden solution fields.

## 12.3 Authentication Endpoints

`POST /api/v1/auth/register`

Register a user.

`POST /api/v1/auth/login`

Authenticate a user.

`POST /api/v1/auth/logout`

End the session.

`GET /api/v1/auth/me`

Return the authenticated user's public profile.

`DELETE /api/v1/auth/me`

Delete the user's account according to the retention policy.

## 12.4 Mystery Endpoints

`POST /api/v1/mysteries`

Create a mystery and initiate generation.

`GET /api/v1/mysteries`

Return the authenticated user's mysteries.

`GET /api/v1/mysteries/:mysteryId`

Return the public case details for an authorized user.

`DELETE /api/v1/mysteries/:mysteryId`

Delete an owned mystery and handle associated data according to the deletion policy.

`POST /api/v1/mysteries/:mysteryId/retry-generation`

Retry an eligible failed generation.

## 12.5 Generation Endpoints

`GET /api/v1/generation-jobs/:jobId`

Return generation status and progress to the authorized owner.

`POST /api/v1/generation-jobs/:jobId/cancel`

Cancel an eligible job.

Polling must be rate-limited.

The API must not report a job as complete until its case is playable.

## 12.6 Evidence Endpoints

`GET /api/v1/mysteries/:mysteryId/evidence`

Return authorized evidence metadata.

Support filtering by type.

`GET /api/v1/mysteries/:mysteryId/evidence/:evidenceId`

Return one authorized evidence item.

`GET /api/v1/mysteries/:mysteryId/suspects`

Return public suspect profiles.

`GET /api/v1/mysteries/:mysteryId/suspects/:suspectId`

Return an individual public suspect profile.

`GET /api/v1/mysteries/:mysteryId/timeline`

Return the public investigation timeline.

All evidence queries must verify ownership and case membership.

## 12.7 Progress Endpoints

`GET /api/v1/mysteries/:mysteryId/progress`

Retrieve investigation progress.

`PATCH /api/v1/mysteries/:mysteryId/progress`

Update reviewed evidence, flags, notes, and supported progress fields.

Validate all evidence IDs against the current case.

## 12.8 Accusation Endpoint

`POST /api/v1/mysteries/:mysteryId/accusations`

Example request:

{
  "suspectId": "valid-suspect-id"
}

The backend must:

1. Authenticate the user.
2. Verify ownership.
3. Verify case readiness.
4. Verify that the case has not already been completed.
5. Validate the suspect ID.
6. Read the canonical solution internally.
7. Determine correctness.
8. Persist the accusation.
9. Mark the investigation complete.
10. Return the permitted result.

Use an atomic or transactionally safe implementation to prevent duplicate submissions.

## 12.9 Solution Endpoint

`GET /api/v1/mysteries/:mysteryId/solution`

The endpoint must reject requests until the user is authorized to view the solution.

After completion, it may return:

- Culprit.
- Motive.
- Timeline explanation.
- Decisive evidence.
- Contradictions.
- Complete solution narrative.

The canonical solution must not be returned before the reveal condition is satisfied.

## 12.10 Operational Endpoints

`GET /api/v1/health`

Return application health.

A separate readiness endpoint may verify required dependencies without disclosing sensitive infrastructure details.

---

# 13. FRONTEND PAGES

## 13.1 Landing Page

Route: `/`

Sections:

- Navigation bar.
- Hero section.
- Scenario creation call to action.
- Example mystery preview.
- How it works.
- Evidence types.
- Feature highlights.
- Footer.

Primary CTA: "Create Your Mystery".

## 13.2 Authentication Pages

Routes:

- `/login`
- `/register`

Requirements:

- Form validation.
- Password visibility control.
- Loading states.
- Error feedback.
- Accessible labels.
- Redirects based on authentication state.

## 13.3 Dashboard

Route: `/dashboard`

Display:

- Welcome section.
- Create Mystery action.
- Investigation statistics.
- Recent investigations.
- Active cases.
- Completed cases.
- Empty state for new users.

## 13.4 Mystery Creation

Route: `/create`

Components:

- Scenario text area.
- Character count.
- Genre selector.
- Difficulty selector.
- Suspect count control.
- Evidence type selector.
- Optional advanced settings.
- Generate button.

The page must clearly indicate that the resulting story and evidence are fictional.

## 13.5 Generation Page

Route: `/generation/:jobId`

Display:

- Current generation stage.
- Progress indicator.
- Stage descriptions.
- Retry action when appropriate.
- Cancellation action when supported.
- Error details safe for users.

Do not fake percentage completion. If exact progress is unavailable, use stage-based progress rather than arbitrary animated percentages.

## 13.6 Case Briefing

Route: `/mysteries/:mysteryId`

Display:

- Case title.
- Incident summary.
- Public timeline.
- Suspect overview.
- Evidence count.
- Continue investigation action.

Hide all canonical solution data.

## 13.7 Investigation Workspace

Route: `/mysteries/:mysteryId/investigate`

Recommended layout:

**Left sidebar:** Case navigation and evidence categories.

**Center panel:** Selected evidence viewer.

**Right sidebar:** Suspect profiles, notes, and investigative tools.

On smaller screens, sidebars must become collapsible panels or accessible drawers.

The interface must support keyboard navigation and clear focus states.

## 13.8 Accusation Page

Route: `/mysteries/:mysteryId/accuse`

Display:

- Suspect selection.
- Confirmation dialog.
- Warning that the accusation is final.
- Submission loading state.
- Error recovery.

## 13.9 Results Page

Route: `/mysteries/:mysteryId/results`

Display:

- Correct or incorrect result.
- Culprit profile.
- Motive.
- Timeline reconstruction.
- Decisive clues.
- Evidence-based explanation.
- Option to review evidence.
- Option to return to the dashboard.

## 13.10 Settings Page

Route: `/settings`

Include supported account preferences and account deletion.

Do not display nonfunctional settings controls.

---

# 14. UI/UX DESIGN SYSTEM

## 14.1 Design Direction

Create a premium investigative interface inspired by modern detective tools, cybersecurity dashboards, case management software, and cinematic mystery experiences.

The design should feel immersive without sacrificing usability.

Avoid generic template-like layouts, excessive gradients, unnecessary animations, and cluttered dashboards.

## 14.2 Visual Theme

Recommended palette:

- Background: `#0B0D12`
- Primary surface: `#121722`
- Secondary surface: `#191F2B`
- Border: `#293243`
- Primary text: `#F3F5F8`
- Secondary text: `#A5AFBF`
- Accent: `#B794F6`
- Secondary accent: `#62D6C5`
- Warning: `#F4BE67`
- Error: `#F07878`
- Success: `#65D6A5`

Use CSS variables for design tokens.

The palette may be refined during implementation, but components must use centralized tokens rather than arbitrary colors.

## 14.3 Typography

Use a clear sans-serif font for interface text.

A restrained monospace font may be used for:

- Evidence IDs.
- Timestamps.
- File metadata.
- Case reference numbers.

Maintain readable font sizes, spacing, and contrast.

## 14.4 Core Components

Create reusable components for:

- Buttons.
- Form fields.
- Select controls.
- Dialogs.
- Tooltips.
- Badges.
- Cards.
- Tabs.
- Drawers.
- Toast notifications.
- Skeleton loaders.
- Empty states.
- Error states.
- Pagination, where necessary.
- Evidence cards.
- Suspect cards.
- Timeline events.
- Chat messages.
- Document previews.
- Media viewers.

## 14.5 Interaction Rules

Every interactive element must have:

- A defined action.
- A visible interactive state.
- Keyboard accessibility.
- Appropriate loading behavior.
- Error handling when relevant.

Avoid buttons that do nothing.

Avoid clickable-looking elements without real functionality.

Avoid browser alert boxes for routine application interactions; use consistent application dialogs and notifications.

## 14.6 Responsive Requirements

Support:

- Small mobile screens.
- Large mobile screens.
- Tablets.
- Laptops.
- Desktop monitors.

Use responsive layouts and fluid sizing.

Prevent:

- Horizontal overflow.
- Clipped dialogs.
- Unreadable evidence.
- Overlapping controls.
- Unusable mobile sidebars.

The investigation workspace must remain usable on mobile.

## 14.7 Accessibility

Target WCAG 2.2 AA where practical.

Implement:

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Accessible form labels.
- Appropriate contrast.
- Screen-reader descriptions.
- Accessible modal behavior.
- Reduced-motion support.

---

# 15. SECURITY REQUIREMENTS

Security is mandatory, not optional.

## 15.1 Authentication and Authorization

- Enforce authentication on protected endpoints.
- Verify resource ownership on every private resource request.
- Never rely on frontend route protection alone.
- Prevent insecure direct object reference vulnerabilities.
- Restrict administrator operations.
- Prevent session fixation and insecure cookie configurations.

## 15.2 API Security

- Validate request bodies, parameters, and query strings.
- Apply rate limits to authentication and AI generation.
- Limit request sizes.
- Configure CORS for approved origins.
- Use secure HTTP headers.
- Avoid leaking internal errors.
- Prevent mass assignment.
- Apply appropriate request timeouts.

## 15.3 AI Security

Treat all user-provided scenarios and generated content as untrusted input.

Requirements:

- Resist prompt injection.
- Separate instructions from user content.
- Do not let user input override internal system requirements.
- Validate structured outputs.
- Restrict generated output sizes.
- Do not execute generated code or shell commands.
- Do not let AI choose authorization decisions.
- Do not let AI directly modify unrestricted database records.
- Do not expose canonical solutions to the frontend before reveal.
- Do not trust AI-generated evidence without validation.

## 15.4 Media Security

- Restrict permitted media types.
- Verify file size and content type.
- Do not accept arbitrary executable uploads.
- Use private storage for user-specific content.
- Validate media URLs and provider responses.
- Avoid server-side request forgery through arbitrary asset URLs.
- Use safe media-serving headers.

## 15.5 Privacy

All mysteries are fictional entertainment content.

The system must not encourage users to submit private information about real people.

Implement reasonable retention and deletion policies.

Avoid collecting unnecessary personal information.

Logs must not contain passwords, API keys, session tokens, or unnecessary private scenario content.

## 15.6 Secret Management

Provide `.env.example` containing variable names but no real secrets.

Example:

MONGODB_URI=
GEMINI_API_KEY=
GEMINI_MODEL=
MEDIA_PROVIDER=
MEDIA_STORAGE_BUCKET=
MEDIA_STORAGE_CREDENTIALS=
SESSION_SECRET=
CLIENT_URL=
SERVER_PORT=
NODE_ENV=

Actual variable names must remain consistent across application configuration, documentation, and deployment.

Use environment-specific secret management in production.

Never commit real credentials.

---

# 16. ERROR HANDLING

Implement centralized error handling.

Supported error categories:

- `VALIDATION_ERROR`
- `AUTHENTICATION_REQUIRED`
- `ACCESS_DENIED`
- `RESOURCE_NOT_FOUND`
- `RATE_LIMIT_EXCEEDED`
- `GENERATION_IN_PROGRESS`
- `GENERATION_FAILED`
- `GENERATION_TIMEOUT`
- `INVALID_EVIDENCE`
- `INVALID_ACCUSATION`
- `CASE_NOT_READY`
- `CASE_ALREADY_COMPLETED`
- `MEDIA_UNAVAILABLE`
- `AI_PROVIDER_ERROR`
- `DATABASE_ERROR`
- `INTERNAL_SERVER_ERROR`

The frontend must display useful, non-sensitive error messages.

The backend must log technical diagnostics separately from user-facing messages.

Do not expose database stack traces or raw Gemini errors.

## 16.1 Retry Policy

Retry transient AI provider failures using bounded exponential backoff and jitter.

Do not retry:

- Invalid requests.
- Unauthorized requests.
- Invalid generated schemas without a regeneration strategy.
- Non-retryable provider errors.

Use idempotency controls for operations that may create paid AI requests.

Prevent retries from creating duplicate playable mysteries.

---

# 17. PERFORMANCE AND SCALABILITY

## 17.1 Performance Goals

Initial targets under normal operating conditions:

- Landing page should render quickly on a typical broadband connection.
- API responses for simple database-backed operations should generally complete within 500 ms, excluding external dependencies and unusually expensive queries.
- Investigation navigation should avoid unnecessary full-page reloads.
- Large media assets should load on demand.
- AI generation must not block the Express event loop.

These are engineering targets, not unconditional guarantees.

## 17.2 Generation Jobs

Do not perform long-running mystery generation inside a request that requires the browser to wait for the entire generation process.

Use a job-based workflow.

The initial implementation may use a durable database-backed job system or a dedicated queue.

If a queue such as BullMQ is used, Redis must be configured as an explicit dependency.

A simple in-memory queue is not sufficient for production deployment because jobs can disappear when the process restarts.

## 17.3 Concurrency

Implement configurable limits for:

- Simultaneous generation jobs per user.
- Global generation concurrency.
- Evidence generation concurrency.
- Provider requests per minute.
- Maximum generation retries.

## 17.4 Storage

Use MongoDB for structured application data.

Use object storage for media assets.

Avoid storing large image or audio files directly in MongoDB documents.

Implement cleanup for orphaned assets when a case is deleted.

## 17.5 Observability

Provide:

- Structured application logs.
- Generation job metrics.
- AI provider latency metrics.
- AI failure rates.
- Media generation failure metrics.
- Database health monitoring.
- Request error rates.

Logs and monitoring must avoid exposing secrets or the hidden solution to unauthorized viewers.

---

# 18. TESTING REQUIREMENTS

## 18.1 Unit Tests

Test:

- Request validation.
- Mystery state transitions.
- Case consistency rules.
- Evidence validation.
- Accusation evaluation.
- Authorization helpers.
- Error formatting.
- Canonical solution access rules.

## 18.2 Integration Tests

Test:

- Registration and login.
- Mystery creation.
- Generation job creation.
- Job status updates.
- Evidence persistence.
- Investigation progress.
- Accusation submission.
- Solution reveal.
- Mystery deletion.
- Ownership enforcement.

Use a dedicated test database or an appropriate isolated database environment.

## 18.3 AI Tests

Create a deterministic test suite using mocked AI provider responses.

Test:

- Valid structured output.
- Malformed JSON.
- Missing culprit.
- Unknown suspect references.
- Contradictory timestamps.
- Invalid evidence references.
- Failed media generation.
- Provider timeout.
- Retry exhaustion.
- Inconsistent evidence.
- Unfair or unsupported solutions.

Live Gemini tests may be run separately using an explicitly configured test key.

Normal unit tests must not require paid AI requests.

## 18.4 Frontend Tests

Test:

- Form validation.
- Authentication states.
- Mystery creation.
- Generation progress.
- Evidence viewers.
- Suspect selection.
- Notes and reviewed evidence.
- Accusation confirmation.
- Results display.
- Empty and error states.
- Responsive navigation.

## 18.5 End-to-End Tests

The complete workflow must be tested:

1. Register or authenticate.
2. Create a mystery.
3. Wait for generation.
4. Open the case.
5. Inspect evidence.
6. Review suspects.
7. Save investigation notes.
8. Submit an accusation.
9. View the result.
10. Reopen the completed mystery.

At least one end-to-end test must run without making a live AI API request.

## 18.6 Security Tests

Verify:

- A user cannot access another user's case.
- A user cannot read another user's progress.
- A user cannot read the canonical solution before completion.
- A user cannot submit an unknown suspect ID.
- Duplicate accusation requests are rejected.
- Invalid authentication is rejected.
- Request limits are enforced.
- Sensitive errors do not expose secrets.

---

# 19. ACCEPTANCE CRITERIA

The application is ready for release only when all mandatory criteria pass.

## AC-001: Scenario Creation

Given a valid scenario, when the user submits it, the system creates a generation job and preserves the original scenario.

## AC-002: Successful Generation

Given a successful generation, the system produces a playable case with a valid culprit, suspects, timeline, and evidence.

## AC-003: Consistent Evidence

Every published evidence item passes structural and consistency validation.

## AC-004: Hidden Solution

Before the investigation is completed, public APIs do not expose the culprit or canonical solution.

## AC-005: Evidence Inspection

Users can open and inspect every supported evidence type.

## AC-006: Investigation Persistence

Reviewed evidence, notes, and other supported progress survive page reloads and subsequent logins.

## AC-007: Valid Accusation

A valid accusation is evaluated against the stored canonical solution.

## AC-008: Invalid Accusation

Invalid suspect IDs and unauthorized requests are rejected without changing the case state.

## AC-009: Solution Reveal

After a valid final accusation, the user can access the culprit and an evidence-supported explanation.

## AC-010: Generation Failure

If generation fails, the case remains unplayable, an appropriate error is recorded, and the user can retry when eligible.

## AC-011: Ownership

A user cannot access, modify, or delete another user's private investigations.

## AC-012: Media Failure

If a media provider fails, the system displays an accurate fallback or generation error without pretending that unavailable media exists.

## AC-013: Responsive UI

All primary workflows work on mobile, tablet, and desktop.

## AC-014: Complete Interactions

Every visible interactive element has a functioning, documented behavior.

## AC-015: Test Coverage

All critical business logic, authorization boundaries, generation transitions, and accusation rules have automated tests.

## AC-016: Deployment

A developer can configure the required environment variables, initialize the database, start the application, and follow documented deployment instructions.

---

# 20. ENVIRONMENT AND CONFIGURATION

Maintain separate development, test, and production configurations.

Required configuration categories:

- Database connection.
- Authentication secrets.
- Gemini credentials.
- Selected Gemini model.
- Media provider.
- Media storage.
- Frontend origin.
- Server port.
- Logging level.
- Generation limits.
- Request limits.
- Session configuration.
- Job queue configuration, if applicable.

The `.env.example` file must document every required variable.

Startup must fail clearly when a mandatory production setting is missing.

Do not silently switch to insecure defaults.

Do not include development credentials in production builds.

---

# 21. DEVELOPER EXPERIENCE

The repository must provide documented commands for:

- Installing dependencies.
- Starting the frontend.
- Starting the backend.
- Running tests.
- Running lint checks.
- Building the frontend.
- Starting production services.
- Initializing development data.
- Running database migrations or required data setup.

Use root-level scripts where practical.

The README must explain prerequisites, configuration, architecture, testing, and deployment.

Include a deterministic demo mystery for local development and automated testing.

The demo must not be confused with live AI generation.

---

# 22. IMPLEMENTATION PHASES

Development must follow the dependency order below.

## Phase 1: Foundation

Implement:

- Repository structure.
- Frontend and backend setup.
- Environment configuration.
- MongoDB connection.
- Error handling.
- Logging.
- API response conventions.
- Basic design system.

**Exit criterion:** Both applications start successfully and basic automated tests pass.

## Phase 2: Authentication and Persistence

Implement:

- Registration.
- Login.
- Logout.
- Session management.
- Protected routes.
- User model.
- Mystery model.
- Ownership enforcement.

**Exit criterion:** Users can authenticate and access only their own private resources.

## Phase 3: Deterministic Mystery Engine

Implement:

- Mystery schemas.
- Suspect models.
- Evidence models.
- Canonical solution storage.
- Validation services.
- Deterministic demo mystery.
- Accusation evaluation.
- Solution reveal rules.

**Exit criterion:** A complete mystery can be played without live AI calls, and the canonical solution remains protected.

## Phase 4: Gemini Integration

Implement:

- Gemini provider adapter.
- Structured generation prompts.
- Scenario analysis.
- Canonical case generation.
- Evidence planning.
- Schema validation.
- Consistency validation.
- Retry and failure handling.

**Exit criterion:** Valid scenarios can produce structurally valid fictional cases.

## Phase 5: Evidence and Media

Implement:

- Chat evidence.
- Document evidence.
- Image generation integration.
- Audio generation integration where supported.
- Media storage.
- Media authorization.
- Evidence viewers.

**Exit criterion:** Every enabled evidence type has a working generation and viewing workflow or an explicit, functional fallback.

## Phase 6: Investigation Workspace

Implement:

- Case briefing.
- Suspect browser.
- Evidence library.
- Search and filters.
- Timeline.
- Notes.
- Reviewed evidence.
- Progress persistence.

**Exit criterion:** Users can investigate a case and resume their progress.

## Phase 7: Accusation and Results

Implement:

- Accusation interface.
- Server-side evaluation.
- Duplicate-submission protection.
- Solution reveal.
- Results explanation.
- Completed-case persistence.

**Exit criterion:** The complete gameplay loop works.

## Phase 8: Dashboard and Polish

Implement:

- Dashboard statistics.
- Investigation history.
- Loading states.
- Empty states.
- Error states.
- Responsive refinements.
- Accessibility improvements.
- Visual polish.

**Exit criterion:** The application provides a coherent, responsive experience.

## Phase 9: Hardening and Release

Implement:

- Security tests.
- Integration tests.
- End-to-end tests.
- Rate limits.
- Performance improvements.
- Deployment configuration.
- Monitoring.
- Documentation review.

**Exit criterion:** All mandatory acceptance criteria pass.

---

# 23. CODING STANDARDS

The following standards are mandatory.

1. Use JavaScript ES Modules consistently.
2. Use clear and descriptive naming.
3. Keep controllers thin.
4. Separate AI provider code from business logic.
5. Centralize environment configuration.
6. Validate all external input.
7. Use explicit API response structures.
8. Use centralized error handling.
9. Avoid duplicated business logic.
10. Avoid giant components and controllers.
11. Avoid unnecessary abstractions.
12. Use reusable components where they improve consistency.
13. Keep database access inside appropriate service or repository boundaries.
14. Use transactions or atomic operations where required for state integrity.
15. Never trust client-supplied ownership or role fields.
16. Never expose hidden solution data through serialization.
17. Do not commit generated secrets or environment files.
18. Do not leave unexplained TODOs for mandatory features.
19. Do not substitute mock data for production operations.
20. Mock external services only in appropriate tests and deterministic development fixtures.

---

# 24. DEFINITION OF DONE

A feature is complete only when:

- Requirements are documented.
- The implementation matches the specification.
- Backend logic works.
- Frontend behavior works.
- Data is persisted correctly.
- Security requirements pass.
- Error states are handled.
- Relevant automated tests pass.
- Responsive behavior is verified.
- Documentation is updated.

A release is complete only when every mandatory acceptance criterion is satisfied.

---

# 25. FINAL PRODUCT REQUIREMENT

AI Mystery must deliver a complete interactive detective experience.

The user provides a scenario.

The AI develops the fictional case.

The system establishes the culprit and canonical event sequence.

The AI generates evidence consistent with those facts.

The backend validates the investigation.

The user investigates the evidence.

The user selects a culprit.

The system evaluates the accusation.

The user receives the result and an explanation grounded in the evidence.

The complete process must work through the actual frontend, backend, database, and configured AI services.

**The final product must be a functioning AI-powered investigation platform, not merely a mystery-generation form or a static dashboard.**

END OF SPECIFICATION
