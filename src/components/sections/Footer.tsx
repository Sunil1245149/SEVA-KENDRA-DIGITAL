'use client';
import Link from 'next/link';
import { useAppData } from '@/context/AppDataContext';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

const iconMap: { [key: string]: React.ElementType } = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Footer() {
  const { settings, isInitialized } = useAppData();
  const { copyright, socialLinks } = settings.footer;

  return (
    <footer id="contact" className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {isInitialized ? (
            <p className="text-sm text-center sm:text-left">{copyright}</p>
          ) : (
            <Skeleton className="h-5 w-72" />
          )}
          <div className="flex gap-2">
            {isInitialized ? (
              socialLinks.map((link) => {
                const Icon = iconMap[link.name.toLowerCase()];
                return (
                  <Button key={link.id} variant="ghost" size="icon" asChild>
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                      {Icon && <Icon size={20} />}
                    </Link>
                  </Button>
                );
              })
            ) : (
              <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
