
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Settings as SettingsIcon, 
  ExternalLink, 
  Shield, 
  Cloud, 
  Key, 
  Copy, 
  Check, 
  Globe, 
  Terminal,
  Database,
  Lock,
  Zap,
  Youtube,
  AlertCircle
} from 'lucide-react';
import { analytics } from '../services/analyticsService';

const Settings: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const currentOrigin = window.location.origin;
  
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    analytics.track('button_click', 'copy_infrastructure_uri', { field });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const infraLinks = [
    {
      name: 'Google Cloud Console',
      desc: 'Manage OAuth 2.0 Credentials & YouTube API Quotas',
      url: 'https://console.cloud.google.com/apis/credentials',
      icon: Shield,
      color: 'text-blue-500'
    },
    {
      name: 'Firebase Console',
      desc: 'Manage Hosting, Auth, and Real-time Databases',
      url: 'https://console.firebase.google.com/',
      icon: Database,
      color: 'text-amber-500'
    },
    {
      name: 'YouTube Studio',
      desc: 'Direct access to your channel management',
      url: 'https://studio.youtube.com/',
      icon: Youtube,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
              <SettingsIcon size={32} className="text-primary" />
            </div>
            System Configuration
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage your cloud infrastructure, API keys, and enterprise security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cloud Infrastructure Card */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard variant="elevated">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <Cloud size={20} />
              </div>
              <h3 className="font-black text-xl dark:text-white tracking-tight">Cloud Infrastructure</h3>
            </div>

            <div className="space-y-4">
              {infraLinks.map((link, i) => (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] group hover:border-primary/40 hover:bg-white dark:hover:bg-slate-900 transition-all"
                  onClick={() => analytics.track('button_click', 'external_infra_link', { name: link.name })}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ${link.color} shadow-sm group-hover:shadow-lg transition-all`}>
                      <link.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white group-hover:text-primary transition-colors">{link.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{link.desc}</p>
                    </div>
                  </div>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-primary/5 border-primary/20">
             <div className="flex gap-4">
                <AlertCircle size={24} className="text-primary shrink-0" />
                <div className="space-y-2">
                   <p className="text-sm font-bold dark:text-white">Security Recommendation</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Ensure your API keys are restricted to the specific referrers shown in the <b>OAuth Configuration</b> section. For production environments, disable all unused APIs in the Google Cloud Library to prevent quota abuse.
                   </p>
                </div>
             </div>
          </GlassCard>
        </div>

        {/* OAuth Setup Info */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard variant="elevated" className="border-2 border-primary/10 overflow-visible">
            <div className="absolute -top-3 -right-3 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-primary/20">
               Project Setup
            </div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                <Terminal size={20} />
              </div>
              <h3 className="font-black text-lg dark:text-white tracking-tight">OAuth Configuration</h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-medium">
               Copy these values into your <span className="text-primary font-bold">Google Cloud Console</span> "Authorized JavaScript Origins" and "Authorized Redirect URIs".
            </p>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">JavaScript Origin</label>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-md">Live Environment</span>
                </div>
                <div className="relative group">
                  <div className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono dark:text-slate-300 pr-12">
                    {currentOrigin}
                  </div>
                  <button 
                    onClick={() => handleCopy(currentOrigin, 'origin')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary transition-all"
                  >
                    {copiedField === 'origin' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Redirect URI</label>
                <div className="relative group">
                  <div className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono dark:text-slate-300 pr-12">
                    {currentOrigin}
                  </div>
                  <button 
                    onClick={() => handleCopy(currentOrigin, 'redirect')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary transition-all"
                  >
                    {copiedField === 'redirect' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OAuth Client ID Status: <span className="text-emerald-500">Active</span></p>
               </div>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center justify-between p-4" variant="interactive">
             <div className="flex items-center gap-3">
                <Key size={18} className="text-primary" />
                <span className="text-xs font-bold dark:text-white">Gemini API Key</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />)}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase">Encrypted</span>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;
