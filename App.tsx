
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import OverviewDashboard from './sections/OverviewDashboard';
import AIInsights from './sections/AIInsights';
import ContentAnalyzer from './sections/ContentAnalyzer';
import CompetitorIntel from './sections/CompetitorIntel';
import TitleLab from './sections/TitleLab';
import TrendForecast from './sections/TrendForecast';
import NeuralSimulator from './sections/NeuralSimulator';
import Settings from './sections/Settings';
import GrowthHub from './sections/GrowthHub';
import Pricing from './sections/Pricing';
import NeuralScriptArchitect from './sections/NeuralScriptArchitect';
import AgencyRollup from './sections/AgencyRollup';
import ThumbnailForge from './sections/ThumbnailForge';
import VoiceArchitect from './sections/VoiceArchitect';
import GrowthOracle from './sections/GrowthOracle';
import BRollArchitect from './sections/BRollArchitect';
import PersonaArchitect from './sections/PersonaArchitect';
import PatternLab from './sections/PatternLab';
import GlassCard from './components/ui/GlassCard';
import { Sparkles, Youtube, AlertCircle, Zap } from 'lucide-react';
import { youtube, YouTubeProfile, YoutubeService } from './services/youtubeService';
import { analytics } from './services/analyticsService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isAuth, setIsAuth] = useState(false);
  const [channelData, setChannelData] = useState<YouTubeProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analytics.track('auth_event', 'app_session_start');
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleYoutubeLogin = () => {
    const CLIENT_ID = '544092949681-j6cbgckuh3q7bnrfndr65b7i6bgc3222.apps.googleusercontent.com';
    analytics.track('button_click', 'auth_initiate_youtube');
    
    if (!(window as any).google) {
      setError("Google Identity Services script not loaded. Please check your internet connection.");
      analytics.track('auth_event', 'auth_fail_script_missing');
      return;
    }

    YoutubeService.login(CLIENT_ID, async (token) => {
      try {
        youtube.setToken(token);
        const profile = await youtube.fetchMyChannel();
        setChannelData(profile);
        setIsAuth(true);
        setError(null);
        analytics.track('auth_event', 'auth_success_youtube', { channelId: profile.id });
      } catch (err: any) {
        console.error("YouTube Auth Error:", err);
        setError(err.message || "Failed to connect to YouTube. Please check your credentials.");
        analytics.track('auth_event', 'auth_fail_api_error', { error: err.message });
      }
    });
  };

  const handleDemoMode = async () => {
    try {
      youtube.setToken(""); // Explicitly empty for mock logic
      const profile = await youtube.fetchMyChannel();
      setChannelData(profile);
      setIsAuth(true);
      setError(null);
      analytics.track('button_click', 'enter_demo_mode');
    } catch (e) {
      setIsAuth(true);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    analytics.track('button_click', 'toggle_theme', { theme: newTheme });
  };

  const renderContent = () => {
    const publicTabs = ['lab', 'trends', 'sim', 'settings', 'growth', 'pricing', 'script', 'agency', 'forge', 'voice', 'oracle', 'broll', 'personas', 'patterns'];
    
    if (!isAuth && !publicTabs.includes(activeTab)) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 min-h-[80vh]">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative w-32 h-32 bg-slate-900 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl">
               <Youtube size={64} className="text-red-500 fill-red-500/20" />
            </div>
          </div>
          
          <div className="max-w-xl space-y-4">
            <h2 className="text-4xl font-black dark:text-white tracking-tighter sm:text-5xl">
              Connect Your <span className="text-primary italic">Audience.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Experience the power of enterprise analytics. Link your YouTube channel to unlock real-time subscriber tracking, AI performance modeling, and competitor gap analysis.
            </p>
          </div>
          
          {error && (
            <div className="px-6 py-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-sm flex items-center gap-3 max-w-md animate-in slide-in-from-top-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleYoutubeLogin}
              className="px-10 py-4 bg-primary rounded-2xl text-white font-bold hover:bg-primary-dark transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 text-lg"
            >
              <Youtube size={24} />
              Connect YouTube Studio
            </button>
            <button 
              onClick={handleDemoMode}
              className="px-10 py-4 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-white/10 transition-all text-lg"
            >
              Explore Demo Mode
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            GDPR Compliant & Secure OAuth Flow
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview': return <OverviewDashboard channel={channelData} />;
      case 'insights': return <AIInsights channel={channelData} />;
      case 'content': return <ContentAnalyzer isAuth={isAuth} />;
      case 'competitors': return <CompetitorIntel />;
      case 'lab': return <TitleLab isAuth={isAuth} />;
      case 'trends': return <TrendForecast />;
      case 'sim': return <NeuralSimulator />;
      case 'settings': return <Settings />;
      case 'growth': return <GrowthHub channel={channelData} />;
      case 'pricing': return <Pricing />;
      case 'script': return <NeuralScriptArchitect />;
      case 'agency': return <AgencyRollup />;
      case 'forge': return <ThumbnailForge />;
      case 'voice': return <VoiceArchitect />;
      case 'oracle': return <GrowthOracle />;
      case 'broll': return <BRollArchitect />;
      case 'personas': return <PersonaArchitect />;
      case 'patterns': return <PatternLab />;
      default: return <OverviewDashboard channel={channelData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent text-slate-900 dark:text-slate-200 selection:bg-primary/30 relative">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onConnect={handleYoutubeLogin} isAuth={isAuth} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header theme={theme} onThemeToggle={toggleTheme} user={channelData} />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6">
            {renderContent()}
          </div>
        </div>

        {/* AI Floater */}
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none sm:pointer-events-auto">
           <GlassCard 
              className="py-3 px-6 border-primary/30 bg-primary/10 shadow-primary/20 shadow-2xl flex items-center gap-3 backdrop-blur-2xl border-2 cursor-pointer hover:scale-105 transition-transform" 
              variant="interactive"
              onClick={() => {
                setActiveTab('growth');
                analytics.track('button_click', 'floater_ai_strategy');
              }}
            >
              <div className="p-1.5 bg-primary rounded-lg shadow-lg">
                <Sparkles size={16} className="text-white fill-white/20" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">
                  Growth Engine
                </p>
                <p className="text-[11px] font-bold dark:text-white/80 mt-1">Ready for optimization</p>
              </div>
           </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default App;
