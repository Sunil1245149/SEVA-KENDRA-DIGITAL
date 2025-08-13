'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated] = useLocalStorage('isAdminAuthenticated', false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // No need to check auth for the login page itself
    if (pathname === '/admin/login') {
      setIsChecking(false);
      return;
    }
    
    // If auth status is checked and user is not authenticated, redirect
    if (!isAuthenticated) {
      router.replace('/admin/login');
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router, pathname]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Avoid rendering children on login page if layout logic is complex
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Render children only for authenticated users on other admin pages
  return isAuthenticated ? <>{children}</> : null;
}
