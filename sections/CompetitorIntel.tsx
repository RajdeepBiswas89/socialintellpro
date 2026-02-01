
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Trophy, 
  BarChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  ShieldCheck,
  Sword,
  ArrowRight,
  Target,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  ReferenceLine,
  Label
} from 'recharts';

const CompetitorIntel: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const competitors = [
    { name: 'TechGuru', subs: '1.2M', growth: '+12%', engagement: '4.8%', icon: 'TG', color: '#ec4899' },
    { name: 'FutureDev', subs: '850K', growth: '+4%', engagement: '3.2%', icon: 'FD', color: '#10b981' },
    { name: 'CodeMasters', subs: '2.1M', growth: '-2%', engagement: '2.5%', icon: 'CM', color: '#f59e0b' },
  ];

  const marketShare = [
    { name: 'You', value: 35, color: '#6366f1' },
    { name: 'TechGuru', value: 25, color: '#ec4899' },
    { name: 'FutureDev', value: 20, color: '#10b981' },
    { name: 'CodeMasters', value: 20, color: '#f59e0b' },
  ];

  // Data for the Content Gap Matrix
  // x: Your Presence (0-100), y: Competitor Performance (0-100), z: Market Volume (Bubble size)
  const gapMatrixData = [
    { x: 85, y: 40, z: 200, name: 'React Tutorials', status: 'Saturated' },
    { x: 15, y: 92, z: 450, name: 'AI Agents Workflow', status: 'Opportunity' },
    { x: 40, y: 70, z: 300, name: 'Web3 Security', status: 'Competitive' },
    { x: 10, y: 85, z: 150, name: 'Edge Computing', status: 'Opportunity' },
    { x: 70, y: 20, z: 120, name: 'CSS Tricks', status: 'Niche Leader' },
    { x: 5, y: 75, z: 500, name: 'LLM Fine-tuning', status: 'Opportunity' },
    { x: 95, y: 95, z: 800, name: 'JavaScript 101', status: 'Red Ocean' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-sm font-black text-white mb-2">{data.name}</p>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between gap-4">
              Your Presence: <span className="text-white">{data.x}%</span>
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between gap-4">
              Comp. Performance: <span className="text-primary">{data.y}%</span>
            </p>
            <div className={`mt-2 px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block ${
              data.status === 'Opportunity' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-700 text-slate-300'
            }`}>
              {data.status}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white flex items-center gap-4 tracking-tighter">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
              <Sword className="text-primary" size={32} />
            </div>
            Competitive Matrix
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Predictive benchmarking and strategic niche exploration.</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-2xl font-black shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all hover:-translate-y-1">
          <Plus size={20} />
          Add Competitor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Competitor Grid */}
        <div className="lg:col-span-12 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {competitors.map(comp => (
                <GlassCard key={comp.name} variant="interactive" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xl" style={{ color: comp.color }}>
                        {comp.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-lg dark:text-white tracking-tight">{comp.name}</h4>
                        <p className="text-xs text-slate-500 font-bold tracking-widest">{comp.subs} SUBS</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 font-black text-sm ${comp.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {comp.growth.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {comp.growth}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Engagement</p>
                      <p className="font-black dark:text-white">{comp.engagement}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Upload Freq</p>
                      <p className="font-black dark:text-white">4/wk</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
           </div>
        </div>

        {/* Content Gap Strategic Matrix */}
        <GlassCard className="lg:col-span-8 flex flex-col group h-[600px]" variant="default">
           <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="font-black text-xl dark:text-white tracking-tight">Strategic Gap Matrix</h3>
                <p className="text-xs text-slate-500 font-medium">Topic positioning: Your Presence vs. Competitor Performance</p>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Target size={12} /> Find Gold Mines
               </span>
            </div>
           </div>
           
           <div className="flex-1 w-full bg-slate-50/50 dark:bg-slate-900/20 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Presence" 
                    unit="%" 
                    stroke="#64748b" 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false} 
                    domain={[0, 100]}
                  >
                    <Label value="YOUR PRESENCE" offset={-20} position="insideBottom" className="text-[10px] font-black fill-slate-500 tracking-[0.2em]" />
                  </XAxis>
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Performance" 
                    unit="%" 
                    stroke="#64748b" 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false}
                    domain={[0, 100]}
                  >
                    <Label value="COMPETITOR SUCCESS" angle={-90} position="insideLeft" offset={0} className="text-[10px] font-black fill-slate-500 tracking-[0.2em]" />
                  </YAxis>
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                  
                  {/* Strategic Quadrant Lines */}
                  <ReferenceLine x={50} stroke="#475569" strokeDasharray="3 3" />
                  <ReferenceLine y={50} stroke="#475569" strokeDasharray="3 3" />
                  
                  {/* Legend Labels for Quadrants */}
                  <text x="80%" y="15%" textAnchor="middle" className="text-[10px] font-black fill-slate-400 opacity-30 uppercase tracking-widest">Saturated</text>
                  <text x="20%" y="15%" textAnchor="middle" className="text-[10px] font-black fill-emerald-500 opacity-50 uppercase tracking-widest">Gold Mine</text>
                  <text x="20%" y="85%" textAnchor="middle" className="text-[10px] font-black fill-slate-400 opacity-30 uppercase tracking-widest">Niche</text>
                  <text x="80%" y="85%" textAnchor="middle" className="text-[10px] font-black fill-slate-400 opacity-30 uppercase tracking-widest">Authority</text>

                  <Scatter 
                    name="Topics" 
                    data={gapMatrixData} 
                    fill="#6366f1"
                    onClick={(data) => setSelectedTopic(data)}
                  >
                    {gapMatrixData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.status === 'Opportunity' ? '#10b981' : '#6366f1'} 
                        className="cursor-pointer hover:opacity-80 transition-opacity drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
           </div>
        </GlassCard>

        {/* Sidebar: Gap Deep-Dive & Market Share */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="elevated">
            <h3 className="font-black text-slate-500 mb-6 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
               <ShieldCheck size={14} className="text-primary" /> Share of Voice
            </h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {marketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px'}}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-black dark:text-white tracking-tighter">35%</span>
                 <span className="text-[10px] font-black text-slate-500 uppercase">You</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
               {marketShare.map(m => (
                 <div key={m.name} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                   <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{backgroundColor: m.color, color: m.color}} />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black dark:text-white uppercase tracking-tighter">{m.name}</span>
                      <span className="text-[10px] text-slate-500 font-bold">{m.value}%</span>
                   </div>
                 </div>
               ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-emerald-500/5 border-emerald-500/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
               <Sparkles size={64} className="text-emerald-500" />
             </div>
             
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <Zap size={18} />
                </div>
                <h4 className="text-sm font-black dark:text-white uppercase tracking-widest">Opportunity Alert</h4>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">High Value Gap Detected</p>
                   <p className="text-lg font-black dark:text-emerald-500 leading-tight">"LLM Fine-tuning Guide"</p>
                   <p className="text-xs text-slate-500 mt-2 font-medium">Competitor <b>TechGuru</b> has 92% dominance here. You have 0 content. High search volume detected in your niche.</p>
                </div>
                
                <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                   Generate Video Script <ArrowRight size={14} />
                </button>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CompetitorIntel;
