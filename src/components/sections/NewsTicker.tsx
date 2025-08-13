'use client';
import { useAppData } from '@/context/AppDataContext';
import { Megaphone } from 'lucide-react';

export default function NewsTicker() {
  const { settings } = useAppData();
  const { ticker } = settings.news;

  return (
    <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
        <Megaphone className="w-6 h-6 flex-shrink-0" />
        <div className="relative flex-1 overflow-hidden h-6">
            <p className="absolute whitespace-nowrap animate-scroll">
                {ticker}
            </p>
        </div>
      </div>
    </div>
  );
}
