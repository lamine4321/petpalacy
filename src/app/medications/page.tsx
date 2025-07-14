import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderMedications } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';

export default function MedicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Medication Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderMedications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell className="font-medium">{med.petName}</TableCell>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{med.schedule}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
