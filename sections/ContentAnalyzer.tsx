
import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import VideoDetailView from '../components/content/VideoDetailView';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  BarChart2, 
  MoreVertical,
  Calendar,
  Zap,
  Youtube,
  Instagram,
  Loader2,
  LayoutGrid
} from 'lucide-react';
import { VideoStats } from '../types';
import { youtube } from '../services/youtubeService';

interface ContentAnalyzerProps {
  isAuth?: boolean;
}

const ContentAnalyzer: React.FC<ContentAnalyzerProps> = ({ isAuth }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoStats | null>(null);
  const [videos, setVideos] = useState<VideoStats[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRealData = async () => {
      if (!isAuth) return;
      setLoading(true);
      try {
        const myVideos = await youtube.fetchMyVideos(12);
        setVideos(myVideos as any);
      } catch (err) {
        console.error("Failed to fetch real videos:", err);
      }
      setLoading(false);
    };
    loadRealData();
  }, [isAuth]);

  // If a video is selected, render the dedicated performance analysis section
  if (selectedVideo) {
    return <VideoDetailView video={selectedVideo} onBack={() => setSelectedVideo(null)} />;
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <LayoutGrid className="text-primary" size={24} />
            </div>
            Content Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            {isAuth ? "Synchronized with your live channel uploads." : "Connect to manage and analyze your media assets."}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search video performance..." 
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none dark:text-white transition-all"
            />
          </div>
          <button className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
            <Loader2 size={48} className="text-primary animate-spin relative" />
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Authenticating Stream</p>
            <p className="text-xs text-slate-400 mt-2">Pulling detailed metrics from Google Content Graph...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {videos.map((vid) => (
            <GlassCard 
              key={vid.id} 
              hoverable 
              className="p-0 flex flex-col group overflow-hidden border-2 border-transparent hover:border-primary/30" 
              variant="interactive"
              onClick={() => setSelectedVideo(vid)}
            >
              <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img src={vid.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vid.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/40 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <BarChart2 size={24} />
                   </div>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="p-1.5 bg-slate-950/80 backdrop-blur-md rounded-lg border border-white/10 shadow-xl">
                    <Youtube size={14} className="text-red-500 fill-red-500/20" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="font-bold text-sm dark:text-slate-100 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{vid.title}</h3>
                  <button className="text-slate-600 hover:text-white transition-colors shrink-0">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-auto">
                   <div className="space-y-1">
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Views</p>
                     <div className="flex items-center gap-2 dark:text-white font-black text-lg">
                       <Eye size={16} className="text-primary" />
                       {vid.views}
                     </div>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Retention</p>
                     <div className="flex items-center gap-2 dark:text-white font-black text-lg">
                       <Zap size={16} className="text-amber-500 fill-amber-500/20" />
                       {vid.avgDuration?.replace('PT', '').replace('M', ':').replace('S', '') || "6:42"}
                     </div>
                   </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {!loading && videos.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/10">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-3xl text-slate-400">
              <Youtube size={48} />
            </div>
            <div>
              <p className="text-xl font-bold dark:text-white tracking-tight">Your library is empty</p>
              <p className="text-sm text-slate-500 mt-1 font-medium max-w-xs mx-auto">Authenticate your channel to synchronize your video assets and unlock deep performance analysis.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentAnalyzer;
