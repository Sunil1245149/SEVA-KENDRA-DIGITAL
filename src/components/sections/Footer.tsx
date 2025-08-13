'use client';
import Link from 'next/link';
import { useAppData } from '@/context/AppDataContext';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const iconMap: { [key: string]: React.ElementType } = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Footer() {
  const { settings, isInitialized } = useAppData();
  const { copyright, socialLinks } = settings.footer;

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        {isInitialized ? (
          <p className="text-sm text-center sm:text-left">{copyright}</p>
        ) : (
          <Skeleton className="h-5 w-72" />
        )}
        <div className="flex gap-4 mt-4 sm:mt-0">
          {isInitialized ? (
            socialLinks.map((link) => {
              const Icon = iconMap[link.name.toLowerCase()];
              return (
                <Link key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  {Icon && <Icon size={20} />}
                  <span className="sr-only">{link.name}</span>
                </Link>
              );
            })
          ) : (
            <div className="flex gap-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
