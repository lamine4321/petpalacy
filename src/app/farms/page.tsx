import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { placeholderFarms } from '@/lib/placeholder-data';
import type { Farm, Animal } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50">
      <Image
        src={animal.photoUrl}
        alt={`Photo of ${animal.name}`}
        width={40}
        height={40}
        className="rounded-full border"
        data-ai-hint={animal.dataAiHint}
      />
      <div>
        <p className="font-medium">{animal.name}</p>
        <p className="text-sm text-muted-foreground">{animal.species}</p>
      </div>
    </div>
  );
}

function FarmCard({ farm }: { farm: Farm }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{farm.name}</CardTitle>
        <CardDescription>Owner: {farm.owner}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="animals">
            <AccordionTrigger>{farm.animals.length} Animals</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {farm.animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function FarmsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Farm
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {placeholderFarms.map((farm) => (
          <FarmCard key={farm.id} farm={farm} />
        ))}
      </div>
    </div>
  );
}
