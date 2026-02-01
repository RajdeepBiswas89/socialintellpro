
import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Flame, 
  Sparkles, 
  Zap, 
  Search, 
  Compass, 
  MessageSquare, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  ShieldCheck,
  Brain,
  Wand2,
  Loader2
} from 'lucide-react';
import { getViralTopicResearch, getScriptHookStrategist } from '../services/geminiService';
import { analytics } from '../services/analyticsService';

const GrowthHub: React.FC<{ channel?: any }> = ({ channel }) => {
  const [niche, setNiche] = useState(channel?.title || 'Tech & AI');
  const [topics, setTopics] = useState<any[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [hooks, setHooks] = useState<any[]>([]);
  const [loadingHooks, setLoadingHooks] = useState(false);

  const fetchTopics = async () => {
    setLoadingTopics(true);
    analytics.track('feature_usage', 'viral_topic_research', { niche });
    const results = await getViralTopicResearch(niche);
    setTopics(results);
    setLoadingTopics(false);
  };

  const fetchHooks = async (title: string) => {
    setLoadingHooks(true);
    analytics.track('feature_usage', 'hook_strategist', { title });
    const results = await getScriptHookStrategist(title);
    setHooks(results);
    setLoadingHooks(false);
  };

  useEffect(() => {
    if (niche) fetchTopics();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl shadow-xl shadow-orange-500/20">
              <Flame size={32} className="text-white" />
            </div>
            Viral Velocity Engine
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Predicting blue-ocean opportunities in your niche before the competition.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Enter your niche..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button 
            onClick={fetchTopics}
            disabled={loadingTopics}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-black flex items-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            {loadingTopics ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
            Scan Niche
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topic List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Compass size={14} className="text-orange-500" />
              Blue Ocean Topics Detected
            </h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase">Real-time Signals</span>
          </div>

          {loadingTopics ? (
            [1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 dark:bg-slate-900 rounded-3xl animate-pulse" />)
          ) : (
            topics.map((topic, i) => (
              <GlassCard 
                key={i} 
                variant="interactive" 
                className={`group border-2 transition-all ${selectedTopic?.topic_name === topic.topic_name ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                onClick={() => {
                  setSelectedTopic(topic);
                  fetchHooks(topic.suggested_title);
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-black dark:text-white group-hover:text-primary transition-colors">{topic.topic_name}</h4>
                      <div className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-[10px] font-black rounded-md">
                        {topic.viral_coefficient}% POTENTIAL
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      <span className="text-primary font-bold uppercase text-[10px] mr-2">Trigger:</span>
                      {topic.why_now}
                    </p>
                    <div className="flex items-center gap-6 pt-2">
                       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                          <Target size={12} />
                          Gap: {topic.competitor_blindspot}
                       </div>
                    </div>
                  </div>
                  <div className="shrink-0 pt-1">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                       <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        {/* Right Column: AI Scripting & Strategy */}
        <div className="lg:col-span-5 space-y-6">
          {!selectedTopic && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8">
              <Sparkles size={48} className="text-slate-300 dark:text-slate-800 mb-4" />
              <p className="text-lg font-bold dark:text-slate-200">Select a Topic to Start Strategizing</p>
              <p className="text-sm text-slate-500 mt-2">We'll generate viral hooks and visual instructions for your next masterpiece.</p>
            </div>
          )}

          {selectedTopic && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <GlassCard variant="elevated" className="bg-primary/5 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 size={20} className="text-primary" />
                  <h3 className="font-bold dark:text-white">AI Scripting Lab</h3>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Recommended Title</p>
                  <p className="text-lg font-black dark:text-white leading-tight italic">"{selectedTopic.suggested_title}"</p>
                </div>
              </GlassCard>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Psychological Hook Variations</h3>
                {loadingHooks ? (
                  [1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse" />)
                ) : (
                  hooks.map((hook, idx) => (
                    <GlassCard key={idx} className="p-5 border-l-4 border-l-primary group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{hook.archetype}</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                          <Brain size={12} />
                          {hook.psychological_trigger}
                        </div>
                      </div>
                      <p className="text-sm font-medium dark:text-slate-300 leading-relaxed italic mb-4">"{hook.script}"</p>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                           <Target size={12} className="text-primary" />
                           <span className="text-[10px] font-black text-slate-500 uppercase">Visual Setup</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{hook.visual_instruction}</p>
                      </div>
                    </GlassCard>
                  ))
                )}
              </div>

              <GlassCard className="border-emerald-500/20 bg-emerald-500/5">
                <div className="flex gap-4">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <div>
                    <p className="text-xs font-black dark:text-emerald-500 uppercase tracking-widest mb-1">Engagement Secret</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                      {selectedTopic.retention_strategy}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrowthHub;
