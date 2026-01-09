
import React, { useEffect, useState, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { HeroModule, AboutModule, ProjectsModule, FooterModule } from './components/Modules';
import ChatBot from './components/ChatBot';

// --- Void Cursor (The Black Hole) ---
const VoidCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
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
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-white rounded-full pointer-events-none z-[9998] blend-difference opacity-50"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

// --- Stark Navigation ---
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '漂流' },
    { path: '/monologue', label: '独白' },
    { path: '/fragments', label: '断片' },
    { path: '/echo', label: '残響' }
  ];

  return (
    <>
      <div className="fixed top-8 left-8 z-50 blend-difference">
         <button onClick={() => navigate('/')} className="group flex flex-col items-start">
            <span className="font-display font-bold text-2xl tracking-tighter leading-none group-hover:italic transition-all">DAYDREAM</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-50">Observer</span>
         </button>
      </div>

      <div className="fixed top-8 right-8 z-50 blend-difference">
         <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="font-sans text-xs tracking-[0.2em] uppercase hover:line-through decoration-white"
         >
            {menuOpen ? 'Close' : 'Menu'}
         </button>
      </div>

      <AnimatePresence>
         {menuOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-white z-[100] flex items-center justify-center text-black"
            >
               <div className="flex flex-col items-center gap-8">
                  {navItems.map((item, i) => (
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

// Fixed: Added optionality to children to resolve "Property 'children' is missing in type '{}' but required in type..." 
// which occurs when children are passed via JSX nesting in strict TypeScript environments.
const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen w-full text-white selection:bg-white selection:text-black overflow-x-hidden relative">
      <VoidCursor />
      <Navigation />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HeroModule /></PageWrapper>} />
          <Route path="/monologue" element={<PageWrapper><AboutModule /></PageWrapper>} />
          <Route path="/fragments" element={<PageWrapper><ProjectsModule /></PageWrapper>} />
          <Route path="/echo" element={<PageWrapper><FooterModule /></PageWrapper>} />
          {/* Default fallback to prevent black screen */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      
      <ChatBot />
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div className="bg-black w-screen h-screen" />}>
        <AppContent />
      </Suspense>
    </HashRouter>
  );
};

export default App;
