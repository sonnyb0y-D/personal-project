import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Terminal, Cpu, Disc, Shield, Crosshair, ArrowRight, Activity } from 'lucide-react';

// Reusing DecryptText locally for isolated effect
const DecryptText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '#'));
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 2); 
    mouseY.set((clientY / innerHeight - 0.5) * 2);
  };
  
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), springConfig);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-void-black text-white relative overflow-hidden flex flex-col pt-32 pb-12 px-4 md:px-12"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.1]" 
           style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[1600px] mx-auto w-full h-full relative z-10">
        
        {/* Header Section */}
        <div className="border-b border-white/20 pb-8 mb-12 flex flex-col md:flex-row justify-between items-end">
           <div>
              <div className="flex items-center gap-2 text-signal-yellow mb-2 font-mono text-xs uppercase tracking-widest">
                 <Terminal size={12} />
                 <span>User_Profile_Loaded</span>
              </div>
              <h1 className="font-display font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none">
                 PLAYER<span className="text-outline">_ONE</span>
              </h1>
           </div>
           <div className="text-right font-mono text-[10px] md:text-xs text-stone-400 mt-4 md:mt-0 uppercase tracking-widest">
              <p>Status: Wandering</p>
              <p>Current Sector: Internet</p>
           </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Column 1: The Core (Avatar) - Col Span 4 */}
           <motion.div 
             style={{ rotateX, rotateY, perspective: 1000 }}
             className="lg:col-span-4 bg-[#111] border border-stone-800 relative min-h-[400px] flex flex-col justify-between overflow-hidden group"
           >
              {/* Scanline */}
              <div className="absolute top-0 w-full h-1 bg-signal-yellow/50 shadow-[0_0_15px_rgba(255,214,0,0.5)] animate-[scan_2s_linear_infinite]"></div>

              <div className="p-6 relative z-10">
                 <div className="flex justify-between items-start">
                    <Cpu className="text-stone-600" />
                    <span className="font-mono text-[9px] text-signal-yellow border border-signal-yellow px-1">SYNC 100%</span>
                 </div>
              </div>

              {/* The Abstract Face */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-48 h-48">
                    <div className="absolute inset-0 border border-stone-700 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-4 border border-stone-600 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center">
                          <Activity className="text-white animate-pulse" size={32} />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-[#0a0a0a] border-t border-stone-800 relative z-10">
                 <p className="font-mono text-xs text-stone-500 mb-1">Identity:</p>
                 <DecryptText text="DAYDREAM / MEANING_EXPLORER" className="font-display font-bold text-lg text-white" />
              </div>
           </motion.div>


           {/* Column 2: The Data (Stats) - Col Span 5 */}
           <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Philosophy Module */}
              <div className="bg-signal-yellow text-black p-8 border border-signal-yellow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Crosshair size={64} />
                 </div>
                 <h3 className="font-mono text-xs font-bold uppercase mb-4 tracking-widest border-b border-black pb-2 inline-block">Core Directive</h3>
                 <p className="font-display font-bold text-2xl md:text-3xl leading-tight">
                    "Nothing more than wanting to understand some truths and meet some interesting things."
                 </p>
                 <div className="mt-4 flex items-center gap-2 font-mono text-xs font-bold">
                    <ArrowRight size={14} />
                    <span>WANG XIAOBO</span>
                 </div>
              </div>

              {/* Attributes */}
              <div className="bg-[#111] border border-stone-800 p-8 flex-1">
                 <div className="flex items-center gap-2 mb-6 text-stone-400 font-mono text-xs uppercase">
                    <Shield size={14} />
                    <span>System Parameters</span>
                 </div>
                 
                 <div className="space-y-6">
                    <StatRow label="AESTHETICS" value={92} />
                    <StatRow label="LOGIC" value={65} />
                    <StatRow label="IMAGINATION" value={99} />
                    <StatRow label="SANITY" value={40} />
                 </div>
              </div>
           </div>


           {/* Column 3: The Inventory (Skills) - Col Span 3 */}
           <div className="lg:col-span-3 flex flex-col gap-px bg-stone-800 border border-stone-800">
              <SkillCard title="Cinema" sub="Visuals" index="01" />
              <SkillCard title="Anime" sub="Narrative" index="02" />
              <SkillCard title="Games" sub="Interaction" index="03" />
              <SkillCard title="Code" sub="Structure" index="04" />
           </div>

        </div>
      </div>
    </section>
  );
};

const StatRow: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
     <div className="flex justify-between font-mono text-[10px] text-stone-400">
        <span>{label}</span>
        <span>{value}%</span>
     </div>
     <div className="w-full h-2 bg-stone-900 border border-stone-700">
        <motion.div 
           initial={{ width: 0 }}
           whileInView={{ width: `${value}%` }}
           transition={{ duration: 1.5, ease: "anticipate" }}
           className="h-full bg-white relative"
        >
           <div className="absolute right-0 top-0 bottom-0 w-px bg-signal-yellow shadow-[0_0_10px_#FFD600]"></div>
        </motion.div>
     </div>
  </div>
);

const SkillCard: React.FC<{ title: string; sub: string; index: string }> = ({ title, sub, index }) => (
   <div className="bg-[#080808] p-6 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer group flex-1 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-2 opacity-50 font-mono text-[10px]">
         <span>SYS.{index}</span>
         <Disc size={12} className="animate-spin-slow group-hover:text-black" />
      </div>
      <h4 className="font-display font-bold text-2xl uppercase">{title}</h4>
      <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 group-hover:text-stone-400">{sub}</p>
   </div>
);

export default About;