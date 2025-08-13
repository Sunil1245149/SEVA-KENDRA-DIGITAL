'use client';
import { useAppData } from '@/context/AppDataContext';
import { Megaphone } from 'lucide-react';

export default function NewsTicker() {
  const { settings } = useAppData();
  const { ticker } = settings.news;

  if (!ticker) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
        <Megaphone className="w-5 h-5 flex-shrink-0" />
        <div className="relative flex-1 overflow-hidden h-6 flex items-center">
            <p className="absolute whitespace-nowrap animate-scroll font-medium">
                {ticker.split('|').join(' <span class="mx-8">|</span> ')}
            </p>
        </div>
      </div>
    </div>
  );
}
