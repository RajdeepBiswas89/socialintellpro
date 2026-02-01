
import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import MetricCard from '../components/data-viz/MetricCard';
import { 
  Building2, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Globe, 
  ArrowUpRight, 
  Zap, 
  CheckCircle2,
  Crown,
  LayoutGrid
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const AgencyRollup: React.FC = () => {
  const agencyStats = [
    { name: 'Creator A', views: 4.2, engagement: 8.4, color: '#6366f1' },
    { name: 'Creator B', views: 2.8, engagement: 6.2, color: '#10b981' },
    { name: 'Creator C', views: 1.5, engagement: 12.1, color: '#f59e0b' },
    { name: 'Creator D', views: 5.1, engagement: 4.8, color: '#ec4899' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
              <Crown size={12} /> Premium Pro Access
            </span>
          </div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-xl shadow-amber-500/20">
              <Building2 size={32} className="text-white" />
            </div>
            Global Agency Rollup
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Unified intelligence across all managed creator entities.</p>
        </div>
        
        <button className="px-6 py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center gap-3 hover:border-primary transition-all">
          <LayoutGrid size={20} className="text-primary" />
          Entity Management
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard label="Unified Views" value="13.6M" trend={+24.2} data={[10, 11, 12, 13.6]} color="#6366f1" />
        <MetricCard label="Total Portfolio Reach" value="2.8M" trend={+8.1} data={[2.5, 2.6, 2.7, 2.8]} color="#10b981" />
        <MetricCard label="Avg Portfolio Retention" value="58.4%" trend={-2.4} data={[60, 59, 58, 58.4]} color="#f59e0b" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-8 h-[450px]" variant="default">
           <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="font-black text-xl dark:text-white tracking-tight">Entity Performance Matrix</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Cross-entity view comparisons (Millions).</p>
              </div>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Q3 Performance</span>
              </div>
           </div>

           <div className="flex-1 w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={agencyStats}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                      contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}}
                    />
                    <Bar dataKey="views" radius={[8, 8, 0, 0]}>
                       {agencyStats.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </GlassCard>

        <div className="lg:col-span-4 space-y-6">
           <GlassCard variant="elevated">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Portfolio Health</h3>
              <div className="space-y-6">
                 {[
                   { label: "Compliance Score", value: 98 },
                   { label: "Quota Efficiency", value: 42 },
                   { label: "Network Growth", value: 88 }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                         <span className="text-slate-500">{stat.label}</span>
                         <span className="dark:text-white">{stat.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: `${stat.value}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </GlassCard>

           <GlassCard className="bg-emerald-500/5 border-emerald-500/20">
              <div className="flex gap-4">
                 <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
                 <div>
                    <p className="text-sm font-bold dark:text-white">Agency Sync Active</p>
                    <p className="text-xs text-slate-500 mt-1">
                       All creator data is currently being rolled up using the <b>Global Graph Engine</b>.
                    </p>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AgencyRollup;
