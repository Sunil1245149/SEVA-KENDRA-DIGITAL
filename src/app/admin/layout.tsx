'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Loader2 } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Brush, Save, LogOut, Eye, Settings, FileText, Image as ImageIcon, Palette } from 'lucide-react';
import Image from 'next/image';
import { useAppData } from '@/context/AppDataContext';


function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [, setIsAuthenticated] = useLocalStorage('isAdminAuthenticated', false);
  const { settings } = useAppData();

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Image src={settings.branding.logo} alt="Logo" width={32} height={32} className="rounded-full" />
            <h1 className="font-semibold text-lg">{settings.branding.name}</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/admin'}>
              <Link href="/admin"><FileText /> Content</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/admin/branding'}>
              <Link href="/admin/branding"><Palette /> Branding</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/admin/backup'}>
              <Link href="/admin/backup"><Save /> Backup</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => router.push('/')}><Eye/>View Site</Button>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}><LogOut /> Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}


export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated] = useLocalStorage('isAdminAuthenticated', false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsChecking(false);
      return;
    }
    
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

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
            <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-6">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-lg font-semibold md:text-xl capitalize">
                    {pathname.split('/').pop() || 'content'}
                </h1>
            </header>
            <main className="flex-1 p-4 md:p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}