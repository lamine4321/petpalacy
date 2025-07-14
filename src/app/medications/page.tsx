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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { placeholderMedications } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import MedicationFinder from '@/components/medication-finder';
import { Separator } from '@/components/ui/separator';


export default function MedicationsPage() {
  return (
    <div className="space-y-8">
      <MedicationFinder />
      <Separator />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Medication Log</h2>
                <p className="text-muted-foreground">Detailed list of medications for your pets.</p>
            </div>
            <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Medication
            </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pet</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Posology</TableHead>
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
                    <TableCell>{med.utilization}</TableCell>
                    <TableCell>{med.posology}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
