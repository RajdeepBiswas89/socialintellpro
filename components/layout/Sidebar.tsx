
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Video, 
  Users, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  FlaskConical,
  Link,
  Telescope,
  Brain,
  Settings,
  Flame,
  CreditCard,
  FileText,
  Building2,
  Image,
  Mic2,
  Bot,
  Clapperboard,
  UserSearch,
  BrainCircuit
} from 'lucide-react';
import { analytics } from '../../services/analyticsService';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onConnect?: () => void;
  isAuth?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onConnect, isAuth }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'growth', icon: Flame, label: 'Growth Engine' },
    { id: 'oracle', icon: Bot, label: 'Growth Oracle' },
    { id: 'script', icon: FileText, label: 'Script Architect' },
    { id: 'voice', icon: Mic2, label: 'Voice Architect' },
    { id: 'forge', icon: Image, label: 'Thumbnail Forge' },
    { id: 'broll', icon: Clapperboard, label: 'B-Roll Forge' },
    { id: 'personas', icon: UserSearch, label: 'Persona Lab' },
    { id: 'patterns', icon: BrainCircuit, label: 'Pattern Lab' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'content', icon: Video, label: 'Content' },
    { id: 'lab', icon: FlaskConical, label: 'Title Lab' },
    { id: 'trends', icon: Telescope, label: 'Quantum Trends' },
    { id: 'sim', icon: Brain, label: 'Neural Lab' },
    { id: 'competitors', icon: Users, label: 'Competitors' },
    { id: 'insights', icon: Zap, label: 'AI Strategy' },
    { id: 'agency', icon: Building2, label: 'Agency Pro' },
    { id: 'pricing', icon: CreditCard, label: 'Elite Plans' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleTabChange = (id: string) => {
    onTabChange(id);
    analytics.track('page_view', `tab_${id}`);
  };

  return (
    <div 
      className={`h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <Zap size={20} className="text-white fill-current" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            SocialIntel <span className="text-primary font-black">PRO</span>
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 custom-scrollbar overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button 
          onClick={() => {
            onConnect?.();
            analytics.track('button_click', 'connect_youtube');
          }}
          disabled={isAuth}
          className={`flex items-center gap-3 w-full p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all ${isCollapsed ? 'justify-center' : ''} ${isAuth ? 'opacity-50 cursor-default' : ''}`}
        >
          <Link size={18} />
          {!isCollapsed && <span className="text-sm font-bold">{isAuth ? 'Connected' : 'Connect YouTube'}</span>}
        </button>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-4 w-full px-4 py-3 text-slate-400 hover:text-primary transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span className="font-medium text-sm">Collapse Menu</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
