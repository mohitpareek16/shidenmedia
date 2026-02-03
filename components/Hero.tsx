import React, { useRef } from 'react';
import { Container } from './ui/Container';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { AntiGravityCanvas } from './ui/particle-effect-for-hero';

interface HeroProps {
    onViewChange: (view: 'home' | 'game') => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Keep subtle parallax for text, but let canvas handle main mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position (-1 to 1)
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const textX = useTransform(mouseX, [-1, 1], [-20, 20]); // Reduced movement
  const textY = useTransform(mouseY, [-1, 1], [-20, 20]);
  
  const smoothX = useSpring(textX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(textY, { damping: 20, stiffness: 100 });

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] md:min-h-screen flex items-end pb-20 overflow-hidden bg-shiden-dark"
    >
      {/* New Particle Background */}
      <AntiGravityCanvas />
      
      {/* Noise Overlay (Optional, for texture) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>

      <Container className="relative z-10 w-full pointer-events-none">
        <div className="flex flex-col gap-6">
            <motion.div
                style={{ x: smoothX, y: smoothY }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="perspective-1000"
            >
                <h1 className="text-[14vw] md:text-[12vw] leading-[0.85] font-display font-bold text-white tracking-tighter cursor-default mt-20 md:mt-0 drop-shadow-2xl">
                    WE FORGE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-shiden-accent via-white to-shiden-accent bg-[length:200%_auto] animate-gradient">
                        LEGACIES
                    </span>
                </h1>
            </motion.div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 md:mt-12 border-t border-white/20 pt-8 backdrop-blur-sm gap-8 pointer-events-auto">
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-white/70 text-base md:text-xl max-w-xl font-light"
                >
                    Shiden Media is the intersection of culture, technology, and storytelling. 
                    We don't just build brands; we engineer movements.
                </motion.p>
                
                <div className="flex items-center gap-4">
                     <button 
                        onClick={() => onViewChange('game')}
                        className="md:hidden px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full"
                     >
                         Start Simulation
                     </button>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: 'spring' }}
                        className="hidden md:flex"
                    >
                        <a href="#about" className="h-24 w-24 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <ArrowDown className="w-8 h-8 relative z-10 group-hover:text-black transition-colors" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
      </Container>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
};
