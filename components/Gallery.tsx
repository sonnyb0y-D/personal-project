import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GalleryItem } from '../types';

const ITEMS: GalleryItem[] = [
  { id: 1, title: "ETHEREAL", category: "VISUAL", imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1000&auto=format&fit=crop", aspect: "aspect-[3/4]" },
  { id: 2, title: "DISTORTION", category: "AUDIO", imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop", aspect: "aspect-video" },
  { id: 3, title: "PATTERN", category: "CODE", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", aspect: "aspect-square" },
  { id: 4, title: "SILENCE", category: "VOID", imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop", aspect: "aspect-[4/5]" },
  { id: 5, title: "ANALOG", category: "FILM", imageUrl: "https://images.unsplash.com/photo-1595760780346-f972eb49709f?q=80&w=1000&auto=format&fit=crop", aspect: "aspect-video" },
];

const ParallaxImage: React.FC<{ item: GalleryItem; index: number }> = ({ item, index }) => {
  const { scrollYProgress } = useScroll();
  // Varies speed based on index (odd vs even) for disorganized math-rock feel
  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 50]);
  
  return (
    <div className={`relative group ${index === 1 || index === 4 ? 'md:col-span-8' : 'md:col-span-4'} mb-16 md:mb-0`}>
       <motion.div style={{ y }} className="w-full">
         <div className="relative overflow-hidden bg-zinc-900">
           <div className="absolute inset-0 bg-fuchsia-500 mix-blend-color opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10 pointer-events-none"></div>
           <motion.img 
             initial={{ scale: 1.2, filter: 'grayscale(100%)' }}
             whileHover={{ scale: 1, filter: 'grayscale(0%)' }}
             transition={{ duration: 0.6 }}
             src={item.imageUrl} 
             alt={item.title}
             className={`${item.aspect} w-full object-cover cursor-hover`}
           />
         </div>
         
         <div className="flex justify-between items-start mt-2 border-t border-white/20 pt-2">
            <h3 className="font-grotesk text-3xl font-bold uppercase tracking-tighter text-transparent text-stroke-1 group-hover:text-white transition-colors duration-300">
              {item.title}
            </h3>
            <span className="font-mono-display text-[10px] bg-white text-black px-1">
              0{item.id} // {item.category}
            </span>
         </div>
       </motion.div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#030303] relative z-20">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 border-b border-white/10 pb-4">
          <h2 className="font-sans-clean text-xs font-bold tracking-widest uppercase text-zinc-500">
            Selected Works
          </h2>
          <div className="font-mono-display text-xs text-zinc-600">
            [ ARCHIVE_2024-2025 ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-x-12 md:gap-y-32">
          {ITEMS.map((item, index) => (
            <ParallaxImage key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};