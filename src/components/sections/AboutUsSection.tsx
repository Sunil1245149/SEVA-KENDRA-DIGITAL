'use client';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutUsSection() {
  const { settings, isInitialized } = useAppData();
  const { title, text, imageUrl, dataAiHint } = settings.about;

  return (
    <section id="about" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{title}</h2>
            {isInitialized ? (
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            ) : (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            )}
          </div>
          <div>
            {isInitialized ? (
               <Image
                  src={imageUrl}
                  alt={title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint={dataAiHint}
                />
            ) : (
                <Skeleton className="h-[400px] w-full rounded-lg" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
