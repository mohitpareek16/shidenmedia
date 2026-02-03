import React from 'react';
import { Container } from './ui/Container';
import { ArrowRight } from 'lucide-react';

export const HiringBanner: React.FC = () => {
  return (
    <section id="hiring" className="py-40 bg-shiden-accent text-white overflow-hidden relative group cursor-pointer">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <Container className="relative z-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] mb-8">Careers at Shiden</p>
        
        <div className="overflow-hidden">
            <h2 className="text-[10vw] leading-[0.85] font-display font-bold tracking-tighter hover:scale-105 transition-transform duration-700 origin-center">
                JOIN THE <br/> CULT.
            </h2>
        </div>
        
        <div className="mt-16 flex justify-center">
            <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-xl hover:bg-white hover:text-black transition-all flex items-center gap-3">
                See Open Roles <ArrowRight />
            </button>
        </div>
      </Container>
    </section>
  );
};