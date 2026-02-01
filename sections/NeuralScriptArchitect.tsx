
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  FileText, 
  Sparkles, 
  Zap, 
  Brain, 
  Clock, 
  Video, 
  ChevronRight, 
  ArrowRight,
  Target,
  Wand2,
  PlayCircle,
  Copy,
  Check
} from 'lucide-react';
import { getNeuralScriptOutline } from '../services/geminiService';
import { analytics } from '../services/analyticsService';

const NeuralScriptArchitect: React.FC = () => {
  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState('Tech Education');
  const [scriptSteps, setScriptSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateScript = async () => {
    if (!title) return;
    setLoading(true);
    analytics.track('feature_usage', 'neural_script_architect_run', { title });
    const results = await getNeuralScriptOutline(title, niche);
    setScriptSteps(results);
    setLoading(false);
  };

  const handleCopyAll = () => {
    const fullText = scriptSteps.map(s => `[${s.timestamp}] ${s.section}\nBrief: ${s.content_brief}\nVisual: ${s.visual_cue}\nLogic: ${s.retention_logic}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-indigo-500/20">
              <FileText size={32} className="text-white" />
            </div>
            Neural Script Architect
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Engineering viral pacing and psychological retention anchors into every second.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Console */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="elevated" className="border-2 border-indigo-500/10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Brain size={14} className="text-indigo-500" />
              Strategic Parameters
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold dark:text-slate-300">Video Title / Concept</label>
                <textarea 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Why AI will replace developers in 2025..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-4 focus:ring-primary/20 outline-none h-24 resize-none dark:text-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold dark:text-slate-300">Target Niche</label>
                <select 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-4 focus:ring-primary/20 outline-none dark:text-white"
                >
                  <option>Tech & AI</option>
                  <option>Personal Finance</option>
                  <option>Lifestyle & Vlogs</option>
                  <option>Education</option>
                  <option>Business & SaaS</option>
                </select>
              </div>

              <button 
                onClick={generateScript}
                disabled={loading || !title}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                {loading ? <Zap size={24} className="animate-pulse" /> : <Wand2 size={24} />}
                Architect Script
              </button>
            </div>
          </GlassCard>

          <GlassCard className="bg-primary/5 border-primary/20">
             <div className="flex gap-4">
                <Target size={20} className="text-primary shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  This model analyzes <b>retention drops</b> from 12M high-performance videos to ensure your script never hits a "dead zone".
                </p>
             </div>
          </GlassCard>
        </div>

        {/* Script Output Area */}
        <div className="lg:col-span-8">
          {!scriptSteps.length && !loading && (
            <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
               <Video size={64} className="opacity-20 mb-4" />
               <p className="text-xl font-bold dark:text-slate-200">The Scriptboard is Clear</p>
               <p className="text-sm max-w-xs mt-2">Generate a script to see moment-by-moment instructions for your next viral hit.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6">
               {[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse" />)}
            </div>
          )}

          {scriptSteps.length > 0 && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex justify-between items-center px-4">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <PlayCircle size={14} className="text-primary" />
                    Neural Timeline Ready
                  </h3>
                  <button 
                    onClick={handleCopyAll}
                    className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Entire Outline'}
                  </button>
               </div>

               <div className="space-y-4">
                  {scriptSteps.map((step, idx) => (
                    <GlassCard key={idx} variant="interactive" className="group border-l-4 border-l-primary p-6">
                       <div className="flex items-start gap-6">
                          <div className="flex flex-col items-center gap-2">
                             <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono font-bold dark:text-white">
                                {step.timestamp}
                             </div>
                             <div className="h-full w-0.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                          </div>

                          <div className="flex-1 space-y-3">
                             <div className="flex justify-between items-start">
                                <h4 className="text-lg font-black dark:text-white group-hover:text-primary transition-colors">{step.section}</h4>
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                   <Zap size={14} />
                                </div>
                             </div>

                             <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Briefing</p>
                                <p className="text-sm dark:text-slate-300 font-medium leading-relaxed">{step.content_brief}</p>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-start gap-2">
                                   <div className="shrink-0 mt-1 p-1 bg-indigo-500/10 rounded text-indigo-500">
                                      <Brain size={12} />
                                   </div>
                                   <div>
                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Logic</p>
                                      <p className="text-[11px] text-slate-500 leading-snug">{step.retention_logic}</p>
                                   </div>
                                </div>
                                <div className="flex items-start gap-2">
                                   <div className="shrink-0 mt-1 p-1 bg-orange-500/10 rounded text-orange-500">
                                      <Video size={12} />
                                   </div>
                                   <div>
                                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Visual Direction</p>
                                      <p className="text-[11px] text-slate-500 leading-snug">{step.visual_cue}</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </GlassCard>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeuralScriptArchitect;
