import React, { useState } from 'react';
import { Container } from './ui/Container';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white text-black">
      <Container className="max-w-5xl">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-20 tracking-tighter">
          FREQUENTLY <br/> ASKED
        </h2>

        <div className="space-y-0 border-t border-black">
          {FAQS.map((faq, index) => (
            <div 
                key={index} 
                className="border-b border-black overflow-hidden group"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-10 text-left hover:bg-gray-50 transition-colors px-4"
              >
                <span className="text-2xl md:text-3xl font-medium font-display">{faq.question}</span>
                <span className={`p-2 rounded-full border border-black transition-all ${activeIndex === index ? 'bg-black text-white rotate-180' : 'bg-transparent text-black'}`}>
                    {activeIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pb-10 text-xl text-gray-600 leading-relaxed max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};