import React, { useRef, useEffect } from 'react';
import { Container } from './ui/Container';
import { STATS } from '../constants';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

const KEYWORDS = ["STRATEGY", "DESIGN", "DEVELOPMENT", "MARKETING", "BRANDING", "INNOVATION", "GROWTH", "CULTURE"];

// Parallax Tape Component
const ParallaxTape: React.FC<{ reverse?: boolean, className?: string, parentRef: React.RefObject<HTMLElement> }> = ({ reverse, className, parentRef }) => {
    const { scrollYProgress } = useScroll({
        target: parentRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(
        scrollYProgress, 
        [0, 1], 
        reverse ? ["-20%", "10%"] : ["10%", "-20%"] 
    );

    return (
        <div className={`flex overflow-hidden py-6 bg-shiden-accent text-white ${className}`}>
             <motion.div 
                className="flex gap-12 whitespace-nowrap will-change-transform"
                style={{ x }}
             >
                 {[...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS].map((word, i) => (
                     <span key={i} className="text-4xl md:text-6xl font-display font-bold uppercase tracking-widest flex items-center gap-12">
                         {word} <span className="w-4 h-4 bg-black rounded-full inline-block"></span>
                     </span>
                 ))}
             </motion.div>
        </div>
    )
}

// Counting Number Component
const Counter: React.FC<{ value: string }> = ({ value }) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    const springValue = useSpring(0, {
        stiffness: 30,
        damping: 20,
        duration: 2000
    });

    const displayValue = useTransform(springValue, (current) => Math.floor(current));

    useEffect(() => {
        if (isInView) {
            springValue.set(numericValue);
        }
    }, [isInView, numericValue, springValue]);

    return (
        <span ref={ref} className="inline-flex items-baseline">
            <motion.span>{displayValue}</motion.span>
            <span>{suffix}</span>
        </span>
    );
};

const StatItem: React.FC<{ stat: typeof STATS[0], index: number }> = ({ stat, index }) => {
  return (
    <div className="border-t-2 border-black pt-6">
      <div className="text-6xl md:text-8xl font-display font-bold text-black mb-2 tracking-tighter">
        <Counter value={stat.value + (stat.suffix || '')} />
      </div>
      <div className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest">
        {stat.label}
      </div>
    </div>
  );
};

export const AboutStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="about" className="relative bg-white text-black overflow-hidden py-48">
      
      {/* Top Tape - Horizontal */}
      <div className="absolute top-0 left-0 w-full z-0">
         <ParallaxTape parentRef={sectionRef} />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 mb-32">
            <div className="lg:w-1/2">
                <h2 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-8">
                    WE ARE THE <br/>
                    <span className="text-shiden-accent">CATALYST.</span>
                </h2>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-end">
                <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-800">
                    Traditional agencies adapt to change. <strong className="text-black font-bold">We drive it.</strong> <br/><br/>
                    Born from a collision of high-end design and aggressive growth strategies, Shiden Media exists to propel ambitious brands into market dominance.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </Container>
      
      {/* Bottom Tape - Horizontal */}
      <div className="absolute bottom-0 left-0 w-full z-0">
         <ParallaxTape reverse className="bg-black" parentRef={sectionRef} />
      </div>

    </section>
  );
};