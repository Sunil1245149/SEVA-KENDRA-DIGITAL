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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap" rel="stylesheet" />
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
