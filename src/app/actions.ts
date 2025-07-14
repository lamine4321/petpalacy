'use server';

import { symptomChecker, SymptomCheckerInput, SymptomCheckerOutput } from '@/ai/flows/symptom-checker';
import { identifyBreed, IdentifyBreedInput, IdentifyBreedOutput } from '@/ai/flows/identify-breed';

export async function runSymptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  // Here you could add extra logic, like logging, user validation, etc.
  const result = await symptomChecker(input);
  return result;
}

export async function runIdentifyBreed(input: IdentifyBreedInput): Promise<IdentifyBreedOutput> {
  const result = await identifyBreed(input);
  return result;
}
