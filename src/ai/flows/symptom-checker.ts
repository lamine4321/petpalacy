'use server';

/**
 * @fileOverview Implements the AI Symptom Checker flow for pet health issues.
 *
 * - symptomChecker - A function that takes pet symptoms as input and returns potential health issues.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  petSymptoms: z.string().describe('A description of the pet\'s symptoms.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  potentialIssues: z.string().describe('A list of potential health issues based on the symptoms.'),
  recommendation: z.string().describe('A recommendation on whether to visit a vet.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are a veterinary assistant helping pet owners understand their pet\'s symptoms. Based on the description of symptoms provided, give a list of potential health issues. Also, give a recommendation on whether a vet visit is necessary.

Symptoms: {{{petSymptoms}}}`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
