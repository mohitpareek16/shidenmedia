import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

// Logo Floater Component (Simplified 3D Element)
const LogoFloater: React.FC<{ 
  logo: string, 
  delay: number,
  mouseX: any, 
  mouseY: any,
  scale?: number
}> = ({ logo, delay, mouseX, mouseY, scale = 1 }) => {
    
    // Parallax Tilt based on mouse
    const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

    // Floating Animation
    const float = {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }
    };

    return (
        <motion.div 
            animate={float}
            style={{ rotateX, rotateY }}
            className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center perspective-500 group"
        >
             {/* Glass Card Container */}
             <div 
                className="w-full h-full rounded-2xl relative z-10 flex items-center justify-center border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] p-8"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
             >
                 {/* Logo */}
                 <div className="w-full h-full relative z-20 opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <img 
                        src={logo} 
                        alt="Partner Logo" 
                        className="w-full h-full object-contain filter drop-shadow-lg" 
                        style={{ transform: `scale(${scale})` }}
                     />
                 </div>
                 
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
             </div>
             
             {/* Shadow on Floor */}
             <div className="absolute -bottom-10 md:-bottom-12 w-24 md:w-40 h-4 bg-black/40 rounded-[100%] blur-lg"></div>
        </motion.div>
    )
}

export const Articles: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "center center"] });
  
  // Interaction State
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width);
      mouseY.set((e.clientY - top) / height);
  };

  // Parallax Entries - 3 Items Logic
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-50vw", "0vw"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["50vw", "0vw"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["200px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // URLs from prompt
  const LOGO_MULTIPHASE = "https://file-service.21st.dev/file/71328905-950e-4340-9831-2947475f850e";
  const LOGO_KONTENT = "https://file-service.21st.dev/file/5a5d0932-5a9f-4316-952a-93a8d424b94e";
  const LOGO_CHAKLIART = "https://file-service.21st.dev/file/0d0061e8-782a-4dbd-8877-333c1f062402";

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        id="partners" 
        className="relative h-[80vh] min-h-[600px] overflow-hidden bg-[#050505] border-t border-white/10"
    >
      <div className="absolute inset-0 perspective-[1000px]">
          
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-shiden-dark to-[#000000]" />
          
           {/* Clear Heading Title */}
           <div className="absolute top-16 md:top-24 left-0 w-full flex flex-col items-center justify-start z-30 pointer-events-none px-4">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest text-center mb-4">
                  TRUSTED BY
              </h2>
              <div className="w-24 h-1 bg-shiden-accent rounded-full"></div>
              <p className="mt-4 text-white/50 text-sm md:text-base uppercase tracking-widest">Industry Leaders</p>
           </div>
          
          {/* The Floor - Tilted 3D Plane */}
          <div className="absolute bottom-0 w-[200%] -left-[50%] h-[120vh] origin-bottom transform rotate-x-[70deg] translate-z-[50px] bg-[#111] shadow-inner">
               <div className="w-full h-full opacity-10" style={{ 
                   backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', 
                   backgroundSize: '100px 100px' 
               }} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>

          {/* Logos Container - EXACTLY 3 LOGOS */}
          <div className="absolute top-1/2 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 z-20 pointer-events-none px-4 -translate-y-1/2 pt-20">
              
              <motion.div style={{ x: xLeft, opacity }} className="pointer-events-auto">
                  <LogoFloater logo={LOGO_MULTIPHASE} delay={0} mouseX={mouseX} mouseY={mouseY} scale={1.2} />
              </motion.div>
              
              <motion.div style={{ y: yCenter, opacity }} className="pointer-events-auto">
                  <LogoFloater logo={LOGO_KONTENT} delay={0.2} mouseX={mouseX} mouseY={mouseY} scale={1.5} />
              </motion.div>
              
              <motion.div style={{ x: xRight, opacity }} className="pointer-events-auto">
                  <LogoFloater logo={LOGO_CHAKLIART} delay={0.1} mouseX={mouseX} mouseY={mouseY} />
              </motion.div>

          </div>
      </div>
    </section>
  );
};
