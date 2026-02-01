
import React, { useState, useRef } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { 
  Mic2, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  Wand2, 
  Brain, 
  Ear,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Music,
  AudioLines, // Replaced UserVoice
  Zap
} from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { analytics } from '../services/analyticsService';

const VoiceArchitect: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Zephyr');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const voices = [
    { name: 'Zephyr', desc: 'Energetic & Professional' },
    { name: 'Kore', desc: 'Calm & Educational' },
    { name: 'Puck', desc: 'Fast-paced & Viral' },
    { name: 'Charon', desc: 'Deep & Authoritative' }
  ];

  const generateVoice = async () => {
    if (!text) return;
    setLoading(true);
    analytics.track('feature_usage', 'voice_architect_generate', { voice, textLength: text.length });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this hook with a ${voice.toLowerCase()} style: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const audioData = atob(base64Audio);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < audioData.length; i++) {
          view[i] = audioData.charCodeAt(i);
        }

        const dataInt16 = new Int16Array(arrayBuffer);
        const frameCount = dataInt16.length;
        const buffer = audioContextRef.current.createBuffer(1, frameCount, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }

        audioBufferRef.current = buffer;
        playAudio();
      }
    } catch (e) {
      console.error("TTS Error:", e);
    }
    setLoading(false);
  };

  const playAudio = () => {
    if (!audioBufferRef.current || !audioContextRef.current) return;
    
    if (sourceRef.current) {
      sourceRef.current.stop();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.onended = () => setIsPlaying(false);
    source.start(0);
    sourceRef.current = source;
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-xl shadow-indigo-500/20">
              <Mic2 size={32} className="text-white" />
            </div>
            Voice Architect
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Engineer high-retention audio narratives using Gemini Neural TTS.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard variant="elevated" className="border-2 border-indigo-500/10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <AudioLines size={14} className="text-indigo-500" />
              Narration Engine
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold dark:text-slate-300">Viral Hook / Script Segment</label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your script segment here..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-4 focus:ring-indigo-500/20 outline-none h-32 resize-none dark:text-white transition-all font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold dark:text-slate-300">Select Neural Voice</label>
                <div className="grid grid-cols-2 gap-3">
                  {voices.map(v => (
                    <button 
                      key={v.name}
                      onClick={() => setVoice(v.name)}
                      className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                        voice === v.name ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
                      }`}
                    >
                      <span className="font-black text-sm">{v.name}</span>
                      <span className={`text-[9px] font-medium uppercase tracking-widest mt-1 ${voice === v.name ? 'text-white/80' : 'text-slate-400'}`}>{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generateVoice}
                disabled={loading || !text}
                className="w-full py-5 bg-indigo-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30 hover:bg-indigo-600 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Volume2 size={24} />}
                Synthesize Narration
              </button>
            </div>
          </GlassCard>

          <GlassCard className="bg-indigo-500/5 border-indigo-500/10">
             <div className="flex gap-4">
                <Ear size={20} className="text-indigo-500 shrink-0" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Studies show that <b>clear, energetic voiceovers</b> reduce scroll-away rates by 18% in the first 3 seconds of a video.
                </p>
             </div>
          </GlassCard>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-7">
          {!audioBufferRef.current && !loading && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50 dark:bg-slate-900/10">
               <Music size={64} className="opacity-20 mb-4" />
               <p className="text-xl font-bold dark:text-slate-200">The Studio is Quiet</p>
               <p className="text-sm max-w-xs mt-2">Generate a voiceover to hear your script come to life with professional neural pacing.</p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-6">
               <div className="relative">
                 <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                 <Brain size={64} className="text-indigo-500 animate-pulse relative" />
               </div>
               <div className="text-center">
                 <p className="text-xl font-black dark:text-white tracking-tighter">Synthesizing Neural Speech...</p>
                 <p className="text-sm text-slate-500 mt-2">Adjusting prosody and emotional cadence for maximum engagement.</p>
               </div>
            </div>
          )}

          {audioBufferRef.current && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <GlassCard className="py-10 flex flex-col items-center gap-8 bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-500/20" variant="elevated">
                  <div className="relative">
                     <div className={`absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl transition-all duration-500 ${isPlaying ? 'scale-150' : 'scale-0'}`} />
                     <button 
                        onClick={isPlaying ? stopAudio : playAudio}
                        className="relative w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 hover:scale-110 transition-transform active:scale-95"
                     >
                        {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} className="ml-2" fill="currentColor" />}
                     </button>
                  </div>
                  
                  <div className="text-center space-y-2">
                     <p className="text-sm font-black dark:text-white uppercase tracking-widest">{voice} Voice Sample Ready</p>
                     <p className="text-xs text-slate-500 font-medium">{Math.round(audioBufferRef.current.duration * 10) / 10} seconds duration</p>
                  </div>

                  <div className="flex gap-4 w-full px-10">
                     <div className="flex-1 flex items-center gap-1">
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                           <div 
                              key={i} 
                              className={`flex-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`}
                              style={{ height: isPlaying ? `${20 + Math.random() * 60}%` : '20%' }}
                           />
                        ))}
                     </div>
                  </div>
               </GlassCard>

               <div className="grid grid-cols-2 gap-6">
                  <GlassCard variant="interactive" className="p-6">
                     <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sentiment Match</span>
                     </div>
                     <p className="text-sm font-black dark:text-white">96% Accuracy</p>
                  </GlassCard>
                  <GlassCard variant="interactive" className="p-6">
                     <div className="flex items-center gap-3 mb-2">
                        <Zap size={16} className="text-amber-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Level</span>
                     </div>
                     <p className="text-sm font-black dark:text-white">High Velocity</p>
                  </GlassCard>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceArchitect;
