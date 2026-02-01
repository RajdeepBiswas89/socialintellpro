
import React, { useState, useRef, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  Zap, 
  Lightbulb, 
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { analytics } from '../services/analyticsService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GrowthOracle: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Greetings, Creator. I am the Growth Oracle. I have analyzed 14 years of platform algorithmic behavior. Ask me anything about scaling your audience or optimizing your strategy.", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    analytics.track('ai_interaction', 'oracle_chat_message', { length: input.length });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are the SocialIntel Growth Oracle, a world-class YouTube and Instagram consultant. You provide deeply analytical, data-driven advice. Use terms like CTR, retention curves, A/B testing, and niche authority. Keep answers concise but high-impact.',
        },
      });

      const response = await chat.sendMessage({ message: input });
      const assistantMsg: Message = { 
        role: 'assistant', 
        content: response.text || "I apologize, the neural link was interrupted. Please re-state your query.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error("Chat Error:", e);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to the Oracle. Please check your network.", timestamp: new Date() }]);
    }
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-primary rounded-2xl shadow-xl shadow-primary/20">
              <Bot size={32} className="text-white" />
            </div>
            Growth Oracle
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Direct conversational intelligence with the platform's neural core.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Chat Area */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden" variant="default">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Neural Session</span>
               </div>
               <button 
                onClick={() => setMessages([messages[0]])}
                className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2"
               >
                  <RefreshCw size={12} /> Reset Timeline
               </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                    msg.role === 'assistant' ? 'bg-primary text-white' : 'bg-slate-900 text-white'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed font-medium ${
                    msg.role === 'assistant' 
                      ? 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none' 
                      : 'bg-primary text-white rounded-tr-none shadow-xl shadow-primary/20'
                  }`}>
                    {msg.content}
                    <div className={`text-[9px] mt-2 font-black uppercase tracking-widest opacity-50 ${msg.role === 'assistant' ? 'text-slate-500' : 'text-white'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-4 animate-pulse">
                   <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <Bot size={20} className="text-slate-400" />
                   </div>
                   <div className="p-5 bg-slate-100 dark:bg-slate-900 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-800">
                      <div className="flex gap-1">
                         <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                         <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                         <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for strategy, hook logic, or niche analysis..."
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-6 pr-16 text-sm focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none dark:text-white transition-all font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto custom-scrollbar">
           <GlassCard variant="elevated" className="bg-primary/5 border-primary/20">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <Lightbulb size={14} /> Knowledge Nodes
              </h3>
              <div className="space-y-3">
                 {[
                    "YouTube Retention Math",
                    "Instagram Reels Virality",
                    "A/B Testing Strategies",
                    "Community Management",
                    "Monetization Scaling"
                 ].map(node => (
                    <button key={node} className="w-full flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary transition-all text-xs font-bold text-slate-600 dark:text-slate-400 group">
                       {node}
                       <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-primary" />
                    </button>
                 ))}
              </div>
           </GlassCard>

           <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                 <ShieldCheck size={20} className="text-emerald-500" />
                 <h4 className="text-sm font-black dark:text-white uppercase tracking-widest">Growth Protocol</h4>
              </div>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                       <span>Strategic Maturity</span>
                       <span>84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[84%]" />
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                       <TrendingUp size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Recent Milestone</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">"Oracle correctly predicted your last Short performance within 4% margin."</p>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default GrowthOracle;
