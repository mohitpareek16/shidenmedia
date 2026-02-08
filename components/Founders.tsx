import React, { useRef } from 'react';
import { Container } from './ui/Container';
import { FOUNDERS } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Founders: React.FC = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const founder = {
        ...FOUNDERS[0],
        name: "Devendra Purohit",
        image: "/img/Founder.png", // Actual founder photo
    };

    return (
        <section ref={targetRef} id="founders" className="py-32 bg-white text-black overflow-hidden relative">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 relative z-10">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="h-px w-12 bg-shiden-accent"></span>
                            <span className="text-shiden-accent font-bold uppercase tracking-widest text-sm">The Visionary</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8 uppercase">
                            Devendra <br /> Purohit.
                        </h2>

                        <p className="text-2xl font-light leading-relaxed mb-8 text-gray-800">
                            "From the streets of Bikaner to the boardrooms of global sharks. I didn't just build a company; I built a survival mechanism that turned into an empire."
                        </p>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-lg">CEO & Founder</p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-black transition-colors underline">LinkedIn</a>
                                <a href="#" className="text-gray-400 hover:text-black transition-colors underline">Twitter</a>
                            </div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
                            <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0">
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    className="w-full h-full object-cover contrast-125"
                                />
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border border-black/10 rounded-full animate-spin-slow pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-shiden-accent/10 rounded-full blur-xl pointer-events-none"></div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
