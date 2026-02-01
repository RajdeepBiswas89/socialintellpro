
import React, { useEffect, useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Sparkles, 
  BrainCircuit, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2,
  Share2,
  Globe,
  Youtube,
  Instagram
} from 'lucide-react';
import { getAIInsights } from '../services/geminiService';
import { Insight } from '../types';
import { YouTubeProfile } from '../services/youtubeService';

interface AIInsightsProps {
  channel?: YouTubeProfile | null;
}

const AIInsights: React.FC<AIInsightsProps> = ({ channel }) => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    setLoading(true);
    // Enriched mock analytics data including cross-platform signals
    const analyticsData = {
      subs: channel ? parseInt(channel.statistics.subscriberCount) : 124500,
      recentViews: [12000, 15000, 11000, 9000, 22000],
      topNiche: channel?.title || "Tech Education",
      competitorGrowth: "5% faster than you",
      externalSignals: {
        instagramGrowth: "+14%",
        tiktokTrendOverlap: "High (0.82)",
        viralRepurposingScore: 88
      }
    };
    const results = await getAIInsights(analyticsData);
    setInsights(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [channel]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white flex items-center gap-4 tracking-tighter">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
              <BrainCircuit className="text-primary" size={32} />
            </div>
            AI Strategy Lab
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Predictive cross-platform intelligence powered by Gemini Neural Models.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-sm font-black text-white hover:bg-slate-800 hover:border-primary transition-all disabled:opacity-50 shadow-2xl"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Sync Neural Graph
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Insight Feed */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-48 w-full bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2rem]" />
            ))
          ) : (
            insights.map((insight, idx) => (
              <GlassCard key={idx} variant="interactive" className={`group border-l-4 ${
                insight.type === 'cross-platform' ? 'border-l-indigo-500' :
                insight.type === 'growth' ? 'border-l-emerald-500' :
                insight.type === 'alert' ? 'border-l-rose-500' :
                insight.type === 'optimization' ? 'border-l-amber-500' :
                'border-l-primary'
              }`}>
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl shrink-0 shadow-lg ${
                    insight.type === 'cross-platform' ? 'bg-indigo-500/10 text-indigo-500 shadow-indigo-500/5' :
                    insight.type === 'growth' ? 'bg-emerald-500/10 text-emerald-500 shadow-emerald-500/5' :
                    insight.type === 'alert' ? 'bg-rose-500/10 text-rose-500 shadow-rose-500/5' :
                    insight.type === 'optimization' ? 'bg-amber-500/10 text-amber-500 shadow-amber-500/5' :
                    'bg-primary/10 text-primary shadow-primary/5'
                  }`}>
                    {insight.type === 'cross-platform' ? <Share2 size={24} /> :
                     insight.type === 'growth' ? <TrendingUp size={24} /> :
                     insight.type === 'alert' ? <AlertCircle size={24} /> :
                     insight.type === 'optimization' ? <Lightbulb size={24} /> :
                     <Zap size={24} />}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-black text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">{insight.title}</h3>
                          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            insight.priority === 'p1' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' :
                            insight.priority === 'p2' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' :
                            'bg-slate-600 text-white shadow-lg shadow-slate-600/20'
                          }`}>
                            {insight.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category: {insight.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Certainty</p>
                        <p className="text-xl font-mono font-black text-primary">{insight.confidence}%</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">{insight.description}</p>
                    
                    <div className="pt-2 flex items-center gap-4">
                      <button className="px-5 py-2.5 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
                        <Zap size={14} /> Execute Strategy
                      </button>
                      <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest rounded-xl hover:text-primary transition-all">
                        Simulate Outcome
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        {/* AI Stats / Sidebar */}
        <div className="space-y-6">
          <GlassCard variant="elevated" className="border-t-4 border-t-indigo-500">
            <h3 className="font-black text-slate-500 mb-6 text-[10px] uppercase tracking-[0.2em]">Cross-Platform Sync</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                 <div className="flex items-center gap-3">
                    <Youtube size={16} className="text-red-500" />
                    <span className="text-xs font-bold dark:text-white">Repurposing Score</span>
                 </div>
                 <span className="text-sm font-black text-primary">88/100</span>
              </div>
              
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-2 uppercase tracking-widest">
                  <span className="text-slate-400">Instagram Velocity</span>
                  <span className="text-indigo-500">+14.2%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[72%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-2 uppercase tracking-widest">
                  <span className="text-slate-400">Repurposing Efficiency</span>
                  <span className="text-primary">92%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
               <div className="flex items-center gap-2 mb-2">
                 <Globe size={16} className="text-primary" />
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">Global Graph Signal</p>
               </div>
               <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug font-medium italic">High correlation detected between your YT Shorts and trending Reels in the 'Tech' niche.</p>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
               <Sparkles size={64} className="text-primary" />
             </div>
             <div className="flex items-center gap-3 mb-4">
               <Zap className="text-primary" size={20} />
               <h3 className="font-black text-sm uppercase tracking-widest text-slate-500">Repurposing AI</h3>
             </div>
             <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">Let Gemini analyze a specific video URL to generate high-retention cross-platform scripts.</p>
             <div className="relative">
               <input 
                type="text" 
                placeholder="Paste YouTube Link..." 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-xs font-medium focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all"
               />
               <button className="absolute right-2 top-1.5 p-1.5 bg-primary rounded-lg text-white shadow-lg shadow-primary/20">
                 <RefreshCw size={14} />
               </button>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
