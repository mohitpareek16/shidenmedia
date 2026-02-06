import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStats } from './components/AboutStats';
import { Services } from './components/Services';
import { Partners } from './components/Partners';
import { Founders } from './components/Founders';
import { FounderJourney } from './components/FounderJourney';
import { Articles } from './components/Articles';
import { FAQSection } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ShidenGame } from './components/ShidenGame';
import { LoadingScreen } from './components/LoadingScreen';
import { ArrowRight, Gamepad2, Zap } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState<'home' | 'game'>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (view === 'game') {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <ShidenGame onExit={() => setView('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-shiden-accent selection:text-white bg-shiden-dark text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar onViewChange={setView} />

          {/* Floating Game CTA for Mobile/Desktop */}
          <div className="fixed bottom-6 right-6 z-40 md:hidden">
            <button
              onClick={() => setView('game')}
              className="bg-shiden-accent text-white p-4 rounded-full shadow-lg shadow-blue-500/50 animate-bounce"
            >
              <Gamepad2 />
            </button>
          </div>

          <main>
            <Hero onViewChange={setView} />
            <AboutStats />
            <Services />
            <Founders />
            <FounderJourney />
            <Articles />

            {/* Enhanced Game Teaser Section */}
            <section className="py-32 bg-black relative overflow-hidden text-center group">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-black to-purple-900/20 animate-pulse"></div>

              {/* Moving Grid Floor (CSS Animation) */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 85, 255, .3) 25%, rgba(0, 85, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 85, 255, .3) 75%, rgba(0, 85, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 85, 255, .3) 25%, rgba(0, 85, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 85, 255, .3) 75%, rgba(0, 85, 255, .3) 76%, transparent 77%, transparent)',
                  backgroundSize: '50px 50px',
                  transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'
                }}>
              </div>

              <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20 backdrop-blur-md">
                  <Zap className="text-shiden-accent w-8 h-8" fill="currentColor" />
                </div>

                <h2 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                  READY TO <span className="text-shiden-accent">ENGAGE?</span>
                </h2>

                <p className="text-white/60 mb-10 max-w-lg mx-auto text-lg">
                  Enter the Shiden Interface. Restore order to chaos in our interactive particle simulation.
                </p>

                <button
                  onClick={() => setView('game')}
                  className="relative group px-12 py-5 bg-white text-black font-bold uppercase tracking-widest overflow-hidden rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Initialize System <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-shiden-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Initialize System <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </section>

            <FAQSection />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
