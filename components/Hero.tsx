import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Zap } from 'lucide-react';

// Decryption Text Effect Component
const DecryptText: React.FC<{ text: string; className?: string; revealDelay?: number }> = ({ text, className, revealDelay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) { 
        clearInterval(interval);
      }
      
      // Start revealing after delay
      setTimeout(() => {
        iteration += 1 / 3;
      }, revealDelay);
      
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  // Parallax Mouse Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="h-screen w-full relative overflow-hidden bg-void-black text-white flex flex-col items-center justify-center cursor-crosshair"
    >
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '80px 80px' 
           }}>
      </div>
      
      {/* Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Composition */}
      <div className="relative z-10 w-full max-w-[1920px] px-6 md:px-12 h-screen flex flex-col justify-between py-12">
        
        {/* Top Bar: Technical Status */}
        <div className="flex justify-between items-start font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-400">
           <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-signal-yellow">
                <span className="w-2 h-2 bg-signal-yellow rounded-full animate-pulse"></span>
                <DecryptText text="SYSTEM_ONLINE" />
             </div>
             <span>ID: DAYDREAM_UNIT_01</span>
           </div>
           <div className="text-right flex flex-col gap-2">
             <span>LOC: 35.6762° N, 139.6503° E</span>
             <span className="text-white">ENCRYPTION: NONE</span>
           </div>
        </div>

        {/* Central Typography: Kinetic */}
        <div className="relative flex flex-col items-center justify-center mix-blend-difference">
          <motion.div
            style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 + y1.get() }}
            className="relative z-20"
          >
            <h1 className="font-display font-black text-[18vw] leading-[0.8] tracking-tighter text-white select-none relative">
              <span className="absolute -top-6 left-2 text-xs font-mono font-normal tracking-widest text-signal-yellow opacity-0 md:opacity-100">FIG.01</span>
              SONNY
            </h1>
          </motion.div>
          
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "40vw" }}
             transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
             className="h-[2px] bg-signal-yellow z-30 my-2 md:my-4 relative"
          >
             <div className="absolute right-0 -top-1 w-2 h-3 bg-signal-yellow"></div>
          </motion.div>

          <motion.div
            style={{ x: mousePosition.x, y: mousePosition.y + y2.get() }}
            className="relative z-10"
          >
            <h1 className="font-display font-black text-[18vw] leading-[0.8] tracking-tighter text-transparent text-outline-bold hover:text-white transition-colors duration-300 select-none">
              BOY
            </h1>
          </motion.div>

          {/* Floating 'Start' Prompt */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-[-15vh] md:bottom-[-10vh] flex flex-col items-center gap-4 z-40"
          >
             <Link to="/fragments" className="group relative px-8 py-4 bg-transparent border border-stone-600 hover:border-signal-yellow transition-colors duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-signal-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center gap-3">
                   <Play size={14} className="fill-white group-hover:fill-black text-white group-hover:text-black transition-colors" />
                   <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-white group-hover:text-black transition-colors">Enter The Void</span>
                </div>
             </Link>
          </motion.div>
        </div>

        {/* Bottom Credits / Footer */}
        <div className="flex justify-between items-end border-t border-white/10 pt-6">
           <div className="font-mono text-[9px] text-stone-500 w-1/3">
             <p className="mb-2 uppercase tracking-widest text-white">Warning</p>
             <p className="leading-relaxed">
               This site contains high-density visual data. <br/>
               Epilepsy warning: Flashing lights and patterns.
             </p>
           </div>
           
           <div className="hidden md:flex gap-12 font-display font-bold text-4xl text-stone-800 uppercase select-none">
              <span className="hover:text-signal-yellow transition-colors duration-300">Design</span>
              <span className="hover:text-signal-yellow transition-colors duration-300">Film</span>
              <span className="hover:text-signal-yellow transition-colors duration-300">Code</span>
           </div>

           <div className="w-1/3 flex justify-end">
              <Zap className="text-signal-yellow animate-pulse-fast" />
           </div>
        </div>

      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-8 w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
      <div className="absolute top-1/2 right-8 w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>

    </section>
  );
};

export default Hero;