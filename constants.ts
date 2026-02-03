import {
  Palette,
  Video,
  Megaphone,
  Globe,
  Code,
  TrendingUp
} from 'lucide-react';
import { Service, Stat, Founder, Article, FAQ, Partner } from './types';

export const SERVICES: Service[] = [
  {
    id: 'creative',
    title: 'Creative & Design',
    description: 'Forging memorable identities through world-class design.',
    icon: Palette,
    subServices: ['Logo Design', 'Branding Strategy', 'UI/UX Design', 'SaaS Interfaces', 'UX Audits']
  },
  {
    id: 'content',
    title: 'Content & Media',
    description: 'Storytelling that captivates and converts.',
    icon: Video,
    subServices: ['Video Editing', 'Podcast Production', 'YouTube Thumbnails', 'Reels & Shorts', 'Full Production']
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Data-driven strategies to scale your reach.',
    icon: Megaphone,
    subServices: ['SEO Optimization', 'SEM & PPC', 'Social Media Management', 'Content Marketing', 'Email Campaigns']
  },
  {
    id: 'pr',
    title: 'Public Relations',
    description: 'Building authority and managing your reputation.',
    icon: Globe,
    subServices: ['Media Relations', 'Press Releases', 'Reputation Management', 'Digital PR', 'Crisis Comms']
  },
  {
    id: 'tech',
    title: 'Web & Tech',
    description: 'Robust engineering for the modern web.',
    icon: Code,
    subServices: ['E-commerce Dev', 'Landing Pages', 'API Integrations', 'Mobile Apps', 'AI Solutions']
  },
  {
    id: 'ads',
    title: 'Ads & Influencer',
    description: 'Amplifying your message through paid channels.',
    icon: TrendingUp,
    subServices: ['Google Ads', 'Meta Ads', 'Influencer Campaigns', 'Brand Endorsements', 'Performance Marketing']
  }
];

export const STATS: Stat[] = [
  { label: 'Projects Completed', value: '150', suffix: '+' },
  { label: 'Revenue Generated', value: '10', suffix: 'M+' },
  { label: 'Partner Agencies', value: '25', suffix: '+' },
  { label: 'Client Satisfaction', value: '99', suffix: '%' },
];

export const FOUNDERS: Founder[] = [
  {
    name: 'Alex Shiden',
    role: 'CEO & Co-Founder',
    image: 'https://picsum.photos/400/500?random=10',
    bio: 'Visionary leader with a decade of experience in digital transformation and brand scaling.',
    socials: [{ platform: 'LinkedIn', url: '#' }, { platform: 'Twitter', url: '#' }]
  },
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    image: 'https://picsum.photos/400/500?random=11',
    bio: 'Award-winning designer obsessed with pixel perfection and user-centric experiences.',
    socials: [{ platform: 'LinkedIn', url: '#' }, { platform: 'Behance', url: '#' }]
  }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Digital Marketing',
    category: 'Tech Trends',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/800/600?random=20',
    excerpt: 'How artificial intelligence is reshaping the way brands interact with customers.'
  },
  {
    id: '2',
    title: 'Minimalism: Why Less is More in UX',
    category: 'Design',
    date: 'Sep 28, 2023',
    image: 'https://picsum.photos/800/600?random=21',
    excerpt: 'Exploring the impact of clean interfaces on user retention and conversion rates.'
  },
  {
    id: '3',
    title: 'Video Content Strategy for 2024',
    category: 'Media',
    date: 'Sep 15, 2023',
    image: 'https://picsum.photos/800/600?random=22',
    excerpt: 'Short-form vs Long-form: Where should you invest your content budget next year?'
  }
];

export const FAQS: FAQ[] = [
  {
    question: "How does Shiden Media approach a new project?",
    answer: "We start with a deep dive discovery phase to understand your brand's core values and goals. This is followed by a strategic roadmap, design/development, and a rigorous testing phase before launch."
  },
  {
    question: "Do you work with startups or established enterprises?",
    answer: "Both. We love the energy of startups and the scale of enterprises. Our agile methodology adapts to the specific needs and pace of your organization."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Timeline varies by project complexity. A branding package might take 2-4 weeks, while a comprehensive web & marketing overhaul could take 8-12 weeks."
  },
  {
    question: "Can you handle ongoing maintenance and support?",
    answer: "Absolutely. We believe in long-term partnerships. We offer retainer packages for ongoing design, dev support, and marketing optimization."
  }
];

export const PARTNERS: Partner[] = [
  { name: 'OVO', logo: '/partners/ovo-logo.png' },
  { name: 'Multiphase Digital', logo: '/partners/multiphase-digital-logo.png' },
  { name: 'Chakliart', logo: '/partners/chakliart-logo.png' },
  { name: 'TechFlow', logo: 'https://picsum.photos/200/100?random=30' },
  { name: 'NexGen', logo: 'https://picsum.photos/200/100?random=31' },
  { name: 'Elevate', logo: 'https://picsum.photos/200/100?random=32' },
  { name: 'BrightSide', logo: 'https://picsum.photos/200/100?random=33' },
  { name: 'Quantum', logo: 'https://picsum.photos/200/100?random=34' },
  { name: 'Velocify', logo: 'https://picsum.photos/200/100?random=35' },
  { name: 'Zenith', logo: 'https://picsum.photos/200/100?random=36' },
];