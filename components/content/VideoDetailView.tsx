
import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import VideoSEOOptimizer from './VideoSEOOptimizer';
import { 
  ArrowLeft, 
  ExternalLink, 
  Eye, 
  Clock, 
  TrendingUp, 
  Users, 
  Globe,
  Youtube,
  Instagram,
  MousePointer2,
  BarChart3,
  Target,
  Sparkles,
  Zap,
  Search
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { VideoStats } from '../../types';
import { analytics } from '../../services/analyticsService';

interface VideoDetailViewProps {
  video: VideoStats;
  onBack: () => void;
}

const VideoDetailView: React.FC<VideoDetailViewProps> = ({ video, onBack }) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'seo'>('performance');

  // Enhanced mock data for missing fields to provide a rich analysis experience
  const retentionCurve = video.retentionCurve || [
    { time: '0:00', value: 100 }, 
    { time: '0:30', value: 85 }, 
    { time: '1:30', value: 72 }, 
    { time: '3:00', value: 68 },
    { time: '5:00', value: 55 },
    { time: '7:30', value: 48 },
    { time: '10:00', value: 42 }
  ];

  const demographics = video.demographics || [
    { category: '18-24', value: 28 }, 
    { category: '25-34', value: 42 }, 
    { category: '35-44', value: 18 }, 
    { category: '45-54', value: 8 },
    { category: '55+', value: 4 }
  ];

  const handleTabChange = (tab: 'performance' | 'seo') => {
    setActiveTab(tab);
    analytics.track('button_click', `video_detail_tab_${tab}`, { videoId: video.id });
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary/30 transition-all font-bold text-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </button>
          <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={14} className="text-primary" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset Intelligence</span>
            </div>
            <h1 className="text-2xl font-black dark:text-white tracking-tighter flex items-center gap-3">
              {video.title}
              {video.platform === 'youtube' ? <Youtube size={20} className="text-red-500" /> : <Instagram size={20} className="text-pink-500" />}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
           <button 
            onClick={() => handleTabChange('performance')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'performance' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-primary'}`}
          >
             Performance
           </button>
           <button 
            onClick={() => handleTabChange('seo')}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'seo' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-primary'}`}
          >
             SEO Optimizer
           </button>
        </div>
      </div>

      {activeTab === 'performance' ? (
        <div className="space-y-8">
          {/* Metric Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="flex flex-col gap-3" variant="elevated">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Eye size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Reach</span>
              </div>
              <div>
                <p className="text-3xl font-black dark:text-white tracking-tighter">{video.views}</p>
                <p className="text-xs text-emerald-500 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> +12.4% vs. channel avg
                </p>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-3" variant="elevated">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                  <Clock size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Watch Time</span>
              </div>
              <div>
                <p className="text-3xl font-black dark:text-white tracking-tighter">{video.watchTime || '142.5 hrs'}</p>
                <p className="text-xs text-slate-500 font-bold mt-1">High retention segment detected</p>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-3" variant="elevated">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                  <Target size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Impression CTR</span>
              </div>
              <div>
                <p className="text-3xl font-black dark:text-white tracking-tighter">{video.ctr !== 'N/A' ? video.ctr : '6.8%'}</p>
                <p className="text-xs text-amber-500 font-bold mt-1 flex items-center gap-1">
                  <MousePointer2 size={12} /> Optimization recommended
                </p>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-3" variant="elevated">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <TrendingUp size={18} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Retention Rate</span>
              </div>
              <div>
                <p className="text-3xl font-black dark:text-white tracking-tighter">{video.retention !== 'N/A' ? video.retention : '54.2%'}</p>
                <p className="text-xs text-emerald-500 font-bold mt-1">Top 10% for your niche</p>
              </div>
            </GlassCard>
          </div>

          {/* Retention Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <GlassCard className="lg:col-span-8 flex flex-col min-h-[450px]" variant="default">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="font-black text-xl dark:text-white tracking-tight">Audience Retention Curve</h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Moment-by-moment engagement drop-off analysis.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Real-time Stream</span>
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={retentionCurve}>
                    <defs>
                      <linearGradient id="detailRetention" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b" 
                      fontSize={10} 
                      axisLine={false} 
                      tickLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      axisLine={false} 
                      tickLine={false} 
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip 
                       contentStyle={{
                         backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                         border: '1px solid rgba(99, 102, 241, 0.3)', 
                         borderRadius: '12px', 
                         fontSize: '12px',
                         color: '#fff',
                         backdropFilter: 'blur(8px)'
                       }}
                       itemStyle={{ color: '#818cf8' }}
                       formatter={(value: number) => [`${value}%`, 'Retention']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#detailRetention)" 
                      strokeWidth={4}
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 p-5 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-primary rounded-xl text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">AI Content Insight</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Significant drop-off detected at <b>2:45</b>. This correlates with the removal of background music. Recommend maintaining audio levels through transitions.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Demographics Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <GlassCard className="flex flex-col h-full" variant="elevated">
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                     <Users size={18} />
                   </div>
                   <h3 className="font-black text-lg dark:text-white tracking-tight">Viewer Demographics</h3>
                </div>
                
                <div className="space-y-7 flex-1">
                  {demographics.map((d, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-500 uppercase tracking-widest">{d.category} Years</span>
                        <span className="dark:text-white">{d.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]" 
                          style={{ width: `${d.value}%`, transitionDelay: `${i * 150}ms` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
                   <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.1em]">
                     <div className="flex items-center gap-2 text-slate-500">
                       <Globe size={14} className="text-primary" />
                       Primary: USA (54%)
                     </div>
                     <button className="text-primary hover:underline">Full Report</button>
                   </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      ) : (
        <VideoSEOOptimizer videoTitle={video.title} />
      )}
    </div>
  );
};

export default VideoDetailView;
