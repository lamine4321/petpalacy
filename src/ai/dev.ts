import { config } from 'dotenv';
config();

import '@/ai/flows/symptom-checker.ts';
import '@/ai/flows/identify-breed.ts';
import '@/ai/flows/find-medication-flow.ts';
