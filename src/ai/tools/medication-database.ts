'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// In a real application, this data would come from a database or a dedicated API.
const FAKE_MEDICATION_DB: {[key: string]: any} = {
  heartgard: {
    name: 'Heartgard Plus',
    description: 'A monthly oral pet medication used to prevent heartworm disease, and to treat and control roundworms and hookworms.',
    commonUses: 'Heartworm prevention, treatment of roundworms and hookworms.',
    sideEffects: 'Vomiting, diarrhea, lethargy, and loss of appetite are rare but possible. Contact your vet if observed.',
  },
  rimadyl: {
    name: 'Rimadyl (Carprofen)',
    description: 'A non-steroidal anti-inflammatory drug (NSAID) used to relieve pain and inflammation in dogs.',
    commonUses: 'Arthritis pain, post-operative pain.',
    sideEffects: 'Loss of appetite, vomiting, diarrhea. More serious side effects can include stomach ulcers and liver or kidney problems.',
  },
  nexgard: {
    name: 'NexGard',
    description: 'A monthly beef-flavored chewable tablet that kills adult fleas and is indicated for the treatment and prevention of flea infestations, and the treatment and control of tick infestations.',
    commonUses: 'Flea and tick prevention and treatment.',
    sideEffects: 'Vomiting, diarrhea, lethargy, and dry/flaky skin have been reported.',
  },
};


const medicationInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  commonUses: z.string(),
  sideEffects: z.string(),
});

export const lookupMedication = ai.defineTool(
  {
    name: 'lookupMedication',
    description: 'Looks up information about a specific pet medication from a database.',
    inputSchema: z.object({
      name: z.string().describe('The name of the medication to look up. e.g., "Heartgard", "Rimadyl"'),
    }),
    outputSchema: z.object({
        found: z.boolean(),
        info: medicationInfoSchema.optional(),
    }),
  },
  async (input) => {
    const medicationKey = input.name.toLowerCase();
    const info = FAKE_MEDICATION_DB[medicationKey];
    if (info) {
        return { found: true, info };
    }
    return { found: false };
  }
);
