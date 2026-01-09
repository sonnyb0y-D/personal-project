import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Noise } from './components/Noise';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { DreamLog } from './components/DreamLog';
import { CustomCursor } from './components/CustomCursor';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full">
      <CustomCursor />
      <Noise />
      
      {/* Top Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[60] mix-blend-exclusion"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none mix-blend-difference text-white">
        <div className="flex flex-col gap-1">
          <h1 className="font-grotesk font-bold text-xl tracking-tighter leading-none">DAYDREAM®</h1>
          <span className="font-mono-display text-[10px] tracking-widest opacity-60">PORTFOLIO.2025</span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <button className="pointer-events-auto font-mono-display text-xs border border-white/20 hover:bg-white hover:text-black transition-colors px-4 py-1 rounded-full cursor-hover backdrop-blur-md">
            MENU
          </button>
        </div>
      </header>

      {/* Side Data (Math Rock Elements) */}
      <div className="fixed bottom-8 left-8 z-40 font-mono-display text-[9px] leading-relaxed text-zinc-500 mix-blend-difference hidden md:block">
        <div className="flex gap-4">
           <div>
             <span className="block opacity-50">LOCAL_TIME</span>
             {time.toLocaleTimeString([], { hour12: false })}
           </div>
           <div>
             <span className="block opacity-50">COORDS</span>
             35.6762° N / 139.6503° E
           </div>
           <div>
             <span className="block opacity-50">FPS</span>
             60.0
           </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 bg-[#030303]">
        <Hero />
        
        {/* About Section - Minimalist */}
        <section className="px-6 md:px-12 py-32 max-w-[90vw] mx-auto border-r border-white/10 flex flex-col items-end text-right">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
           >
             <p className="font-grotesk text-4xl md:text-6xl font-bold leading-[0.9] text-white mb-8">
               <span className="opacity-30">I CREATE</span> DIGITAL HALLUCINATIONS <span className="opacity-30">FOR THE</span> MODERN WEB.
             </p>
             <p className="font-mono-display text-xs md:text-sm text-zinc-400 max-w-md ml-auto">
               Merging the raw imperfection of shoegaze music with the calculated precision of creative coding. Based in the cloud, operating globally.
             </p>
           </motion.div>
        </section>

        <Gallery />
        <DreamLog />
        
        <footer className="py-24 px-6 md:px-12 bg-black text-white relative overflow-hidden">
           {/* Big Footer Type */}
           <div className="relative z-10 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between">
              <div className="font-grotesk text-[15vw] leading-[0.8] font-black tracking-tighter opacity-10 select-none absolute bottom-0 left-0 pointer-events-none">
                END
              </div>
              
              <div className="flex flex-col gap-4 font-mono-display text-xs z-20">
                <a href="#" className="hover:text-fuchsia-500 cursor-hover">[ GITHUB ]</a>
                <a href="#" className="hover:text-fuchsia-500 cursor-hover">[ TWITTER ]</a>
                <a href="#" className="hover:text-fuchsia-500 cursor-hover">[ EMAIL ]</a>
              </div>

              <div className="mt-12 md:mt-0 font-sans-clean text-xs text-zinc-600 self-end z-20 text-right">
                <p>&copy; 2025 DAYDREAM INC.</p>
                <p>DESIGNED WITH CHAOS</p>
              </div>
           </div>
        </footer>
      </div>
    </main>
  );
};

export default App;