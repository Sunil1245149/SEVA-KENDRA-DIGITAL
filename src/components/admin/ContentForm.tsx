'use client';
import { useAppData } from '@/context/AppDataContext';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import type { AppSettings, ServiceItem, Banner, NavLink, SocialLink } from '@/types';
import { Trash2, PlusCircle } from 'lucide-react';
import Image from 'next/image';

export default function ContentForm() {
  const { settings, setSettings } = useAppData();
  const { toast } = useToast();
  const { control, register, handleSubmit, reset, setValue, watch } = useForm<AppSettings>({
    defaultValues: settings,
    values: settings,
  });

  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control, name: "services.items" });
  const { fields: bannerFields, append: appendBanner, remove: removeBanner } = useFieldArray({ control, name: "hero.banners" });
  const { fields: navLinkFields, append: appendNavLink, remove: removeNavLink } = useFieldArray({ control, name: "header.navLinks" });
  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({ control, name: "footer.socialLinks" });
  
  const watchedBanners = watch('hero.banners');
  const watchedAboutImage = watch('about.imageUrl');

  const onSubmit = (data: AppSettings) => {
    setSettings(data);
    toast({ title: "Content updated successfully!" });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    handleImageUpload(e, (value) => {
      setValue(`hero.banners.${index}.imageUrl`, value, { shouldDirty: true });
    });
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, (value) => {
      setValue('about.imageUrl', value, { shouldDirty: true });
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>Edit the content for all sections of your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Accordion type="multiple" className="w-full space-y-4">
            
            <AccordionItem value="header-footer" className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="font-headline">Header & Footer</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Contact Phone</Label><Input {...register('header.contact.phone')} /></div>
                  <div><Label>Contact Email</Label><Input {...register('header.contact.email')} /></div>
                </div>
                <div><Label>Copyright Text</Label><Input {...register('footer.copyright')} /></div>
                
                <div className="space-y-2">
                    <Label>Navigation Links</Label>
                    {navLinkFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                            <Input placeholder="Text" {...register(`header.navLinks.${index}.text`)} />
                            <Input placeholder="URL (e.g., #services)" {...register(`header.navLinks.${index}.href`)} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeNavLink(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendNavLink({id: `${Date.now()}`, text:'', href:''})}><PlusCircle className="h-4 w-4 mr-2"/>Add Nav Link</Button>
                </div>

                <div className="space-y-2">
                    <Label>Social Media Links</Label>
                    {socialLinkFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                            <Input placeholder="Name (e.g., Facebook)" {...register(`footer.socialLinks.${index}.name`)} />
                            <Input placeholder="Full URL" {...register(`footer.socialLinks.${index}.url`)} />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendSocialLink({id: `${Date.now()}`, name:'', url:''})}><PlusCircle className="h-4 w-4 mr-2"/>Add Social Link</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="hero" className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="font-headline">Hero Banners</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {bannerFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                        <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => removeBanner(index)}>Remove</Button>
                        <Label>Banner {index + 1}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                          <div className="space-y-2">
                            <Input placeholder="Title" {...register(`hero.banners.${index}.title`)} />
                            <Input placeholder="Subtitle" {...register(`hero.banners.${index}.subtitle`)} />
                            <Input placeholder="CTA Text" {...register(`hero.banners.${index}.cta`)} />
                             <Input placeholder="Image AI Hint" {...register(`hero.banners.${index}.dataAiHint`)} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`bannerImage-${index}`}>Image</Label>
                            <Input id={`bannerImage-${index}`} type="file" accept="image/*" onChange={(e) => handleBannerImageUpload(e, index)} />
                            {watchedBanners[index]?.imageUrl && (
                              <Image src={watchedBanners[index].imageUrl} alt={`Banner ${index+1} preview`} width={200} height={100} className="rounded-md object-cover mt-2 border" />
                            )}
                          </div>
                        </div>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendBanner({id: `${Date.now()}`, title:'', subtitle:'', cta: '', imageUrl: 'https://placehold.co/1200x500.png', dataAiHint: 'new banner'})}><PlusCircle className="h-4 w-4 mr-2"/>Add Banner</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="news" className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="font-headline">News Ticker</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <Label>Ticker Text</Label>
                  <Textarea {...register('news.ticker')} placeholder="Use '|' to separate messages."/>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="services" className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="font-headline">Services</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div><Label>Section Title</Label><Input {...register('services.title')} /></div>
                 {serviceFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                        <Label>Service {index+1}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                           <Input placeholder="Icon Name (Lotus, Diya, Feather)" {...register(`services.items.${index}.icon`)} />
                           <Input placeholder="Service Name" {...register(`services.items.${index}.name`)} />
                           <Input placeholder="Description" {...register(`services.items.${index}.description`)} />
                        </div>
                        <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => removeService(index)}>Remove</Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendService({id: `${Date.now()}`, icon:'Lotus', name:'', description:''})}><PlusCircle className="h-4 w-4 mr-2"/>Add Service</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about-us" className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="font-headline">About Us</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                 <div><Label>Section Title</Label><Input {...register('about.title')} /></div>
                 <div><Label>Content</Label><Textarea {...register('about.text')} rows={5} /></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div className="space-y-2">
                      <Label htmlFor="aboutImage">Image</Label>
                      <Input id="aboutImage" type="file" accept="image/*" onChange={handleAboutImageUpload} />
                      <Label htmlFor="aboutImageHint">Image AI Hint</Label>
                       <Input id="aboutImageHint" {...register('about.dataAiHint')} />
                    </div>
                    <div>
                      {watchedAboutImage && <Image src={watchedAboutImage} alt="About us preview" width={200} height={120} className="rounded-md object-cover border" />}
                    </div>
                 </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
          <Button type="submit" size="lg">Save All Content</Button>
        </form>
      </CardContent>
    </Card>
  );
}
