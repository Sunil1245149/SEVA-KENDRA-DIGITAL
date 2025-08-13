
'use client';
import { useAppData } from '@/context/AppDataContext';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AppSettings } from '@/types';
import Image from 'next/image';

type BrandingData = {
  branding: AppSettings['branding'];
  colors: AppSettings['colors'];
};

export default function BrandingForm() {
  const { settings, setSettings } = useAppData();
  const { toast } = useToast();
  const { register, handleSubmit, watch, setValue } = useForm<BrandingData>({
    defaultValues: {
      branding: settings.branding,
      colors: settings.colors,
    },
    values: {
      branding: settings.branding,
      colors: settings.colors,
    }
  });

  const logoValue = watch('branding.logo');
  const primaryColor = watch('colors.primary');
  const backgroundColor = watch('colors.background');
  const accentColor = watch('colors.accent');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setValue('branding.logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: BrandingData) => {
    setSettings(prev => ({ ...prev, ...data }));
    toast({ title: "Branding updated successfully!" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Branding</CardTitle>
          <CardDescription>Customize your site's look and feel.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-medium font-headline">Logo & Site Name</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" {...register('branding.name')} />
                </div>
                <div>
                  <Label htmlFor="logoUpload">Upload Logo</Label>
                  <Input id="logoUpload" type="file" accept="image/*" onChange={handleLogoUpload} />
                </div>
              </div>
              {logoValue && (
                  <div className="mt-4">
                      <Label>Logo Preview</Label>
                      <div className="mt-2 p-4 border rounded-md inline-block bg-muted">
                          <Image src={logoValue} alt="Logo preview" width={100} height={100} className="max-h-24 object-contain" />
                      </div>
                  </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium font-headline">Color Scheme</h3>
              <p className="text-sm text-muted-foreground">Choose your site's main colors.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Label htmlFor="primaryColor">Primary</Label>
                        <Input 
                            id="primaryColor" 
                            type="color" 
                            className="p-1 h-10 w-14"
                            {...register('colors.primary')}
                        />
                    </div>
                    <Input 
                        className="flex-1" 
                        value={primaryColor}
                        onChange={(e) => setValue('colors.primary', e.target.value)}
                        placeholder="#007bff"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Label htmlFor="backgroundColor">Background</Label>
                        <Input 
                            id="backgroundColor" 
                            type="color" 
                            className="p-1 h-10 w-14"
                            {...register('colors.background')}
                        />
                    </div>
                    <Input 
                        className="flex-1" 
                        value={backgroundColor}
                        onChange={(e) => setValue('colors.background', e.target.value)}
                        placeholder="#f8f9fa"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Label htmlFor="accentColor">Accent</Label>
                        <Input 
                            id="accentColor" 
                            type="color" 
                            className="p-1 h-10 w-14"
                            {...register('colors.accent')}
                        />
                    </div>
                    <Input 
                        className="flex-1" 
                        value={accentColor}
                        onChange={(e) => setValue('colors.accent', e.target.value)}
                        placeholder="#6c757d"
                    />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button type="submit">Save Branding</Button>
    </form>
  );
}
