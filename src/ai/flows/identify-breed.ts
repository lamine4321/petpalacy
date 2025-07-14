'use server';

/**
 * @fileOverview Implements an AI flow to identify a pet's breed from a photo.
 *
 * - identifyBreed - A function that takes a photo and returns the identified breed.
 * - IdentifyBreedInput - The input type for the identifyBreed function.
 * - IdentifyBreedOutput - The return type for the identifyBreed function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyBreedInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyBreedInput = z.infer<typeof IdentifyBreedInputSchema>;

const IdentifyBreedOutputSchema = z.object({
  isPet: z.boolean().describe('Whether the image contains a pet or not.'),
  breed: z.string().describe("The identified breed of the pet. e.g., 'Golden Retriever', 'Siamese Cat'"),
  reasoning: z.string().describe('A brief explanation of the reasoning behind the identification.'),
});
export type IdentifyBreedOutput = z.infer<typeof IdentifyBreedOutputSchema>;

export async function identifyBreed(input: IdentifyBreedInput): Promise<IdentifyBreedOutput> {
  return identifyBreedFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyBreedPrompt',
  input: {schema: IdentifyBreedInputSchema},
  output: {schema: IdentifyBreedOutputSchema},
  prompt: `You are an expert in identifying pet breeds. Analyze the provided photo and identify the breed of the animal. 
  
If the image does not contain a recognizable pet (e.g., dog, cat), set isPet to false and explain why.

Photo: {{media url=photoDataUri}}`,
});

const identifyBreedFlow = ai.defineFlow(
  {
    name: 'identifyBreedFlow',
    inputSchema: IdentifyBreedInputSchema,
    outputSchema: IdentifyBreedOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
