
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  UserSearch, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Brain, 
  ChevronRight, 
  Zap, 
  Activity,
  Users,
  Search,
  Loader2
} from 'lucide-react';
import { getAudiencePersonas } from '../services/geminiService';
import { analytics } from '../services/analyticsService';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { motion } from 'framer-motion';

const PersonaArchitect: React.FC = () => {
  const [niche, setNiche] = useState('Tech Education');
  const [personas, setPersonas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const architectPersonas = async () => {
    if (!niche) return;
    setLoading(true);
    analytics.track('feature_usage', 'persona_architect_init', { niche });
    const results = await getAudiencePersonas(niche);
    setPersonas(results);
    setLoading(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-primary rounded-2xl shadow-xl shadow-primary/20 text-white">
              <UserSearch size={32} />
            </div>
            Persona Architect
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Deep segmentation and profiling of your target viewer archetypes using Gemini Pro.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Your Niche..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/20 outline-none transition-all dark:text-white"
            />
          </div>
          <button 
            onClick={architectPersonas}
            disabled={loading || !niche}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-black flex items-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            Architect
          </button>
        </div>
      </div>

      {!personas.length && !loading && (
        <div className="py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/10">
           <Users size={64} className="opacity-20 mb-4" />
           <p className="text-xl font-bold dark:text-slate-200">The Lab is Quiet</p>
           <p className="text-sm max-w-xs text-center mt-2">Enter your niche to generate detailed viewer archetypes and psychological triggers.</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[1,2,3].map(i => <div key={i} className="h-96 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] animate-pulse" />)}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {personas.map((persona, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard variant="elevated" className="h-full flex flex-col group hover:border-primary/50">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black dark:text-white tracking-tight">{persona.name}</h3>
                    <p className="text-xs text-primary font-black uppercase tracking-widest mt-1">{persona.age_range} Years</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-xl text-primary font-mono font-black">
                    {persona.authority_score}
                  </div>
               </div>

               <div className="h-48 -mx-6 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: 'Intent', A: persona.authority_score },
                      { subject: 'Trigger', A: 85 },
                      { subject: 'Loyalty', A: 70 },
                      { subject: 'Share', A: 90 },
                      { subject: 'Payoff', A: 65 }
                    ]}>
                      <PolarGrid stroke="#64748b" opacity={0.2} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                      <Radar name="Persona" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>

               <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Zap size={12} className="text-amber-500" /> Triggers
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {persona.content_triggers.map((t: string) => (
                         <span key={t} className="px-2 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-bold dark:text-slate-300">
                           {t}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                     <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Target size={12} /> Capture Strategy
                     </p>
                     <p className="text-xs dark:text-slate-300 font-medium leading-relaxed italic">
                        "{persona.capture_strategy}"
                     </p>
                  </div>
               </div>

               <button className="w-full mt-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                  Load Niche Signals <ChevronRight size={14} />
               </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {personas.length > 0 && (
        <GlassCard className="bg-emerald-500/5 border-emerald-500/20">
           <div className="flex gap-4">
              <Activity size={24} className="text-emerald-500 shrink-0" />
              <div>
                 <p className="text-sm font-bold dark:text-white">Niche Saturation Detected</p>
                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                   High concentration of <b>"Aspiration Seekers"</b> in {niche}. Recommend pivot toward <b>"Utilitarian Guides"</b> to capture the underserved {personas[0]?.age_range} segment.
                 </p>
              </div>
           </div>
        </GlassCard>
      )}
    </div>
  );
};

export default PersonaArchitect;
