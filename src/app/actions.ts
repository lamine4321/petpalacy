'use server';

import { symptomChecker, SymptomCheckerInput, SymptomCheckerOutput } from '@/ai/flows/symptom-checker';

export async function runSymptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  // Here you could add extra logic, like logging, user validation, etc.
  const result = await symptomChecker(input);
  return result;
}
