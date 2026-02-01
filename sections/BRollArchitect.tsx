
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Clapperboard, 
  Sparkles, 
  Wand2, 
  Monitor, 
  Smartphone, 
  Loader2, 
  Download, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Play
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { analytics } from '../services/analyticsService';
import { motion, AnimatePresence } from 'framer-motion';

const BRollArchitect: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const loadingMessages = [
    "Synthesizing neural frames...",
    "Adjusting cinematic lighting...",
    "Engineering motion vectors...",
    "Finalizing high-fidelity output...",
    "Polishing grain and texture..."
  ];

  const generateBRoll = async () => {
    if (!prompt) return;
    
    setLoading(true);
    setVideoUrl(null);
    analytics.track('feature_usage', 'broll_architect_init', { resolution, aspectRatio });

    try {
      if (!(await (window as any).aistudio.hasSelectedApiKey())) {
        await (window as any).aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let msgIndex = 0;
      const msgInterval = setInterval(() => {
        setProgressMessage(loadingMessages[msgIndex % loadingMessages.length]);
        msgIndex++;
      }, 8000);

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic B-roll: ${prompt}. Professional cinematography, high quality, 4k detail, cinematic lighting.`,
        config: {
          numberOfVideos: 1,
          resolution,
          aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      clearInterval(msgInterval);
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
        analytics.track('feature_usage', 'broll_architect_success');
      }
    } catch (e) {
      console.error("Veo Error:", e);
      analytics.track('feature_usage', 'broll_architect_fail', { error: (e as Error).message });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl shadow-xl shadow-primary/20 text-white">
              <Clapperboard size={32} />
            </div>
            B-Roll Architect
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Generate cinematic 5s B-roll clips for your content using Veo Visual Intelligence.</p>
        </div>
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:underline"
        >
          <ExternalLink size={14} /> View Billing Docs
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="elevated" className="border-2 border-primary/10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              Director's Prompt
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold dark:text-slate-300">Describe Your Scene</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A neon-lit hacker room with floating holographic code in Tokyo night..."
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-4 focus:ring-primary/20 outline-none h-32 resize-none dark:text-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[11px] font-bold dark:text-slate-300">Resolution</label>
                   <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
                      <button 
                        onClick={() => setResolution('720p')}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${resolution === '720p' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500'}`}
                      >
                        720p
                      </button>
                      <button 
                        onClick={() => setResolution('1080p')}
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${resolution === '1080p' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500'}`}
                      >
                        1080p
                      </button>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold dark:text-slate-300">Aspect Ratio</label>
                   <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800">
                      <button 
                        onClick={() => setAspectRatio('16:9')}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${aspectRatio === '16:9' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500'}`}
                      >
                        <Monitor size={12} />
                        <span className="text-[9px] font-black">16:9</span>
                      </button>
                      <button 
                        onClick={() => setAspectRatio('9:16')}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${aspectRatio === '9:16' ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-500'}`}
                      >
                        <Smartphone size={12} />
                        <span className="text-[9px] font-black">9:16</span>
                      </button>
                   </div>
                </div>
              </div>

              <button 
                onClick={generateBRoll}
                disabled={loading || !prompt}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={24} />}
                Forge B-Roll
              </button>
            </div>
          </GlassCard>

          <GlassCard className="bg-primary/5 border-primary/20">
             <div className="flex gap-4">
                <ShieldCheck size={20} className="text-primary shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Veo Fast generation takes ~2-3 mins. Use specific cinematic keywords like <b>"shallow depth of field"</b> or <b>"golden hour"</b> for better results.
                </p>
             </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             {!videoUrl && !loading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50 dark:bg-slate-900/10"
                >
                   <Play size={64} className="opacity-20 mb-4" />
                   <p className="text-xl font-bold dark:text-slate-200">The Studio is Ready</p>
                   <p className="text-sm max-w-xs mt-2">Describe a scene to synthesize a cinematic high-fidelity video clip.</p>
                </motion.div>
             )}

             {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-6"
                >
                   <div className="relative">
                     <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                     <Loader2 size={64} className="text-primary animate-spin relative" />
                   </div>
                   <div className="text-center">
                     <p className="text-xl font-black dark:text-white tracking-tighter">{progressMessage}</p>
                     <p className="text-sm text-slate-500 mt-2">Connecting to Google Cloud TPUs for visual synthesis...</p>
                   </div>
                </motion.div>
             )}

             {videoUrl && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                   <GlassCard className="p-0 overflow-hidden border-2 border-primary/20 group shadow-2xl">
                      <div className={`relative ${aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-h-[700px] mx-auto'}`}>
                         <video 
                           src={videoUrl} 
                           className="w-full h-full object-cover" 
                           autoPlay 
                           loop 
                           controls 
                         />
                      </div>
                   </GlassCard>
                   
                   <div className="flex gap-4">
                      <a 
                        href={videoUrl} 
                        download="socialintel-broll.mp4"
                        className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                      >
                         <Download size={18} /> Download Clip
                      </a>
                      <button 
                        onClick={generateBRoll}
                        className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                      >
                         <RefreshCw size={18} /> Regenerate
                      </button>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BRollArchitect;
