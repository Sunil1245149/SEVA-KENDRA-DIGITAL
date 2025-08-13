'use client';
import { useEffect } from 'react';
import { useAppData } from '@/context/AppDataContext';

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useAppData();

  useEffect(() => {
    const root = document.documentElement;
    if (settings.colors.primary) {
      // Assuming HSL format is needed. This is a naive conversion.
      // A proper color library would be better for real-world apps.
      root.style.setProperty('--primary', settings.colors.primary);
    }
    if (settings.colors.background) {
      root.style.setProperty('--background', settings.colors.background);
    }
    if (settings.colors.accent) {
      root.style.setProperty('--secondary', settings.colors.accent); // Use accent for secondary
      root.style.setProperty('--accent', settings.colors.accent);
    }
  }, [settings.colors]);

  return <>{children}</>;
}
