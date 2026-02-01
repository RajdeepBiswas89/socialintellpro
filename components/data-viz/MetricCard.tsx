
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend: number;
  data: number[];
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  trend, 
  data, 
  color = "#6366f1" 
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const isPositive = trend > 0;
  const isNeutral = trend === 0;

  // Simple number animation effect
  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [value]);

  const chartData = data.map((v, i) => ({ value: v, id: i }));

  return (
    <GlassCard className="flex flex-col h-full" variant="interactive" hoverable>
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
          isPositive ? 'bg-emerald-500/10 text-emerald-500' : 
          isNeutral ? 'bg-slate-500/10 text-slate-500' : 'bg-rose-500/10 text-rose-500'
        }`}>
          {isPositive ? <ArrowUpRight size={14} /> : isNeutral ? <Minus size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-3xl font-bold tracking-tight mb-4">
          {typeof value === 'number' ? animatedValue.toLocaleString() : value}
        </span>
        
        <div className="h-16 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
};

export default MetricCard;
