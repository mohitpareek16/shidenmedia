import React from 'react';
import { motion } from 'framer-motion';

const TRUSTED_PARTNERS = [
  { name: 'OVO', logo: '/partners/ovo-logo.png' },
  { name: 'Multiphase Digital', logo: '/partners/multiphase-digital-logo.png' },
  { name: 'Chakliart', logo: '/partners/chakliart-logo.png' },
  { name: 'Kontent Media', logo: '/img/Kontent media white logo.png' },
  { name: 'Partner Logo', logo: '/img/20210204_025906_0000-removebg-preview 1.png' },
  { name: 'Brand Partner', logo: '/img/auRWRthl_400x400.png' },
];

export const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            TRUSTED BY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 uppercase tracking-widest text-sm"
          >
            INDUSTRY LEADERS
          </motion.p>
        </div>

        {/* Partner Cards Grid - Show all partners */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TRUSTED_PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 flex items-center justify-center h-48 md:h-64 group cursor-pointer"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 md:max-h-20 max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 filter invert"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};