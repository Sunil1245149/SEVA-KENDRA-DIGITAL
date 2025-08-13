'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrandingForm from './BrandingForm';
import ContentForm from './ContentForm';
import BackupForm from './BackupForm';

export default function AdminTabs() {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <ContentForm />
      </TabsContent>
      <TabsContent value="branding">
        <BrandingForm />
      </TabsContent>
      <TabsContent value="backup">
        <BackupForm />
      </TabsContent>
    </Tabs>
  );
}
