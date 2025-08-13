
'use client';

import { useEffect, useState, useRef } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAppData } from '@/context/AppDataContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, XCircle } from 'lucide-react';
import type { Appointment, AppointmentStatus } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export default function AppointmentStatusNotifier() {
  const [lastAppointmentId] = useLocalStorage<string | null>('last-appointment-id', null);
  const { settings } = useAppData();
  const { toast } = useToast();
  const [lastNotifiedStatus, setLastNotifiedStatus] = useState<AppointmentStatus | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (lastAppointmentId) {
      const currentAppointment = settings.appointments.find(a => a.id === lastAppointmentId) || null;
      setAppointment(currentAppointment);

      if (currentAppointment && currentAppointment.status !== lastNotifiedStatus) {
        if (lastNotifiedStatus !== null) { // Don't notify on initial load
            toast({
              title: `Appointment ${currentAppointment.status.charAt(0).toUpperCase() + currentAppointment.status.slice(1)}`,
              description: `Your appointment for ${currentAppointment.service} has been ${currentAppointment.status}.`,
            });
        }
        setLastNotifiedStatus(currentAppointment.status);
      }
    }
  }, [settings.appointments, lastAppointmentId, toast, lastNotifiedStatus]);

  if (!appointment) {
    return null;
  }
  
  const getStatusBadgeVariant = (status: AppointmentStatus) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };
  
  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 mr-2 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 mr-2 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-14 w-14 shadow-lg">
                <Bell className="h-6 w-6" />
                {appointment.status !== 'pending' && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Appointment Status</h4>
              <p className="text-sm text-muted-foreground">
                Status of your latest appointment request.
              </p>
            </div>
            <div className="grid gap-2">
                <div className="font-semibold">{appointment.service}</div>
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{new Date(appointment.date).toLocaleDateString()}</div>
                    <Badge variant={getStatusBadgeVariant(appointment.status)} className="capitalize">
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </Badge>
                </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
