import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Marquee: React.FC<{ text: string; direction?: number }> = ({ text, direction = 1 }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap opacity-90 select-none">
      <motion.div
        className="flex gap-8"
        animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[12vw] leading-[0.85] font-grotesk font-black uppercase text-transparent text-stroke-1 hover:text-white transition-all duration-500 cursor-hover">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="min-h-screen relative flex flex-col justify-center overflow-hidden bg-[#030303]">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* Abstract Shapes */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-fuchsia-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" 
      />

      <div className="relative z-10 py-20 flex flex-col gap-0 mix-blend-lighten">
        <Marquee text="DAYDREAMING" direction={1} />
        <Marquee text="INDIE.COLLECTIVE" direction={-1} />
        <Marquee text="SHOEGAZE.MATH" direction={1} />
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 max-w-sm">
        <div className="h-[1px] w-full bg-white/30 mb-4"></div>
        <p className="font-mono-display text-xs text-zinc-400 mb-2">
          [ 001 ] — INTRO
        </p>
        <p className="font-serif-display text-2xl italic text-white leading-tight">
          "Constructing static noise into digital melodies."
        </p>
      </div>

      <motion.div 
        className="absolute bottom-12 right-6 md:right-12 font-mono-display text-xs text-right hidden md:block"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        SCROLL_DOWN <br/> ↓
      </motion.div>
    </section>
  );
};