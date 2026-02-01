
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  BrainCircuit, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  Zap, 
  RefreshCw, 
  Layout, 
  Rocket,
  Timer,
  Loader2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { getPatternInterrupts } from '../services/geminiService';
import { analytics } from '../services/analyticsService';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Area, 
  AreaChart 
} from 'recharts';
import { motion } from 'framer-motion';

const PatternLab: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [patterns, setPatterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const analyzePatterns = async () => {
    if (!concept) return;
    setLoading(true);
    analytics.track('feature_usage', 'pattern_lab_init', { conceptLength: concept.length });
    const results = await getPatternInterrupts(concept);
    setPatterns(results);
    setLoading(false);
  };

  const flowData = patterns.length > 0 ? patterns.map((p, i) => ({
    time: p.timestamp,
    impact: p.impact_score,
    attention: 100 - (i * 12) + (p.impact_score / 2)
  })) : [
    { time: '0:00', attention: 100 },
    { time: '1:00', attention: 85 },
    { time: '2:30', attention: 70 },
    { time: '4:00', attention: 60 },
    { time: '6:00', attention: 55 }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-primary rounded-2xl shadow-xl shadow-primary/20 text-white">
              <BrainCircuit size={32} />
            </div>
            Attention Pattern Lab
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Engineer high-retention pacing by disrupting viewer fatigue with neural pattern interrupts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <GlassCard variant="elevated" className="border-2 border-primary/10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Activity size={14} className="text-primary" />
              Neural Breakdown
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold dark:text-slate-300">Video Concept / Script Draft</label>
                <textarea 
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Paste your video outline or specific script segment..."
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-4 focus:ring-primary/20 outline-none h-40 resize-none dark:text-white transition-all font-medium"
                />
              </div>

              <button 
                onClick={analyzePatterns}
                disabled={loading || !concept}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} />}
                Extract Fatuge Points
              </button>
            </div>
          </GlassCard>

          <GlassCard className="bg-primary/5 border-primary/10">
             <div className="flex gap-4">
                <AlertCircle size={20} className="text-primary shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                   Human attention resets every <b>45-90 seconds</b>. If your visual pace is constant, retention will drop linearly. Disrupt the pattern to stay in the feed.
                </p>
             </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-7 space-y-6">
           <GlassCard className="h-64" variant="default">
              <div className="flex justify-between items-center mb-6">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Attention Projection</h4>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                       <span className="text-[9px] font-bold text-slate-500">Attention Flow</span>
                    </div>
                 </div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flowData}>
                    <defs>
                      <linearGradient id="attentionColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                       contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px'}}
                    />
                    <Area type="monotone" dataKey="attention" stroke="#6366f1" fillOpacity={1} fill="url(#attentionColor)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </GlassCard>

           <div className="space-y-4">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse" />)
              ) : (
                patterns.map((p, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <GlassCard variant="interactive" className="p-4 border-l-4 border-l-primary flex items-center gap-6 group">
                       <div className="flex flex-col items-center gap-1 shrink-0">
                          <span className="text-xs font-mono font-black text-primary">{p.timestamp}</span>
                          <Timer size={14} className="text-slate-400" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                             <h4 className="text-sm font-black dark:text-white uppercase tracking-tight">{p.trigger_point}</h4>
                             <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black rounded uppercase">{p.disruption_type}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                             "{p.instruction}"
                          </p>
                       </div>
                       <div className="text-right shrink-0">
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Impact</p>
                          <p className="text-lg font-black text-emerald-500">+{p.impact_score}%</p>
                       </div>
                    </GlassCard>
                  </motion.div>
                ))
              )}
           </div>

           {patterns.length > 0 && (
              <button 
                onClick={analyzePatterns}
                className="w-full py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                 <RefreshCw size={14} /> Regenerate Disruptions
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default PatternLab;
