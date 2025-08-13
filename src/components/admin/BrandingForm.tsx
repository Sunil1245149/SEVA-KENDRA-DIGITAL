'use client';
import { useAppData } from '@/context/AppDataContext';
import { useForm, Controller } from 'react-hook-form';
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
  const { control, handleSubmit, register, watch, setValue } = useForm<BrandingData>({
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setValue('branding.logo', result);
        setSettings(prev => ({
          ...prev,
          branding: { ...prev.branding, logo: result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: BrandingData) => {
    setSettings(prev => ({ ...prev, ...data }));
    toast({ title: "Branding updated successfully!" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Branding</CardTitle>
        <CardDescription>Customize your site's look and feel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
            <h3 className="font-medium font-headline">Color Scheme (HSL Format)</h3>
            <p className="text-sm text-muted-foreground">Enter HSL values without 'hsl()' e.g., '36 100% 60%'.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input id="primaryColor" {...register('colors.primary')} />
              </div>
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input id="backgroundColor" {...register('colors.background')} />
              </div>
              <div>
                <Label htmlFor="accentColor">Accent/Secondary Color</Label>
                <Input id="accentColor" {...register('colors.accent')} />
              </div>
            </div>
          </div>

          <Button type="submit">Save Branding</Button>
        </form>
      </CardContent>
    </Card>
  );
}
