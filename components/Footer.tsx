import React from 'react';
import { Container } from './ui/Container';
import { Zap, Instagram, Twitter, Linkedin, Facebook, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-10 border-t border-white/10">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
             <div className="max-w-xl">
                 <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.8]">
                    LET'S CREATE <br/> IMPACT.
                 </h2>
                 <a href="mailto:hello@shiden.media" className="text-2xl md:text-4xl hover:text-shiden-accent transition-colors border-b-2 border-white/20 pb-2 inline-block mb-12">
                    hello@shiden.media
                 </a>
             </div>
             
             <div className="flex flex-col gap-8 text-right">
                <a href="#" className="flex items-center gap-2 text-xl font-bold hover:text-shiden-accent justify-end group transition-colors">
                    Instagram <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center gap-2 text-xl font-bold hover:text-shiden-accent justify-end group transition-colors">
                    LinkedIn <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center gap-2 text-xl font-bold hover:text-shiden-accent justify-end group transition-colors">
                    Twitter <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
             </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-t border-white/10 pt-12">
            <div>
                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4">Sitemap</h4>
                <ul className="space-y-2 text-lg font-medium">
                    <li><a href="#" className="hover:text-shiden-accent">Work</a></li>
                    <li><a href="#" className="hover:text-shiden-accent">Services</a></li>
                    <li><a href="#" className="hover:text-shiden-accent">Agency</a></li>
                    <li><a href="#" className="hover:text-shiden-accent">Careers</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4">Offices</h4>
                <ul className="space-y-2 text-lg font-medium">
                    <li>London, UK</li>
                    <li>New York, USA</li>
                    <li>Tokyo, JP</li>
                </ul>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Shiden Media.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms & Conditions</a>
            </div>
        </div>
      </Container>
    </footer>
  );
};