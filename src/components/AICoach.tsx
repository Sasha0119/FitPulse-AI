import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Stars, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export function AICoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages
        })
      });

      const data = await response.json();
      const assistantMessage: Message = { 
        role: 'model', 
        parts: [{ text: data.text }] 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-[60] transition-all duration-300",
          isOpen ? "bg-accent rotate-45" : "bg-brand text-bg hover:scale-110"
        )}
      >
        <Bot size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-96 h-[600px] bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col z-[60]"
          >
            {/* Header */}
            <div className="p-5 bg-white/5 border-bottom border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 text-brand rounded-lg">
                  <Stars size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold">FitPulse Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="p-4 bg-brand/5 rounded-full mb-4">
                    <Bot size={32} className="text-brand/50" />
                  </div>
                  <h4 className="font-display font-medium mb-2">How can I help you today?</h4>
                  <p className="text-sm text-white/40">Ask me for a customized workout plan, nutritional advice, or health tips.</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                    msg.role === 'user' ? "bg-accent/10 text-accent" : "bg-brand/10 text-brand"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm prose prose-invert",
                    msg.role === 'user' ? "bg-accent/10 rounded-tr-none" : "bg-white/5 rounded-tl-none border border-white/5"
                  )}>
                    <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-border">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your coach..."
                  className="w-full bg-bg border border-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand/40 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand hover:bg-brand/10 rounded-lg transition-colors disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
