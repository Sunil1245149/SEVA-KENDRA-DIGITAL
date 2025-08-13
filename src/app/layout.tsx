import type { Metadata } from 'next';
import { AppDataProvider } from '@/context/AppDataContext';
import { Toaster } from "@/components/ui/toaster"
import SiteWrapper from '@/components/SiteWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seva Kendra Digital',
  description: 'Your one-stop digital service center.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,701&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppDataProvider>
          <SiteWrapper>
            {children}
            <Toaster />
          </SiteWrapper>
        </AppDataProvider>
      </body>
    </html>
  );
}
