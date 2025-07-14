'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { runIdentifyBreed } from '@/app/actions';
import type { IdentifyBreedOutput } from '@/ai/flows/identify-breed';

export default function BreedIdentifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IdentifyBreedOutput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentifyClick = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setResult(null);

    try {
      const aiResult = await runIdentifyBreed({ photoDataUri: selectedImage });
      setResult(aiResult);
    } catch (error) {
      console.error('Breed identification failed:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Failed to identify the breed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Pet Breed Identifier</CardTitle>
        <CardDescription>Upload a photo of a pet to identify its breed.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div
            className="border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected pet"
                width={300}
                height={300}
                className="rounded-md mx-auto aspect-square object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-48 space-y-2">
                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Click to upload an image</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <Button onClick={handleIdentifyClick} disabled={!selectedImage || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Identifying...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Identify Breed
                </>
              )}
            </Button>
            {result && (
              <Card>
                <CardContent className="p-4">
                  {result.isPet ? (
                    <div>
                      <h3 className="font-semibold text-lg">{result.breed}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{result.reasoning}</p>
                    </div>
                  ) : (
                     <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <div>
                            <h3 className="font-semibold">Not a Pet</h3>
                            <p className="text-sm text-muted-foreground mt-1">{result.reasoning}</p>
                        </div>
                     </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
