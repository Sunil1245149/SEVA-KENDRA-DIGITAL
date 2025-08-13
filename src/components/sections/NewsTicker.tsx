'use client';
import { useAppData } from '@/context/AppDataContext';
import { Megaphone } from 'lucide-react';

export default function NewsTicker() {
  const { settings } = useAppData();
  const { ticker } = settings.news;

  if (!ticker) return null;

  const messages = ticker.split('|');
  const fullTickerText = messages.join(' • ');

  return (
    <div className="bg-primary text-primary-foreground py-2.5 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
        <Megaphone className="w-5 h-5 flex-shrink-0" />
        <div className="relative flex-1 overflow-hidden h-6 flex items-center">
          <p className="absolute whitespace-nowrap animate-scroll will-change-transform font-medium">
            {fullTickerText}
            <span className="mx-8" />
            {fullTickerText}
          </p>
        </div>
      </div>
    </div>
  );
}
