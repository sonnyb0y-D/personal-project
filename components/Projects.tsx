import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight, FolderOpen, FileText } from 'lucide-react';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="min-h-screen w-full bg-void-black text-white relative overflow-hidden flex flex-col">
       
       {/* Global Background Image (Changes on Hover) */}
       <div className="fixed inset-0 z-0 pointer-events-none">
         <AnimatePresence mode="wait">
            {hoveredProject ? (
               <motion.div
                 key={hoveredProject}
                 initial={{ opacity: 0, scale: 1.1, filter: "grayscale(100%) contrast(150%)" }}
                 animate={{ opacity: 0.2, scale: 1, filter: "grayscale(100%) contrast(120%)" }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0"
               >
                  <img 
                    src={PROJECTS.find(p => p.id === hoveredProject)?.imageUrl} 
                    alt="bg" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-void-black/50"></div>
               </motion.div>
            ) : (
               <div className="absolute inset-0 bg-void-black"></div>
            )}
         </AnimatePresence>
       </div>

       {/* Content */}
       <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 pt-32 pb-12">
          
          <div className="flex items-center gap-4 mb-16 border-b border-stone-800 pb-4">
             <div className="w-3 h-3 bg-signal-yellow animate-pulse"></div>
             <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">Archive_Access_Mode</h2>
          </div>

          <div className="flex flex-col">
             {PROJECTS.map((project, index) => (
                <ProjectItem 
                   key={project.id} 
                   project={project} 
                   index={index} 
                   setHover={setHoveredProject} 
                />
             ))}
          </div>

       </div>
    </section>
  );
};

const ProjectItem: React.FC<{ project: any; index: number; setHover: (id: string | null) => void }> = ({ project, index, setHover }) => {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ delay: index * 0.1 }}
         onMouseEnter={() => setHover(project.id)}
         onMouseLeave={() => setHover(null)}
         className="group relative border-b border-stone-800 hover:border-white transition-colors duration-300 py-12 cursor-pointer"
      >
         <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
            
            {/* Index & Title */}
            <div className="flex items-baseline gap-8 md:gap-16">
               <span className="font-mono text-xs text-stone-600 group-hover:text-signal-yellow transition-colors">
                  0{index + 1}
               </span>
               <h3 className="font-display font-black text-4xl md:text-7xl uppercase text-stone-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-300 group-hover:glitch-hover">
                  {project.title}
               </h3>
            </div>

            {/* Meta Data */}
            <div className="flex flex-col items-end md:w-1/3">
               <div className="flex gap-2 mb-2">
                  {project.tags.map((tag: string) => (
                     <span key={tag} className="px-2 py-1 border border-stone-800 text-[10px] font-mono uppercase text-stone-500 group-hover:border-white group-hover:text-white transition-colors">
                        {tag}
                     </span>
                  ))}
               </div>
               <p className="font-sans text-sm text-stone-500 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">
                  {project.description}
               </p>
            </div>
         </div>
         
         {/* Hover Icon */}
         <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <ArrowUpRight size={48} className="text-signal-yellow" />
         </div>

      </motion.div>
   );
}

export default Projects;