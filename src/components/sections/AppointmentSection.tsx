
'use client';
import { useAppData } from '@/context/AppDataContext';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Appointment } from '@/types';

type AppointmentFormData = Omit<Appointment, 'id' | 'status'>;

export default function AppointmentSection() {
  const { settings, setSettings } = useAppData();
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<AppointmentFormData>();
  
  const selectedDate = watch('date');

  const onSubmit = (data: AppointmentFormData) => {
    const newAppointment: Appointment = {
      ...data,
      id: `${Date.now()}`,
      status: 'pending',
    };
    
    setSettings(prev => ({
      ...prev,
      appointments: [...(prev.appointments || []), newAppointment],
    }));

    toast({
      title: "Appointment Requested",
      description: "Your request has been sent. We will notify you once it's approved.",
    });
  };

  return (
    <section id="appointment" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Book an Appointment</CardTitle>
            <CardDescription>Fill out the form below to schedule your visit.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register('name', { required: 'Name is required' })} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" {...register('phone', { required: 'Phone number is required' })} />
                   {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Service</Label>
                 <Select onValueChange={(value) => setValue('service', value)} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                        {settings.services.items.map(item => (
                            <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Appointment Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate ? new Date(selectedDate) : undefined}
                            onSelect={(date) => setValue('date', date as Date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="w-full" size="lg">Request Appointment</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
