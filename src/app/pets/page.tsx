import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { placeholderPets } from '@/lib/placeholder-data';
import type { Pet } from '@/lib/types';

function PetCard({ pet }: { pet: Pet }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <Image
          src={pet.photoUrl}
          alt={`Photo of ${pet.name}`}
          width={80}
          height={80}
          className="rounded-full border"
          data-ai-hint={pet.dataAiHint}
        />
        <div>
          <CardTitle>{pet.name}</CardTitle>
          <CardDescription>{pet.breed}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Age: {pet.age} years
        </div>
      </CardContent>
    </Card>
  );
}

export default function PetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Pet
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {placeholderPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
