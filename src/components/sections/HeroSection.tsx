'use client';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function HeroSection() {
  const { settings, isInitialized } = useAppData();
  const { banners } = settings.hero;

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="container mx-auto">
        <Carousel className="w-full" opts={{ loop: true }} plugins={[
            Autoplay({ delay: 5000, stopOnInteraction: true })
        ]}>
          <CarouselContent>
            {isInitialized ? (
              banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardContent className="flex flex-col md:flex-row items-center justify-center p-0">
                      <div className="relative w-full md:w-1/2 aspect-[16/9] md:aspect-auto md:h-[400px]">
                        <Image
                          src={banner.imageUrl}
                          alt={banner.title}
                          fill
                          className="object-cover"
                          data-ai-hint={banner.dataAiHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                      </div>
                      <div className="md:w-1/2 p-8 md:p-12 space-y-4 text-center md:text-left relative z-10 bg-card md:bg-transparent">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{banner.title}</h2>
                        <p className="text-lg text-muted-foreground">{banner.subtitle}</p>
                        <Button size="lg">{banner.cta}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardContent className="flex items-center justify-center p-0">
                      <Skeleton className="h-[400px] w-full" />
                  </CardContent>
                </Card>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
}
