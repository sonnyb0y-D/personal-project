
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Have you also lost your way?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const modelMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isThinking: true
      }]);

      const stream = await sendMessageToGemini(userMsg.text);
      
      let fullText = '';
      for await (const chunk of stream) {
        // Accessing chunk.text directly (property, not method)
        const text = chunk.text;
        if (text) {
           fullText += text;
           setMessages(prev => prev.map(msg => 
             msg.id === modelMsgId 
               ? { ...msg, text: fullText, isThinking: false } 
               : msg
           ));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Signal lost. The void is silent.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {!isOpen && (
         <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-white text-black flex items-center justify-center border border-white hover:bg-black hover:text-white transition-colors duration-300 mix-blend-difference"
         >
            <MessageSquare size={20} />
         </button>
      )}

      {/* Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="fixed bottom-8 right-8 z-50 w-[320px] md:w-[400px] h-[500px] bg-black border border-white flex flex-col shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
             <div className="p-4 border-b border-white flex justify-between items-center bg-white text-black">
                <span className="font-display italic text-xl">Signal</span>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                   <X size={20} />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2">
                         {msg.role === 'user' ? 'Observer' : 'System'}
                      </span>
                      <div className={`max-w-[90%] font-sans text-xs leading-relaxed p-4 border ${msg.role === 'user' ? 'border-white/40 text-white' : 'bg-white text-black border-white'}`}>
                         {msg.isThinking ? (
                            <span className="animate-pulse">{"Analyzing Signal..."}</span>
                         ) : msg.text}
                      </div>
                   </div>
                ))}
                <div ref={messagesEndRef} />
             </div>

             <div className="p-4 border-t border-white/20 flex items-center gap-3 bg-white/5">
                <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={handleKeyPress}
                   className="flex-1 bg-transparent border-none outline-none text-xs font-sans text-white placeholder:text-white/20"
                   placeholder="Type to transmit..."
                   autoFocus
                />
                <button onClick={handleSend} disabled={isLoading || !input.trim()} className="text-white hover:opacity-50 transition-opacity">
                   <Send size={16} />
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
