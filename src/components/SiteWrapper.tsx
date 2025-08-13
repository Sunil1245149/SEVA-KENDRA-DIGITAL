
'use client';
import { useEffect } from 'react';
import { useAppData } from '@/context/AppDataContext';

// Function to convert HEX to HSL string
function hexToHsl(hex: string): string | null {
  if (!hex || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
    return null; // Return null for invalid hex
  }

  let r_hex = hex.substring(1, 3);
  let g_hex = hex.substring(3, 5);
  let b_hex = hex.substring(5, 7);

  if (hex.length === 4) {
    r_hex = hex.substring(1, 2) + hex.substring(1, 2);
    g_hex = hex.substring(2, 3) + hex.substring(2, 3);
    b_hex = hex.substring(3, 4) + hex.substring(3, 4);
  }

  let r = parseInt(r_hex, 16) / 255;
  let g = parseInt(g_hex, 16) / 255;
  let b = parseInt(b_hex, 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}


export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useAppData();

  useEffect(() => {
    const root = document.documentElement;
    
    const primaryHsl = hexToHsl(settings.colors.primary);
    if (primaryHsl) {
      root.style.setProperty('--primary', primaryHsl);
    }
    
    const backgroundHsl = hexToHsl(settings.colors.background);
    if (backgroundHsl) {
      root.style.setProperty('--background', backgroundHsl);
    }

    const accentHsl = hexToHsl(settings.colors.accent);
    if (accentHsl) {
      root.style.setProperty('--secondary', accentHsl); 
      root.style.setProperty('--accent', accentHsl);
    }

  }, [settings.colors]);

  useEffect(() => {
    document.body.style.fontFamily = `var(--font-${settings.typography.fontBody.toLowerCase().replace(' ', '-')})`;
    
    const headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .font-headline');
    headlines.forEach(h => {
        (h as HTMLElement).style.fontFamily = `var(--font-${settings.typography.fontHeadline.toLowerCase().replace(' ', '-')})`;
    });

  }, [settings.typography])


  return <>{children}</>;
}
