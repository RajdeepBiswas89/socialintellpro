
import React, { useState, useEffect } from 'react';
import GlassCard from '../ui/GlassCard';
import { 
  Search, 
  Tag, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight,
  TrendingUp,
  Loader2,
  FileText
} from 'lucide-react';
import { getVideoSEOAnalysis } from '../../services/geminiService';
import { analytics } from '../../services/analyticsService';

interface VideoSEOOptimizerProps {
  videoTitle: string;
}

const VideoSEOOptimizer: React.FC<VideoSEOOptimizerProps> = ({ videoTitle }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      analytics.track('feature_usage', 'video_seo_optimizer_load', { title: videoTitle });
      const result = await getVideoSEOAnalysis(videoTitle);
      setData(result);
      setLoading(false);
    };
    fetchAnalysis();
  }, [videoTitle]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    analytics.track('button_click', 'copy_seo_keyword', { keyword: text });
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <Loader2 size={48} className="text-primary animate-spin relative" />
        </div>
        <div className="text-center">
          <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Analyzing SEO Signals</p>
          <p className="text-xs text-slate-400 mt-2">Crawling competitive landscape and keyword volume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Score & Description */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="elevated" className="flex flex-col items-center text-center py-10">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Optimization Score</p>
            <div className="relative w-40 h-40 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                  <circle 
                    cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" 
                    strokeDasharray="439.8" 
                    strokeDashoffset={439.8 * (1 - data.optimization_score / 100)} 
                    className="text-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out" 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black dark:text-white tracking-tighter">{data.optimization_score}%</span>
               </div>
            </div>
            <div className="mt-8 space-y-2">
               <div className={`flex items-center gap-2 text-xs font-bold ${data.optimization_score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {data.optimization_score > 80 ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {data.optimization_score > 80 ? 'Excellent Optimization' : 'Room for Improvement'}
               </div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                 Competitiveness: <span className="text-primary">{data.niche_competitiveness}</span>
               </p>
            </div>
          </GlassCard>

          <GlassCard variant="default">
             <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">Optimized Hook</h3>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed border-l-2 border-primary/30 pl-4 py-2">
                "{data.description_snippet}"
             </p>
             <button 
              onClick={() => handleCopy(data.description_snippet)}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:border-primary transition-all"
            >
                <Copy size={14} />
                Copy to Clipboard
             </button>
          </GlassCard>
        </div>

        {/* Right Column: Keywords & Tags */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard variant="default">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                     <Sparkles size={18} />
                  </div>
                  <h3 className="font-black text-lg dark:text-white tracking-tight">Keyword Suggestions</h3>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">High Volume / Low Competition</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {data.keyword_suggestions.map((kw: string, i: number) => (
                 <div 
                  key={i} 
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl group hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => handleCopy(kw)}
                >
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary" />
                       <span className="text-sm font-bold dark:text-slate-200">{kw}</span>
                    </div>
                    <button className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all">
                       {copiedKeyword === kw ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                 </div>
               ))}
            </div>
          </GlassCard>

          <GlassCard variant="elevated" className="border-l-4 border-l-primary">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                   <Tag size={20} />
                </div>
                <div>
                   <h4 className="font-bold dark:text-white mb-2">Tag Analysis & Strategy</h4>
                   <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {data.tag_analysis}
                   </p>
                   <div className="mt-6 flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-emerald-500" />
                        <span className="text-xs font-bold dark:text-white">Est. Boost: +14% Impressions</span>
                      </div>
                      <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                        View Full Metadata Report <ArrowRight size={14} />
                      </button>
                   </div>
                </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default VideoSEOOptimizer;
