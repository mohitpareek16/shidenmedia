import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  subServices: string[];
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Founder {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    platform: string;
    url: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Partner {
  name: string;
  logo: string;
}