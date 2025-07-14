'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Pill, Sparkles, Search, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FindMedicationOutput } from '@/ai/flows/find-medication-flow';
import { runFindMedication } from '@/app/actions';

const formSchema = z.object({
  medicationName: z.string().min(2, {
    message: 'Please enter a medication name.',
  }),
});

export default function MedicationFinder() {
  const [result, setResult] = useState<FindMedicationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicationName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await runFindMedication({ medicationName: values.medicationName });
      setResult(aiResult);
    } catch (error) {
      console.error('Medication finder failed:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to get a response. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Information</CardTitle>
        <CardDescription>
          Search for a medication to get details about its uses, side effects, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="medicationName"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Medication Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rimadyl, Heartgard" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </form>
        </Form>
        
        {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Searching database...</p>
            </div>
        )}

        {result && (
          <Card>
            <CardContent className="p-4">
              {result.found ? (
                 <div className="prose prose-sm max-w-none text-card-foreground">
                    <pre className="whitespace-pre-wrap font-sans bg-transparent p-0">
                      {result.summary}
                    </pre>
                 </div>
              ) : (
                 <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <div>
                        <h3 className="font-semibold">Not Found</h3>
                        <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
                    </div>
                 </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
