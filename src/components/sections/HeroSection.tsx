'use client';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const { settings, isInitialized } = useAppData();
  const { banners } = settings.hero;

  return (
    <section className="w-full bg-background">
      <div className="container mx-auto px-0 md:px-4">
        <Carousel 
          className="w-full" 
          opts={{ loop: true }} 
          plugins={[ Autoplay({ delay: 5000, stopOnInteraction: true }) ]}
        >
          <CarouselContent>
            {isInitialized ? (
              banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative aspect-video md:aspect-[2.4/1] w-full md:rounded-lg overflow-hidden">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      data-ai-hint={banner.dataAiHint}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 md:p-16">
                      <div className="max-w-3xl text-white space-y-4">
                          <h2 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">{banner.title}</h2>
                          <p className="text-lg md:text-xl text-white/90 drop-shadow-md">{banner.subtitle}</p>
                          <Button size="lg" className="text-lg px-8 py-6">
                            {banner.cta} <ChevronRight className="ml-2 h-5 w-5" />
                          </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <Skeleton className="h-[50vh] md:h-[calc(100vh-80px)] w-full md:rounded-lg" />
              </CarouselItem>
            )}
          </CarouselContent>
          {isInitialized && banners.length > 1 && (
            <>
                <CarouselPrevious className="left-4 md:left-8" />
                <CarouselNext className="right-4 md:right-8" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}
