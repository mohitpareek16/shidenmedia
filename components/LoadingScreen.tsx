import React from 'react';
import { motion } from 'framer-motion';
import { ShidenLogo } from './ui/ShidenLogo';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
        <div className="relative">
            {/* Ambient Background Glow */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-shiden-accent blur-[100px] rounded-full opacity-20"
            />

            {/* Logo Animation Container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* 1. The Bolt Icon Animates First */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="mb-8"
                >
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.path 
                            d="M10 5 H40 C65 5 85 25 85 50 C85 75 65 95 40 95 H10 V5 Z" 
                            fill="#0055FF"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                        <motion.path 
                            d="M55 20 L35 50 H50 L45 80 L65 50 H50 L55 20 Z" 
                            fill="white"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
                        />
                    </svg>
                </motion.div>

                {/* 2. Text Reveals */}
                <div className="overflow-hidden h-[120px] flex items-end">
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                         <ShidenLogo className="w-64 md:w-80 h-auto" variant="full" />
                    </motion.div>
                </div>

                {/* 3. Loading Bar */}
                <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-shiden-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.2, duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </div>
    </motion.div>
  );
};
