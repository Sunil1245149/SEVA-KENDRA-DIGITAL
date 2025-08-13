import type { AppSettings } from '@/types';

export const defaultSettings: AppSettings = {
  branding: {
    logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgPHBhdGggZD0iTTUgMTJoMi41VzloLTUgWiIvPgogIDxwYXRoIGQ9Ik0gMTcgMTJoMi41VzloLTUgWiIvPgogIDxwYXRoIGQ9Ik0xMiAxOHYtMi41IiAvPgogIDxwYXRoIGQ9Ik0xMiAxMi41VjEwIiAvPgogIDxwYXRoIGQ9Ik0xMiA1djIuNSIgLz4KICA8cGF0aCBkPSJtMTQuNSA0LjVMMTIgMiA5LjUgNC41IiAvPgo8L3N2Zz4K',
    name: 'Quick Digital Seva Kendra',
  },
  colors: {
    primary: '36 100% 60%',
    background: '60 56% 91%',
    accent: '120 60% 32%',
  },
  typography: {
    fontBody: 'PT Sans',
    fontHeadline: 'Playfair Display',
  },
  header: {
    contact: {
      phone: '+91-123-456-7890',
      email: 'info@sevakendra.com',
    },
    navLinks: [
      { id: 'home', text: 'Home', href: '#home' },
      { id: 'services', text: 'Services', href: '#services' },
      { id: 'about', text: 'About Us', href: '#about' },
      { id: 'contact', text: 'Contact', href: '#contact' },
    ],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Seva Kendra Digital. All Rights Reserved.`,
    socialLinks: [
      { id: 'facebook', name: 'Facebook', url: 'https://facebook.com' },
      { id: 'twitter', name: 'Twitter', url: 'https://twitter.com' },
      { id: 'instagram', name: 'Instagram', url: 'https://instagram.com' },
    ],
  },
  hero: {
    banners: [
      {
        id: '1',
        imageUrl: 'https://placehold.co/1200x500.png',
        dataAiHint: 'digital services',
        title: 'Empowering India with Digital Services',
        subtitle: 'Quick, Reliable, and Accessible Solutions for Everyone.',
        cta: 'Explore Services',
      },
      {
        id: '2',
        imageUrl: 'https://placehold.co/1200x500.png',
        dataAiHint: 'government schemes',
        title: 'Access Government Schemes Easily',
        subtitle: 'We help you navigate and apply for various government programs.',
        cta: 'Learn More',
      },
    ],
  },
  news: {
    ticker: 'Latest Update: Aadhaar card services are now available 24/7. | New PAN card applications are processed within 48 hours.',
  },
  services: {
    title: 'Our Services',
    items: [
      { id: '1', icon: 'Lotus', name: 'Aadhaar Services', description: 'Enrollment, updates, and corrections for Aadhaar cards.' },
      { id: '2', icon: 'Feather', name: 'PAN Card', description: 'New applications and corrections for PAN cards.' },
      { id: '3', icon: 'Diya', name: 'Bill Payments', description: 'Pay electricity, water, and other utility bills easily.' },
      { id: '4', icon: 'Lotus', name: 'Banking Services', description: 'Basic banking services including deposits and withdrawals.' },
      { id: '5', icon: 'Feather', name: 'Travel Booking', description: 'Book train, bus, and flight tickets hassle-free.' },
      { id: '6', icon: 'Diya', name: 'Insurance', description: 'Get various insurance policies for health, vehicle, and life.' },
    ],
  },
  about: {
    title: 'About Us',
    text: 'Seva Kendra Digital is committed to bridging the digital divide by providing essential government and non-government services to citizens across India. Our mission is to make services accessible, affordable, and efficient for everyone, empowering communities through technology.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'community center india',
  },
};
