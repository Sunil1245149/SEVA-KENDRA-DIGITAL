
export interface NavLink {
  id: string;
  text: string;
  href: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  dataAiHint: string;
  title: string;
  subtitle: string;
  cta: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  name: string;
  description: string;
}

export interface AppSettings {
  branding: {
    logo: string; // base64
    name: string;
  };
  colors: {
    primary: string;
    background: string;
    accent: string;
  };
  typography: {
    fontBody: string;
    fontHeadline: string;
  };
  header: {
    contact: {
      phone: string;
      email: string;
    };
    navLinks: NavLink[];
  };
  footer: {
    copyright: string;
    socialLinks: SocialLink[];
  };
  hero: {
    banners: Banner[];
  };
  news: {
    ticker: string;
  };
  services: {
    title: string;
    items: ServiceItem[];
  };
  about: {
    title: string;
    text: string;
    imageUrl: string;
    dataAiHint: string;
    ownerName: string;
    ownerImageUrl: string;
  };
}
