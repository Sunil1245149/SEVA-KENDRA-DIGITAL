'use client';
import { useAppData } from '@/context/AppDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CustomIcon } from '@/components/icons/CustomIcon';

export default function ServicesSection() {
  const { settings, isInitialized } = useAppData();
  const { title, items } = settings.services;

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Your one-stop solution for all digital needs, delivered with efficiency and care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isInitialized
            ? items.map((service) => (
                <Card key={service.id} className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-card border-t-4 border-t-primary">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                      <CustomIcon name={service.icon} className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="text-center shadow-lg bg-card">
                    <CardHeader>
                      <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-3/4 mx-auto" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
