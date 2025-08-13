'use client';
import { useAppData } from '@/context/AppDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, Upload, Trash2 } from 'lucide-react';

export default function BackupForm() {
  const { settings, setSettings, resetSettings } = useAppData();
  const { toast } = useToast();

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(settings, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `seva-kendra-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast({ title: "Settings exported successfully!" });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = event.target.files?.[0];

    if (!file) {
      toast({ variant: 'destructive', title: "No file selected." });
      return;
    }

    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const newSettings = JSON.parse(result);
          // Add some basic validation if needed
          if (newSettings.branding && newSettings.services) {
            setSettings(newSettings);
            toast({ title: "Settings imported successfully!", description: "The page will now reload." });
            setTimeout(() => window.location.reload(), 2000);
          } else {
             throw new Error("Invalid settings file format.");
          }
        }
      } catch (error) {
        toast({ variant: 'destructive', title: "Import failed!", description: "The file is not a valid settings file." });
      }
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup & Restore</CardTitle>
        <CardDescription>Save your website's configuration or restore it from a backup file.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-medium">Export Settings</h3>
            <p className="text-sm text-muted-foreground">Download all your current settings as a JSON file.</p>
          </div>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
        
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-medium">Import Settings</h3>
            <p className="text-sm text-muted-foreground">Upload a previously saved JSON file to restore settings.</p>
          </div>
          <Button asChild>
            <Label htmlFor="import-file">
                <Upload className="mr-2 h-4 w-4" /> Import
                <Input id="import-file" type="file" accept=".json" className="hidden" onChange={handleImport} />
            </Label>
          </Button>
        </div>

        <div className="p-4 border border-destructive/50 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-medium text-destructive">Reset to Defaults</h3>
            <p className="text-sm text-muted-foreground">This will erase all your customizations. This action cannot be undone.</p>
          </div>
          <Button variant="destructive" onClick={resetSettings}>
             <Trash2 className="mr-2 h-4 w-4" /> Reset All Settings
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
