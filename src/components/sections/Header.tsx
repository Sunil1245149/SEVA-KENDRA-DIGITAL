'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';
import { Button } from '@/components/ui/button';
import { Phone, Mail, UserCog } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Header() {
  const { settings, isInitialized } = useAppData();
  const { branding, header } = settings;

  return (
    <header className="bg-card shadow-md" id="home">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 border-b border-border/50">
          {isInitialized ? (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Phone size={14} /> {header.contact.phone}</span>
              <span className="flex items-center gap-1.5"><Mail size={14} /> {header.contact.email}</span>
            </div>
          ) : (
             <Skeleton className="h-5 w-80" />
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">
              <UserCog size={16} className="mr-2" /> Admin Panel
            </Link>
          </Button>
        </div>
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            {isInitialized && branding.logo ? (
               <Image src={branding.logo} alt={branding.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <Skeleton className="h-10 w-10 rounded-full" />
            )}
            {isInitialized ? (
              <h1 className="text-2xl font-headline font-bold text-primary-foreground">{branding.name}</h1>
            ) : (
              <Skeleton className="h-8 w-48" />
            )}
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {isInitialized ? (
              header.navLinks.map((link) => (
                <Link key={link.id} href={link.href} className="font-medium text-foreground hover:text-primary transition-colors">
                  {link.text}
                </Link>
              ))
            ) : (
              <>
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
