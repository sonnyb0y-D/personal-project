
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS, EXPERIENCE } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const HeroModule: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
       <motion.div 
          className="absolute w-[60vw] h-[60vw] rounded-full bg-white blur-[120px] opacity-5 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
       />

       <div className="z-10 text-center mix-blend-difference">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
             <h1 className="font-display font-black text-[15vw] leading-none tracking-tighter text-white select-none">
                DRIFT
             </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex justify-between items-center w-full px-4 mt-6"
          >
             <span className="font-sans text-[10px] tracking-[0.4em] uppercase opacity-70">{"World Line: Null"}</span>
             <span className="font-sans text-[10px] tracking-[0.4em] uppercase opacity-70">{"Seeking Exit"}</span>
          </motion.div>
       </div>

       <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[20%] w-px h-[300px] bg-white opacity-20" />
       <motion.div style={{ y: y1 }} className="absolute bottom-[10%] right-[20%] w-[300px] h-px bg-white opacity-20" />
       
       <div className="absolute bottom-12 text-center w-full">
          <p className="font-sans text-[9px] tracking-[0.8em] uppercase opacity-40 animate-pulse">{"Scroll to Observe"}</p>
       </div>
    </div>
  );
};

export const AboutModule: React.FC = () => {
  return (
    <div className="w-full min-h-screen py-32 px-6 md:px-24 bg-black text-white">
       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="flex flex-col justify-between">
             <div className="space-y-12">
                <div className="inline-block border border-white px-3 py-1 font-sans text-[10px] tracking-[0.3em] uppercase">
                   {"Identity: Observer"}
                </div>
                <h2 className="font-display font-bold text-6xl md:text-8xl leading-[0.85] tracking-tighter">
                   {"WE ARE"} <br/> {"ALL"} <br/> <span className="italic">{"DRIFTING."}</span>
                </h2>
             </div>
             <div className="hidden md:block w-full h-px bg-white/20 mt-12"></div>
          </div>

          <div className="font-sans text-sm md:text-base leading-relaxed space-y-10 text-white/70">
             <p className="border-l border-white/30 pl-6 py-2">
                {"System initialized. Searching for meaning in the static. Our existence is a series of fragments, loosely tied by memory and desire."}
             </p>
             <p>
                {"Design is not a tool for decoration, but a method for navigation. In the void, we use stark lines and deep shadows to find our way."}
             </p>
             
             <div className="pt-12 grid grid-cols-2 gap-12">
                <div className="space-y-4">
                   <h3 className="font-display italic text-2xl border-b border-white/10 pb-2">{"Specs"}</h3>
                   <ul className="space-y-2 font-sans text-[10px] tracking-widest uppercase opacity-60">
                      <li>{"- Creative Direction"}</li>
                      <li>{"- Visual Architecture"}</li>
                      <li>{"- Digital Logic"}</li>
                   </ul>
                </div>
                <div className="space-y-4">
                   <h3 className="font-display italic text-2xl border-b border-white/10 pb-2">{"Status"}</h3>
                   <ul className="space-y-2 font-sans text-[10px] tracking-widest uppercase opacity-60">
                      <li>{"- Online"}</li>
                      <li>{"- Synchronized"}</li>
                      <li>{"- Tokyo Unit"}</li>
                   </ul>
                </div>
             </div>
          </div>
       </div>

       <div className="mt-48 max-w-6xl mx-auto border-t border-white/20">
          {EXPERIENCE.map((exp) => (
             <div key={exp.id} className="border-b border-white/20 py-10 flex flex-col md:flex-row justify-between items-baseline group hover:bg-white hover:text-black transition-all duration-500 px-6">
                <span className="font-sans text-[10px] tracking-widest uppercase opacity-50 group-hover:opacity-100">{exp.period}</span>
                <h3 className="font-display text-4xl md:text-5xl flex-1 md:px-12 group-hover:italic">{exp.company}</h3>
                <span className="font-sans text-[10px] tracking-widest uppercase opacity-50 group-hover:opacity-100">{exp.role}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

const ProjectStrip: React.FC<{ project: any, index: number }> = ({ project, index }) => (
  <div className="w-full border-b border-white/10 group hover:bg-white hover:text-black transition-all duration-700 overflow-hidden relative">
     <div className="max-w-[1600px] mx-auto py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-1 font-display italic text-4xl opacity-30 group-hover:opacity-100">
           {`0${index + 1}`}
        </div>
        <div className="md:col-span-5">
           <h2 className="font-display font-black text-6xl md:text-8xl uppercase mb-6 leading-[0.75] tracking-tighter">
              {project.title}
           </h2>
           <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                 <span key={tag} className="border border-current px-2 py-0.5 font-sans text-[9px] tracking-widest uppercase">
                    {tag}
                 </span>
              ))}
           </div>
        </div>
        <div className="md:col-span-6 flex justify-end">
           <div className="w-full md:w-[450px] aspect-[16/9] bg-white/5 relative overflow-hidden grayscale contrast-150 brightness-75 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-700">
              <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={project.title} />
           </div>
        </div>
     </div>
  </div>
);

export const ProjectsModule: React.FC = () => (
  <div className="w-full bg-black text-white">
     <div className="py-32 px-6 text-center border-b border-white/10">
        <h1 className="font-display font-bold text-5xl uppercase tracking-[0.2em] opacity-80">{"Memory Fragments"}</h1>
     </div>
     <div>
        {PROJECTS.map((project, index) => (
           <ProjectStrip key={project.id} project={project} index={index} />
        ))}
     </div>
  </div>
);

export const FooterModule: React.FC = () => (
  <div className="w-full h-screen flex flex-col justify-between bg-black text-white p-6 md:p-12 border-t border-white/20">
     <div className="flex justify-between items-start">
        <h1 className="font-display font-black text-5xl tracking-tighter">{"DAYDREAM"}</h1>
        <div className="w-12 h-12 border border-white flex items-center justify-center">
           <ArrowUpRight size={20} />
        </div>
     </div>
     <div className="self-center text-center">
        <a href="mailto:hello@daydream.design" className="font-display italic text-[12vw] leading-none hover:line-through transition-all duration-500">
           {"Connect"}
        </a>
     </div>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-sans text-[9px] tracking-[0.4em] uppercase border-t border-white/10 pt-8 opacity-60">
        <div>
           <p className="mb-2">{"Location"}</p>
           <p className="text-white">{"Void / Tokyo"}</p>
        </div>
        <div>
           <p className="mb-2">{"Identity"}</p>
           <div className="flex flex-col gap-1">
              <a href="#" className="text-white hover:underline">{"Instagram"}</a>
              <a href="#" className="text-white hover:underline">{"Twitter"}</a>
           </div>
        </div>
        <div>
           <p className="mb-2">{"System"}</p>
           <p className="text-white">{"v3.0.0_DRIFT"}</p>
        </div>
        <div className="text-right">
           <p className="mb-2">{"Status"}</p>
           <p className="text-white animate-pulse">{"Synchronizing..."}</p>
        </div>
     </div>
  </div>
);
