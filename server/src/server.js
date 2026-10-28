import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const { default: app } = await import('./app.js');
const port = Number(process.env.PORT || 4000);
if (process.env.NODE_ENV === 'production' && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) throw new Error('SESSION_SECRET must be at least 32 characters in production.');
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-mystery');
app.listen(port, () => console.log(`AI Mystery API listening on port ${port}`));
