import React, { useState } from 'react';
import { Container } from './ui/Container';
import { ArrowRight, Send, Check } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        // Simulate sending
        setTimeout(() => setFormState('success'), 1500);
    };

    return (
        <section id="contact" className="py-24 bg-shiden-dark border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            
            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* Text Column */}
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-12 bg-shiden-accent"></span>
                            <span className="text-shiden-accent font-bold uppercase tracking-widest text-sm">Get in Touch</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-[0.9]">
                            LET'S START A <br/> REVOLUTION.
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-md">
                            Ready to scale? We only work with brands that are ready to dominate. Fill out the form, and we'll get back to you within 24 hours.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</span>
                                <a href="mailto:hello@shiden.media" className="text-2xl font-display text-white hover:text-shiden-accent transition-colors">hello@shiden.media</a>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-widest text-gray-500 mb-1">Phone</span>
                                <a href="tel:+1555000000" className="text-2xl font-display text-white hover:text-shiden-accent transition-colors">+1 (555) 000-0000</a>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:w-1/2">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-3xl">
                            {formState === 'success' ? (
                                <div className="h-96 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 text-black">
                                        <Check size={40} />
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">Message Sent</h3>
                                    <p className="text-white/60">We'll be in touch shortly.</p>
                                    <button 
                                        onClick={() => setFormState('idle')}
                                        className="mt-8 text-shiden-accent underline hover:text-white"
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/70">Name</label>
                                            <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-shiden-accent transition-colors" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-white/70">Email</label>
                                            <input type="email" required className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-shiden-accent transition-colors" placeholder="john@company.com" />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/70">Interest</label>
                                        <select className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-shiden-accent transition-colors appearance-none">
                                            <option className="bg-black">Branding & Design</option>
                                            <option className="bg-black">Web Development</option>
                                            <option className="bg-black">Digital Marketing</option>
                                            <option className="bg-black">Content Production</option>
                                            <option className="bg-black">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/70">Message</label>
                                        <textarea required rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-shiden-accent transition-colors" placeholder="Tell us about your project..."></textarea>
                                    </div>

                                    <button 
                                        disabled={formState === 'sending'}
                                        type="submit" 
                                        className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-shiden-accent hover:text-white transition-all flex items-center justify-center gap-2 group"
                                    >
                                        {formState === 'sending' ? 'Sending...' : 'Send Message'}
                                        {!formState && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};