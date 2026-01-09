
import React, { useEffect, useState } from 'react';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { HeroModule, AboutModule, ProjectsModule, FooterModule } from './components/Modules';
import ChatBot from './components/ChatBot';

// --- Void Cursor (The Black Hole) ---
const VoidCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }; // Snappy, not floaty
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {/* The Negative Point */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      {/* The Event Horizon */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9998] blend-difference opacity-50"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        transition={{ type: "spring", damping: 40, stiffness: 200 }}
      />
    </>
  );
};

// --- Stark Navigation ---
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Left: Identity */}
      <div className="fixed top-8 left-8 z-50 blend-difference">
         <button onClick={() => navigate('/')} className="group flex flex-col items-start">
            <span className="font-display font-bold text-2xl tracking-tighter leading-none group-hover:italic transition-all">DAYDREAM</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100">Observer</span>
         </button>
      </div>

      {/* Top Right: Menu Trigger */}
      <div className="fixed top-8 right-8 z-50 blend-difference">
         <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="font-sans text-xs tracking-[0.2em] uppercase hover:line-through decoration-white transition-all"
         >
            {menuOpen ? 'Close' : 'Menu'}
         </button>
      </div>

      {/* Bottom Right: Coordinates */}
      <div className="fixed bottom-8 right-8 z-50 blend-difference text-right hidden md:block">
         <span className="font-sans text-[10px] tracking-widest block">
             WORLD_LINE: 0.000000
         </span>
         <span className="font-display text-xl italic">
            {location.pathname === '/' ? 'The Beginning' : location.pathname.replace('/', '')}
         </span>
      </div>

      {/* Full Screen Void Menu */}
      <AnimatePresence>
         {menuOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="fixed inset-0 bg-white z-[100] flex items-center justify-center text-black"
            >
               <div className="flex flex-col items-center gap-8">
                  {[
                     { path: '/', label: '漂流' }, // Drift
                     { path: '/monologue', label: '独白' }, // Monologue
                     { path: '/fragments', label: '断片' }, // Fragments
                     { path: '/echo', label: '残響' } // Echo
                  ].map((item, i) => (
                     <motion.button
                        key={item.path}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => { navigate(item.path); setMenuOpen(false); }}
                        className="font-display font-black text-6xl md:text-8xl hover:italic transition-all duration-300"
                     >
                        {item.label}
                     </motion.button>
                  ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
};

const Content = () => {
  const location = useLocation();

  return (
    <div className="bg-void min-h-screen w-full text-flash selection:bg-white selection:text-black overflow-hidden relative">
         <VoidCursor />
         <Navigation />
         
         <AnimatePresence mode="wait">
            <motion.div
               key={location.pathname}
               initial={{ opacity: 0, filter: "blur(20px)" }}
               animate={{ opacity: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, filter: "blur(20px)" }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="w-full min-h-screen"
            >
               {location.pathname === '/' && <HeroModule />}
               {location.pathname === '/monologue' && <AboutModule />}
               {location.pathname === '/fragments' && <ProjectsModule />}
               {location.pathname === '/echo' && <FooterModule />}
            </motion.div>
         </AnimatePresence>
         
         <ChatBot />
    </div>
  );
}

const App = () => {
  return (
    <HashRouter>
      <Content />
    </HashRouter>
  );
};

export default App;
