
import React from 'react';
import MetricCard from '../components/data-viz/MetricCard';
import GlassCard from '../components/ui/GlassCard';
import { 
  Users, 
  TrendingUp, 
  Youtube,
  Sparkles,
  Eye,
  DollarSign,
  Clock,
  Video,
  Globe,
  Zap
} from 'lucide-react';
import { YouTubeProfile } from '../services/youtubeService';

interface OverviewDashboardProps {
  channel?: YouTubeProfile | null;
}

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ channel }) => {
  const subs = channel ? parseInt(channel.statistics.subscriberCount) : 124500;
  const views = channel ? parseInt(channel.statistics.viewCount) : 2480000;
  const videoCount = channel ? parseInt(channel.statistics.videoCount) : 142;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Welcome Hero */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="relative">
             {channel?.thumbnails?.high ? (
               <img src={channel.thumbnails.high.url} className="w-24 h-24 rounded-[2rem] border-4 border-primary/20 shadow-2xl relative z-10 object-cover" alt="Avatar" />
             ) : (
               <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-2xl relative z-10">
                 <Youtube size={48} />
               </div>
             )}
             <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-slate-900 z-20">
               <Zap size={16} className="fill-current" />
             </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em]">Verified Hub</span>
              <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{channel?.id || "N/A"}</span>
            </div>
            <h1 className="text-4xl font-black dark:text-white tracking-tighter">
              {channel?.title || "Studio"} Intelligence 
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Monitoring {videoCount} assets across the global graph.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl shadow-primary/30 hover:bg-primary-dark hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3">
            <Sparkles size={20} />
            Generate Strategy
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          label="Total Subscribers" 
          value={subs} 
          trend={+4.2} 
          data={[120, 121, 122, 123, 124, 124.5]}
          color="#6366f1"
        />
        <MetricCard 
          label="Impressions (30D)" 
          value={views} 
          trend={+12.8} 
          data={[2.1, 2.2, 2.3, 2.4, 2.48]}
          color="#ec4899"
        />
        <MetricCard 
          label="Engagement Ratio" 
          value="8.4%" 
          trend={+1.2} 
          data={[8.0, 8.1, 8.3, 8.4]}
          color="#10b981"
        />
        <MetricCard 
          label="Growth Score" 
          value="92" 
          trend={0} 
          data={[90, 91, 92, 92]}
          color="#f59e0b"
        />
      </div>

      {/* Analytics Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-8 h-[500px] flex flex-col group" variant="default">
           <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <Globe size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl dark:text-white">Global Velocity</h3>
                <p className="text-xs text-slate-500 font-medium">Cross-platform impression velocity.</p>
              </div>
            </div>
            <div className="flex gap-2">
               {['Views', 'Subs', 'Watch Time'].map(v => (
                 <button key={v} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-primary transition-all">{v}</button>
               ))}
            </div>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/10 group-hover:border-primary/20 transition-colors">
              <div className="text-center space-y-4 max-w-sm">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
                  <TrendingUp size={64} className="relative mx-auto text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-lg font-bold dark:text-slate-300">Synchronizing Global Graph...</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">We're fetching deep time-series data from YouTube Analytics. This may take up to 30 seconds for enterprise accounts.</p>
                </div>
              </div>
           </div>
        </GlassCard>

        <GlassCard className="lg:col-span-4 flex flex-col" variant="elevated">
          <div className="flex items-center gap-3 mb-10">
             <div className="p-2 bg-emerald-500/10 rounded-xl">
               <TrendingUp size={18} className="text-emerald-500" />
             </div>
             <h3 className="font-bold text-lg dark:text-white">Channel Efficiency</h3>
          </div>

          <div className="flex flex-col items-center justify-center py-6 flex-1">
             <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="16" className="text-slate-200 dark:text-slate-800" />
                   <circle cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="16" strokeDasharray="502" strokeDashoffset="100" className="text-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-5xl font-black dark:text-white tracking-tighter">82%</span>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Health</span>
                </div>
             </div>
             
             <div className="mt-12 space-y-6 w-full">
                <div className="space-y-2">
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">Consistency</span>
                      <span className="text-emerald-500">Peak (98%)</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">SEO Score</span>
                      <span className="text-amber-500">Avg (64%)</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[64%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
                   </div>
                </div>
             </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default OverviewDashboard;
