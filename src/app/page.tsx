
'use client';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AppointmentSection from '@/components/sections/AppointmentSection';
import AboutUsSection from '@/components/sections/AboutUsSection';
import Footer from '@/components/sections/Footer';
import NewsTicker from '@/components/sections/NewsTicker';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <NewsTicker />
        <ServicesSection />
        <AppointmentSection />
        <AboutUsSection />
      </main>
      <Footer />
    </div>
  );
}
