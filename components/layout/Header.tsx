
import React from 'react';
import { Search, Bell, Moon, Sun, Command, Globe } from 'lucide-react';
// Added YouTubeProfile import
import { YouTubeProfile } from '../../services/youtubeService';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  // Added user prop to fix App.tsx error
  user?: YouTubeProfile | null;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle, user }) => {
  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-200 dark:border-slate-800 glass-effect flex items-center justify-between px-8">
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Analyze a video URL or search..."
          className="block w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500 text-sm text-slate-900 dark:text-white"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 text-[10px] font-mono pointer-events-none">
          <div className="bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-1.5 flex items-center gap-1">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <Globe size={12} className="text-primary" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Global Reach: 1.2M</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onThemeToggle}
            className="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="relative p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            {/* Updated to show user title if available */}
            <p className="text-sm font-semibold dark:text-white">{user?.title || "Enterprise User"}</p>
            <p className="text-[10px] text-primary uppercase font-bold tracking-tighter">{user ? "Verified Partner" : "Guest Mode"}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-400 p-[2px]">
            {/* Updated to show user thumbnail if available */}
            <img 
              src={user?.thumbnails?.default?.url || "https://picsum.photos/seed/enterprise/40/40"} 
              alt="Avatar" 
              className="w-full h-full rounded-[10px] object-cover bg-white dark:bg-slate-900"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
