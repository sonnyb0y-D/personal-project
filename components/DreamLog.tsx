import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDreamText } from '../services/geminiService';

export const DreamLog: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<Array<{type: 'user' | 'bot', text: string}>>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setLogs(prev => [...prev, { type: 'user', text: userText }]);
    setLoading(true);

    const result = await generateDreamText(userText);
    setLogs(prev => [...prev, { type: 'bot', text: result }]);
    setLoading(false);
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-between py-24 px-6 md:px-12 border-t border-white/10 bg-[#050505] relative">
      <div className="absolute top-0 right-12 w-px h-24 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="max-w-4xl w-full mx-auto font-mono-display text-sm md:text-base">
        <div className="mb-12 opacity-50 text-xs tracking-widest uppercase">
          > Connecting to Dream Server... <br/>
          > Status: Online
        </div>

        <div ref={scrollRef} className="h-[40vh] overflow-y-auto mb-8 space-y-6 scrollbar-hide">
           {logs.length === 0 && (
             <div className="text-zinc-600 italic font-serif-display text-xl">
               "Enter a keyword to retrieve a memory..."
             </div>
           )}
           {logs.map((log, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className={`flex ${log.type === 'user' ? 'justify-end' : 'justify-start'}`}
             >
               <div className={`max-w-md p-4 border ${log.type === 'user' ? 'border-zinc-700 bg-zinc-900/50 text-zinc-300' : 'border-fuchsia-500/30 bg-fuchsia-900/10 text-fuchsia-100'} backdrop-blur-md`}>
                 <span className="block text-[10px] opacity-40 mb-2 uppercase tracking-wider">{log.type === 'user' ? 'Input' : 'Response'}</span>
                 {log.text}
               </div>
             </motion.div>
           ))}
           {loading && (
             <div className="flex gap-2 text-fuchsia-500">
               <span className="animate-bounce">.</span>
               <span className="animate-bounce delay-100">.</span>
               <span className="animate-bounce delay-200">.</span>
             </div>
           )}
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="TYPE_HERE"
            className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl md:text-3xl font-grotesk font-bold text-white focus:outline-none focus:border-white transition-colors placeholder:text-zinc-800 cursor-hover uppercase"
            autoFocus
          />
          <button 
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest cursor-hover"
          >
            [ Send Return ]
          </button>
        </form>
      </div>
    </section>
  );
};