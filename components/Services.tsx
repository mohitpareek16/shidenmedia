import React, { useRef } from 'react';
import { Container } from './ui/Container';
import { SERVICES } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const COLORS = [
  'bg-[#FF3B30]', 
  'bg-[#FF9500]', 
  'bg-[#AF52DE]', 
  'bg-[#00C7BE]', 
  'bg-[#34C759]', 
  'bg-[#5856D6]'
];

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    // Mobile: Auto height, normal margin. Desktop: Sticky, Viewport height
    <div className="relative md:sticky md:top-24 w-full mb-8 md:mb-0 md:h-[calc(100vh-100px)] flex items-start justify-center pb-0 md:pb-8 perspective-1000">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={`relative w-full max-w-6xl rounded-[20px] md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/20 min-h-[500px] md:min-h-0 md:h-full`}
        style={{
             backgroundColor: '#111',
        }}
      >
          {/* Card Background Layer */}
          <div className={`absolute inset-0 ${COLORS[index % COLORS.length]} opacity-90`}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/40"></div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col lg:flex-row w-full h-full p-2 md:p-4 gap-2 md:gap-0">
              
              {/* Left Side: Text Info */}
              <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col justify-between bg-black/20 backdrop-blur-sm rounded-[16px] md:rounded-[24px] border border-white/10">
                 <div>
                    <div className="flex justify-between items-start mb-6 md:mb-12">
                         <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                             <service.icon size={20} className="md:w-8 md:h-8" />
                         </div>
                         <span className="font-display font-bold text-2xl md:text-5xl opacity-30 text-white">0{index + 1}</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-[0.9]">
                        {service.title}
                    </h3>
                    <p className="text-sm md:text-xl font-light text-white/80 leading-relaxed max-w-md">
                        {service.description}
                    </p>
                 </div>

                 <div className="pt-6 md:pt-8 border-t border-white/20 mt-6 md:mt-8">
                     <button className="group flex items-center gap-4 text-white text-base md:text-xl font-bold uppercase tracking-widest hover:text-black transition-colors">
                        Discover 
                        <span className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform" />
                        </span>
                     </button>
                 </div>
              </div>

              {/* Right Side: Visual List */}
              <div className="w-full lg:w-1/2 p-4 md:p-12 flex flex-col justify-center">
                   <div className="space-y-2 md:space-y-4">
                        {service.subServices.map((sub, i) => (
                            <div key={i} className="group flex items-center justify-between border-b border-white/30 pb-2 md:pb-4 cursor-pointer hover:border-white transition-colors">
                                <span className="text-lg md:text-3xl font-display font-bold text-white group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300">
                                    {sub}
                                </span>
                                <ArrowUpRight size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity md:w-6 md:h-6" />
                            </div>
                        ))}
                   </div>
              </div>
          </div>
      </motion.div>
    </div>
  );
};

export const Services: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="services" ref={containerRef} className="relative bg-black min-h-[100vh] pb-20 md:pb-32">
       
       {/* Fixed Background Title */}
       <div className="sticky top-0 h-[30vh] md:h-screen flex items-center justify-center overflow-hidden pointer-events-none mb-8 md:mb-12">
          <motion.h2 
            style={{ 
                opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0.05]),
                scale: useTransform(scrollYProgress, [0, 0.15], [1, 1.2])
            }}
            className="text-[15vw] font-display font-bold text-white/20 leading-none text-center whitespace-nowrap blur-sm pt-20"
          >
            EXPERTISE
          </motion.h2>
       </div>

       {/* Cards Stack */}
       <div className="relative z-10 px-4 md:px-0">
         <Container>
            <div className="flex flex-col gap-0">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
            </div>
         </Container>
       </div>
    </section>
  );
};