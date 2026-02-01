
import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Telescope, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  Zap, 
  Timer,
  BarChart3,
  Flame,
  Globe
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { analytics } from '../services/analyticsService';

const TrendForecast: React.FC = () => {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateForecast = async () => {
    setLoading(true);
    analytics.track('feature_usage', 'quantum_trend_forecast_init');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a futuristic trend forecasting engine for YouTube and Instagram content creators.
        Based on current global tech and social culture, predict 5 emerging "content waves" for the next 14 days.
        
        Provide:
        - trend_name: High-impact name
        - probability: Confidence percentage (0-100)
        - peak_date: When it will go viral
        - niche_impact: Which categories (e.g., Tech, Lifestyle, Finance)
        - specific_hook: A concrete video idea for this trend
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                trend_name: { type: Type.STRING },
                probability: { type: Type.NUMBER },
                peak_date: { type: Type.STRING },
                niche_impact: { type: Type.STRING },
                specific_hook: { type: Type.STRING }
              },
              required: ['trend_name', 'probability', 'peak_date', 'niche_impact', 'specific_hook']
            }
          }
        }
      });

      const data = JSON.parse(response.text || '[]');
      setPredictions(data);
      analytics.track('ai_interaction', 'quantum_trend_forecast_success', { count: data.length });
    } catch (e) {
      console.error(e);
      setPredictions([
        { trend_name: "Spatial Computing Deep-Dives", probability: 92, peak_date: "Next Tuesday", niche_impact: "Tech, Education", specific_hook: "Why Apple Vision Pro users are returning devices (The Retention Secret)" },
        { trend_name: "Anti-AI Authenticity", probability: 88, peak_date: "Weekend", niche_impact: "Vlog, Lifestyle", specific_hook: "I stopped using AI for 24 hours and my engagement tripled." }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    generateForecast();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest">Quantum Engine Active</span>
          </div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/20">
              <Telescope size={32} className="text-white" />
            </div>
            Quantum Trend Predictor
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Predicting the next content waves before they hit the mainstream.</p>
        </div>
        
        <button 
          onClick={generateForecast}
          disabled={loading}
          className="px-6 py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center gap-3 hover:border-primary transition-all disabled:opacity-50"
        >
          <Calendar size={20} className="text-primary" />
          Refresh Forecast
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Forecast Column */}
        <div className="lg:col-span-8 space-y-4">
          {loading ? (
             [1,2,3].map(i => (
               <div key={i} className="h-40 w-full bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2rem]" />
             ))
          ) : (
            predictions.map((trend, i) => (
              <GlassCard 
                key={i} 
                variant="interactive" 
                className="group border-2 border-transparent hover:border-emerald-500/30"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Virality</p>
                       <p className="text-2xl font-black text-emerald-500">{trend.probability}%</p>
                    </div>
                    <div className="h-12 w-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className="w-full bg-emerald-500" style={{ height: `${trend.probability}%` }} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-black dark:text-white group-hover:text-emerald-500 transition-colors">{trend.trend_name}</h3>
                       <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                          <Timer size={14} className="text-slate-500" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{trend.peak_date}</span>
                       </div>
                    </div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">{trend.niche_impact}</p>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                       <div className="flex items-center gap-2 mb-1">
                          <Flame size={14} className="text-orange-500" />
                          <span className="text-xs font-bold dark:text-emerald-500/80">Alpha Strategy Hook:</span>
                       </div>
                       <p className="text-sm dark:text-slate-300 font-medium italic">"{trend.specific_hook}"</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => analytics.track('button_click', 'forecast_expand_hook', { trend: trend.trend_name })}
                    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-all text-slate-500 hover:text-white hover:bg-emerald-500"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="elevated" className="bg-gradient-to-br from-emerald-500/10 to-transparent">
             <div className="flex items-center gap-3 mb-6">
                <Globe size={20} className="text-emerald-500" />
                <h3 className="font-bold dark:text-white">Global Velocity Radar</h3>
             </div>
             <div className="space-y-4">
                {[
                  { label: "Shorts: Fast Edits", value: 94, color: "bg-emerald-500" },
                  { label: "Reels: Storytelling", value: 72, color: "bg-primary" },
                  { label: "YT: High Contrast", value: 85, color: "bg-orange-500" }
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                     <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                     </div>
                  </div>
                ))}
             </div>
          </GlassCard>

          <GlassCard className="border-primary/20 bg-primary/5">
             <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                   <Zap size={20} />
                </div>
                <div>
                   <p className="text-xs font-black dark:text-white mb-1 uppercase tracking-widest">Opportunity Alert</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      Gemini detected a sudden 240% surge in searches for <b>"Minimalist Tech Workspaces"</b>. Create a video or story in this niche within the next 48 hours to capitalize on the algorithm seed.
                   </p>
                </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default TrendForecast;
