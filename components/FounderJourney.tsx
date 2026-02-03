import React, { useRef } from 'react';
import { Container } from './ui/Container';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Briefcase, Zap, Heart, Utensils } from 'lucide-react';

const MILESTONES = [
    {
        year: "The Roots",
        title: "Mumbai to Bikaner",
        description: "Born in a small, lovely town of Bikaner, but the story began in Mumbai. Life took a sharp turn at age 8 when I lost my grandfather, a great businessman. We shifted back to Bikaner, resetting everything.",
        icon: MapPin,
        image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800",
        align: "left"
    },
    {
        year: "The Catalyst",
        title: "Shouldering Responsibility",
        description: "At 12, I lost my father. In the face of tragedy, I made a promise to myself: I would restore the lifestyle my grandfather built. I didn't know how, but I knew I had to become economically strong to support my mother and brother.",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1518536647178-0870d03c4cb3?auto=format&fit=crop&q=80&w=800",
        align: "right"
    },
    {
        year: "The Pivot",
        title: "Crisis into Opportunity",
        description: "While pursuing CA, Covid hit. Exams were cancelled, and my mother's salon business paused. Instead of waiting, I started a Cloud Kitchen from home selling sandwiches. It was survival mode.",
        icon: Utensils,
        image: "https://images.unsplash.com/photo-1509722747741-0903d963c989?auto=format&fit=crop&q=80&w=800",
        align: "left"
    },
    {
        year: "The Realization",
        title: "The Marketing Gap",
        description: "The sandwiches were great, but reaching customers was the struggle. I realized: making a good product is half the battle; the other half is being seen. This was the spark.",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
        align: "right"
    },
    {
        year: "The Lesson",
        title: "Corporate to Agency",
        description: "Worked as a Sales Manager at a top EdTech firm. Saw how Finance, Marketing, and Sales interconnect. Combining this corporate structure with my startup hustle, Shiden Media (Multiface Digital) was born.",
        icon: Briefcase,
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
        align: "left"
    },
    {
        year: "Present Day",
        title: "Building Legacies",
        description: "From ₹1000 packages to dealing with Sharks, top Creators, and global Entrepreneurs. With the support of the strong women in my life, we don't just build brands; we engineer movements.",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        align: "right"
    }
];

export const FounderJourney: React.FC = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-32 bg-shiden-dark relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            
            <Container className="relative z-10">
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                         <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
                            THE <span className="text-shiden-accent">ORIGIN.</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                            "If you take your work as worship, you will get your result as Prasad." <br/>
                            <span className="text-sm mt-4 block opacity-50 uppercase tracking-widest">- Devendra Purohit</span>
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Central Line - Only on desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 h-full">
                        <motion.div 
                            style={{ height: lineHeight }} 
                            className="w-full bg-gradient-to-b from-shiden-accent via-white to-shiden-accent shadow-[0_0_15px_rgba(0,85,255,0.5)]"
                        />
                    </div>

                    <div className="flex flex-col gap-24 pb-20">
                        {MILESTONES.map((milestone, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-12 relative ${milestone.align === 'right' ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Center Dot - Desktop */}
                                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-shiden-accent rounded-full z-20 shadow-[0_0_10px_#0055FF]"></div>

                                {/* Content Side */}
                                <div className={`w-full md:w-1/2 ${milestone.align === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} text-center md:text-inherit`}>
                                    <div className={`inline-flex items-center gap-2 mb-4 p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm ${milestone.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                                        <milestone.icon size={16} className="text-shiden-accent" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">{milestone.year}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{milestone.title}</h3>
                                    <p className="text-white/60 text-lg leading-relaxed font-light">
                                        {milestone.description}
                                    </p>
                                </div>
                                
                                {/* Image Side */}
                                <div className={`w-full md:w-1/2 ${milestone.align === 'left' ? 'md:pl-16' : 'md:pr-16'}`}>
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                                        <div className="absolute inset-0 bg-shiden-accent/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                        <img 
                                            src={milestone.image} 
                                            alt={milestone.title} 
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
