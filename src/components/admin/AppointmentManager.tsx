
'use client';
import { useAppData } from '@/context/AppDataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Appointment, AppointmentStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function AppointmentManager() {
  const { settings, setSettings } = useAppData();
  const { toast } = useToast();

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    setSettings(prev => {
      const updatedAppointments = prev.appointments.map(appt => 
        appt.id === id ? { ...appt, status } : appt
      );
      return { ...prev, appointments: updatedAppointments };
    });
    toast({
      title: "Status Updated",
      description: `Appointment status has been changed to ${status}.`
    });
  };

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
      case 'pending': return <Clock className="h-4 w-4 mr-2 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Management</CardTitle>
        <CardDescription>View and manage all user appointment requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.appointments && settings.appointments.length > 0 ? (
              settings.appointments.map((appt: Appointment) => (
                <TableRow key={appt.id}>
                  <TableCell className="font-medium">{appt.name}</TableCell>
                  <TableCell>{appt.phone}</TableCell>
                  <TableCell>{appt.service}</TableCell>
                  <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(appt.status)}>
                      {getStatusIcon(appt.status)}
                      {appt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(appt.id, 'approved')}>
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appt.id, 'rejected')}>
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(appt.id, 'pending')}>
                          <Clock className="mr-2 h-4 w-4" /> Mark as Pending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No appointments yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
