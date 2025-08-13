'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AdminTabs from '@/components/admin/AdminTabs';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function AdminPage() {
  const router = useRouter();
  const [, setIsAuthenticated] = useLocalStorage('isAdminAuthenticated', false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-card border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-headline font-bold text-primary">Admin Dashboard</h1>
          <div>
            <Button variant="outline" className="mr-4" onClick={() => router.push('/')}>View Site</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <AdminTabs />
      </main>
    </div>
  );
}
