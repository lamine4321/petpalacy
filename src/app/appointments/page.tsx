import { PlusCircle, Video, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeholderAppointments } from '@/lib/placeholder-data';
import type { Appointment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const appointmentDate = new Date(appointment.date);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{formattedDate}</CardTitle>
            <CardDescription>{appointment.time}</CardDescription>
          </div>
          <Badge variant={appointment.type === 'Telehealth' ? 'default' : 'secondary'}>
            {appointment.type === 'Telehealth' ? <Video className="mr-1.5 h-3 w-3"/> : <Hospital className="mr-1.5 h-3 w-3"/>}
            {appointment.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">With {appointment.vetName}</p>
      </CardContent>
    </Card>
  );
}

export default function AppointmentsPage() {
  const upcomingAppointments = placeholderAppointments.filter(a => a.status === 'Upcoming');
  const pastAppointments = placeholderAppointments.filter(a => a.status === 'Past');

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {upcomingAppointments.map((app) => (
              <AppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {pastAppointments.map((app) => (
              <AppointmentCard key={app.id} appointment={app} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
