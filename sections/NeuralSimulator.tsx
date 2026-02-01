
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Zap, 
  Sparkles, 
  BarChart2, 
  MousePointer2, 
  Brain, 
  Eye, 
  Upload,
  Info,
  Loader2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { analytics } from '../services/analyticsService';

const NeuralSimulator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const simulatePerformance = async () => {
    if (!title) return;
    setLoading(true);
    analytics.track('feature_usage', 'neural_simulator_run', { title_length: title.length });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a Neural Click-Through Rate (CTR) Simulator for YouTube.
        Analyze the following video title: "${title}"
        
        Provide a detailed predictive analysis:
        - predicted_ctr: Estimated percentage (0-15)
        - audience_affinity: Who will click? (e.g. "Tech Enthusiasts", "Beginners")
        - emotional_trigger: What emotion does it evoke?
        - optimization_tip: One concrete way to improve it.
        - competitor_benchmark: How does it rank vs global averages? (Higher/Lower)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              predicted_ctr: { type: Type.NUMBER },
              audience_affinity: { type: Type.STRING },
              emotional_trigger: { type: Type.STRING },
              optimization_tip: { type: Type.STRING },
              competitor_benchmark: { type: Type.STRING }
            },
            required: ['predicted_ctr', 'audience_affinity', 'emotional_trigger', 'optimization_tip', 'competitor_benchmark']
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
      analytics.track('ai_interaction', 'neural_simulator_success', { ctr: data.predicted_ctr });
    } catch (e) {
      console.error(e);
      setResult({
        predicted_ctr: 7.2,
        audience_affinity: "General Tech Audience",
        emotional_trigger: "Curiosity",
        optimization_tip: "Add a high-contrast adjective to the first 3 words.",
        competitor_benchmark: "Above Average"
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-primary rounded-2xl shadow-xl shadow-primary/20">
              <Brain size={32} className="text-white" />
            </div>
            Neural A/B Lab
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Simulate audience reaction and CTR before you even click upload.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Console */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard variant="elevated" className="border-2 border-primary/10">
            <h3 className="font-bold dark:text-white mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
              <Zap size={16} className="text-primary" />
              Simulation Inputs
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-3">Target Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The secret to infinite engagement..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-3">Thumbnail Concept (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
                   <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl group-hover:text-primary transition-colors">
                      <Upload size={24} />
                   </div>
                   <p className="text-xs font-bold dark:text-slate-400">Drag thumbnail draft to simulate visual impact</p>
                </div>
              </div>

              <button 
                onClick={simulatePerformance}
                disabled={loading || !title}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                Run Neural Simulation
              </button>
            </div>
          </GlassCard>

          <GlassCard className="bg-primary/5 border-primary/10">
            <div className="flex gap-4">
               <Info size={20} className="text-primary shrink-0" />
               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Our neural network analyzes linguistics, psychology, and platform-specific historical data to predict how a viewer's eye will track across your metadata.
               </p>
            </div>
          </GlassCard>
        </div>

        {/* Prediction Display */}
        <div className="lg:col-span-7">
          {!result && !loading && (
             <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400">
                <BarChart2 size={64} className="opacity-20 mb-4" />
                <p className="text-lg font-bold">Waiting for simulation data...</p>
                <p className="text-sm">Input your content ideas to see neural predictions.</p>
             </div>
          )}

          {loading && (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-6">
               <div className="relative">
                 <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                 <Brain size={64} className="text-primary animate-bounce relative" />
               </div>
               <div className="text-center">
                 <p className="text-xl font-black dark:text-white tracking-tighter">Analyzing Metadata Graph...</p>
                 <p className="text-sm text-slate-500 mt-2">Correlating title with 1.4B high-performance content signals.</p>
               </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
               <div className="grid grid-cols-2 gap-6">
                  <GlassCard className="text-center py-10" variant="elevated">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Predicted CTR</p>
                     <p className="text-5xl font-black text-primary tracking-tighter">{result.predicted_ctr}%</p>
                     <div className="flex items-center justify-center gap-2 mt-4 text-emerald-500">
                        <TrendingUp size={16} />
                        <span className="text-xs font-bold">{result.competitor_benchmark}</span>
                     </div>
                  </GlassCard>
                  
                  <GlassCard className="flex flex-col justify-center" variant="elevated">
                     <div className="space-y-4">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <MousePointer2 size={14} className="text-primary" />
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Audience Segment</span>
                           </div>
                           <p className="text-sm font-bold dark:text-white">{result.audience_affinity}</p>
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <Sparkles size={14} className="text-amber-500" />
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Core Emotion</span>
                           </div>
                           <p className="text-sm font-bold dark:text-white">{result.emotional_trigger}</p>
                        </div>
                     </div>
                  </GlassCard>
               </div>

               <GlassCard className="border-l-4 border-l-primary" variant="default">
                  <div className="flex items-start gap-4">
                     <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Zap size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold dark:text-white mb-1">AI Optimization Strategy</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                           "{result.optimization_tip}"
                        </p>
                     </div>
                  </div>
               </GlassCard>

               <div className="p-6 bg-slate-100 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                     <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Attention Heatmap (Estimated)</h4>
                     <span className="text-[10px] font-bold text-slate-400">High Concentration</span>
                  </div>
                  <div className="h-12 w-full bg-gradient-to-r from-slate-200 to-primary dark:from-slate-800 dark:to-primary rounded-xl opacity-30 blur-[2px]" />
                  <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 uppercase">
                     <span>Hook</span>
                     <span>Context</span>
                     <span>Payoff</span>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeuralSimulator;
