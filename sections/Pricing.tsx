
import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Check, Zap, Crown, Rocket, Star, ShieldCheck, Flame, Infinity } from 'lucide-react';
import { analytics } from '../services/analyticsService';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      desc: 'Essential tools for rising creators.',
      features: [
        '3 AI Title Suggestions/day',
        'Basic Real-time Analytics',
        'Global Trend Radar (Delay 24h)',
        'Standard SEO Tag Scanner',
        '1 Linked Channel'
      ],
      cta: 'Start for Free',
      icon: Rocket,
      color: 'slate',
      popular: false
    },
    {
      name: 'Premium',
      price: '₹1,299',
      period: 'per month',
      desc: 'Professional growth suite for serious results.',
      features: [
        'Unlimited AI Viral Titles',
        'Quantum Trend Prediction',
        'Neural Script Architect',
        'Neural CTR Simulator',
        'Competitor Gap Matrix',
        '5 Linked Channels',
        'AI Script Hook Strategist',
        'Priority Support'
      ],
      cta: 'Go Premium',
      icon: Star,
      color: 'primary',
      popular: true
    },
    {
      name: 'Premium Pro',
      price: '₹3,499',
      period: 'per month',
      desc: 'Enterprise-grade intelligence for agencies.',
      features: [
        'Everything in Premium',
        'Global Agency Rollup Dashboard',
        'Multi-channel Performance Rollups',
        'API Access for Custom Tools',
        'Dedicated Growth Consultant',
        'Market Sentiment Forecasting',
        'Unlimited Channels'
      ],
      cta: 'Enter Pro Elite',
      icon: Crown,
      color: 'orange',
      popular: false
    }
  ];

  const handleSubscribe = (plan: string) => {
    analytics.track('button_click', 'initiate_subscription', { plan });
  };

  return (
    <div className="py-10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-6xl font-black dark:text-white tracking-tighter">
          Master the <span className="text-primary italic underline decoration-primary/30 underline-offset-8">Algorithm.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">
          Scale your creator business with the world's most advanced neural intelligence. Better data. Higher growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <GlassCard 
            key={i} 
            variant={plan.popular ? 'elevated' : 'default'} 
            className={`relative flex flex-col p-10 border-2 transition-all duration-500 group overflow-visible ${plan.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] px-8 py-2.5 rounded-full shadow-2xl shadow-primary/40 flex items-center gap-2">
                <Flame size={14} className="animate-pulse" />
                Creator Choice
              </div>
            )}

            <div className="flex justify-between items-start mb-8">
              <div>
                <div className={`p-4 rounded-2xl mb-6 inline-block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${plan.color === 'primary' ? 'bg-primary text-white shadow-xl shadow-primary/20' : plan.color === 'orange' ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                  <plan.icon size={28} />
                </div>
                <h3 className="text-3xl font-black dark:text-white tracking-tight">{plan.name}</h3>
                <p className="text-slate-500 text-sm mt-2 font-medium max-w-[200px] leading-snug">{plan.desc}</p>
              </div>
            </div>

            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-6xl font-black dark:text-white tracking-tighter">{plan.price}</span>
              <span className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em]">{plan.period}</span>
            </div>

            <div className="space-y-5 mb-12 flex-1">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-4">
                  <div className={`shrink-0 mt-0.5 p-1 rounded-full ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <span className="text-sm dark:text-slate-300 font-bold">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                plan.popular 
                  ? 'bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-[1.03] active:scale-[0.98]' 
                  : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
              }`}
            >
              {plan.cta}
            </button>
          </GlassCard>
        ))}
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="bg-emerald-500/5 border-emerald-500/10 flex items-center gap-6 p-8">
          <div className="p-4 bg-emerald-500 rounded-3xl text-white shadow-xl shadow-emerald-500/20">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h4 className="font-bold dark:text-white mb-1">Growth Guarantee</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try Premium for 14 days. If your views don't trend upward, we'll refund 100%. No questions.
            </p>
          </div>
        </GlassCard>
        <GlassCard className="bg-indigo-500/5 border-indigo-500/10 flex items-center gap-6 p-8">
          <div className="p-4 bg-indigo-500 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
            <Infinity size={32} />
          </div>
          <div>
            <h4 className="font-bold dark:text-white mb-1">Scale Without Limits</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Agency Pro includes unlimited content analysis and dedicated human strategists.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Pricing;
