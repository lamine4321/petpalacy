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
  apoquel: {
    name: 'Apoquel (Oclacitinib)',
    description: 'A medication that provides fast-acting relief from itching and inflammation for dogs with allergic dermatitis.',
    commonUses: 'Control of pruritus (itching) associated with allergic dermatitis and control of atopic dermatitis.',
    sideEffects: 'Vomiting, diarrhea, lethargy, and decreased appetite are the most common side effects. Can increase susceptibility to infection.',
  },
  galliprant: {
    name: 'Galliprant (Grapiprant)',
    description: 'A non-steroidal anti-inflammatory drug (NSAID) used to control pain and inflammation associated with osteoarthritis in dogs.',
    commonUses: 'Osteoarthritis pain and inflammation.',
    sideEffects: 'Vomiting, diarrhea, decreased appetite, and lethargy. Not for use in dogs with known hypersensitivity to grapiprant.',
  },
  bravecto: {
    name: 'Bravecto (Fluralaner)',
    description: 'A chewable tablet or topical solution for dogs and cats that kills fleas and ticks for up to 12 weeks.',
    commonUses: 'Long-lasting flea and tick prevention and treatment.',
    sideEffects: 'Vomiting, decreased appetite, diarrhea, and lethargy are among the most common side effects reported.',
  },
  simparica: {
    name: 'Simparica (Sarolaner)',
    description: 'A monthly chewable tablet that kills adult fleas and is used for the treatment and prevention of flea and tick infestations in dogs.',
    commonUses: 'Flea and tick prevention, control of sarcoptic mange.',
    sideEffects: 'Neurological side effects such as tremors, ataxia, and seizures have been reported in some dogs.',
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
