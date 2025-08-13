'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';
import { Button } from '@/components/ui/button';
import { Phone, Mail, UserCog, Menu } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const { settings, isInitialized } = useAppData();
  const { branding, header } = settings;

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b" id="home">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
          {isInitialized ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1.5"><Phone size={14} /> {header.contact.phone}</span>
              <span className="hidden md:flex items-center gap-1.5"><Mail size={14} /> {header.contact.email}</span>
            </div>
          ) : (
             <Skeleton className="h-5 w-80 hidden md:block" />
          )}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                <UserCog size={14} className="mr-2" /> Admin
                </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            {isInitialized && branding.logo ? (
               <Image src={branding.logo} alt={branding.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <Skeleton className="h-10 w-10 rounded-full" />
            )}
            {isInitialized ? (
              <h1 className="text-xl font-headline font-bold text-foreground">{branding.name}</h1>
            ) : (
              <Skeleton className="h-8 w-48" />
            )}
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {isInitialized ? (
              header.navLinks.map((link) => (
                <Button key={link.id} variant="ghost" asChild>
                    <Link href={link.href} className="font-medium text-foreground hover:text-primary transition-colors">
                    {link.text}
                    </Link>
                </Button>
              ))
            ) : (
              <div className="flex gap-1">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-20" />
              </div>
            )}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                {header.navLinks.map((link) => (
                    <Link key={link.id} href={link.href} className="font-medium text-lg text-foreground hover:text-primary transition-colors">
                    {link.text}
                    </Link>
                ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
