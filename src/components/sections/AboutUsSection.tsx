
'use client';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutUsSection() {
  const { settings, isInitialized } = useAppData();
  const { title, text, imageUrl, dataAiHint, ownerName, ownerImageUrl } = settings.about;

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{title}</h2>
            {isInitialized ? (
              <p className="text-muted-foreground leading-relaxed text-lg">{text}</p>
            ) : (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            )}
             <div className="flex items-center gap-4 pt-4">
              {isInitialized ? (
                <Image
                  src={ownerImageUrl}
                  alt={ownerName}
                  width={80}
                  height={80}
                  className="rounded-full shadow-md object-cover"
                  data-ai-hint="owner portrait"
                />
              ) : (
                <Skeleton className="h-20 w-20 rounded-full" />
              )}
              <div>
                {isInitialized ? (
                  <>
                  <p className="font-bold text-lg font-headline">{ownerName}</p>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="order-first md:order-last">
            {isInitialized ? (
               <Image
                  src={imageUrl}
                  alt={title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl aspect-[3/2] object-cover"
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
