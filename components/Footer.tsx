import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <section className="h-[80vh] w-full bg-void-black text-stone-400 font-mono flex flex-col justify-between p-6 md:p-12 border-t border-stone-900">
      
      {/* Top Bar */}
      <div className="flex justify-between items-start">
         <div className="flex flex-col gap-2">
            <h2 className="text-white font-display font-bold text-2xl">DAYDREAM.</h2>
            <p className="text-xs uppercase tracking-widest">End of Line</p>
         </div>
         <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
      </div>

      {/* Center Content - Terminal Style */}
      <div className="self-center max-w-2xl w-full">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="border-l-2 border-stone-800 pl-6 py-2"
         >
            <p className="mb-4 text-sm md:text-base">
               <span className="text-red-500 mr-2">root@void:~#</span>
               ./terminate_session.sh
            </p>
            <p className="text-stone-500 mb-8 max-w-md">
               The digital narrative ends here, but the drift continues. 
               Signal is weak, but presence is confirmed.
            </p>
            
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="inline-flex items-center gap-2 text-white hover:text-signal-yellow transition-colors border-b border-stone-700 hover:border-signal-yellow pb-1"
            >
               <span>{PERSONAL_INFO.email}</span>
            </a>
         </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-stone-900 text-[10px] uppercase tracking-widest">
         <div>
            <span className="block text-stone-600 mb-1">Coordinates</span>
            <span className="text-white">Unknown</span>
         </div>
         <div>
            <span className="block text-stone-600 mb-1">Status</span>
            <span className="text-white">Online / Idle</span>
         </div>
         <div>
            <span className="block text-stone-600 mb-1">Version</span>
            <span className="text-white">v.3.0.1 [VOID]</span>
         </div>
         <div className="text-right">
            <span className="block text-stone-600 mb-1">© 2024</span>
            <span className="text-white">All Rights Reserved</span>
         </div>
      </div>
    </section>
  );
};

export default Footer;