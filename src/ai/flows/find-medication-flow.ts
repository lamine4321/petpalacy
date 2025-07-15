'use server';

/**
 * @fileOverview Implements an AI flow to find medication information.
 * 
 * - findMedication - A function that takes a medication name and returns information about it.
 * - FindMedicationInput - The input type for the findMedication function.
 * - FindMedicationOutput - The return type for the findMedication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {lookupMedication} from '@/ai/tools/medication-database';

const FindMedicationInputSchema = z.object({
  medicationName: z.string().describe('The name of the medication to look up.'),
});
export type FindMedicationInput = z.infer<typeof FindMedicationInputSchema>;

const FindMedicationOutputSchema = z.object({
  summary: z
    .string()
    .describe('A user-friendly summary of the medication including its uses, side effects, and general advice.'),
  found: z.boolean().describe('Whether the medication was found in the database.'),
});
export type FindMedicationOutput = z.infer<typeof FindMedicationOutputSchema>;

export async function findMedication(input: FindMedicationInput): Promise<FindMedicationOutput> {
  return findMedicationFlow(input);
}

const findMedicationFlow = ai.defineFlow(
  {
    name: 'findMedicationFlow',
    inputSchema: FindMedicationInputSchema,
    outputSchema: FindMedicationOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      prompt: `Please tell me about the medication: ${input.medicationName}. If you can find it, provide a summary.`,
      system: 'You are a helpful veterinary assistant. Your goal is to provide clear and concise information about pet medications. Use the available tools to look up medication details and then summarize them for the user. If a medication is not found, state that clearly.',
      tools: [lookupMedication],
    });

    // Case 1: The model used the tool and found the medication.
    const toolOutput = output?.history?.[1]?.toolResponse?.parts?.[0]?.data;
    if (toolOutput && toolOutput.found) {
      const medicationInfo = toolOutput.info;
      const summary = `**${medicationInfo.name}**\n\n**Description:** ${medicationInfo.description}\n\n**Common Uses:** ${medicationInfo.commonUses}\n\n**Potential Side Effects:** ${medicationInfo.sideEffects}`;
      return { summary, found: true };
    }
    
    // Case 2: The model used the tool but did NOT find the medication.
    const toolRequest = output?.history?.[0]?.modelRequest?.contents?.[0]?.parts?.[0]?.toolRequest;
    if (toolRequest) {
      const requestedMed = toolRequest.input?.name;
       return {
          summary: `I could not find any information for "${requestedMed}". Please check the spelling and try again.`,
          found: false,
      };
    }

    // Case 3: The model did not use the tool and gave a direct text response.
    const textResponse = output?.text;
    if (textResponse) {
        return { summary: textResponse, found: false };
    }

    // Fallback case.
    return {
      summary: "I'm sorry, I couldn't process that request. Please try rephrasing your search.",
      found: false,
    };
  }
);
