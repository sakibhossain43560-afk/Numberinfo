import { Home, History, Search, Sun, Moon } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function MobileBottomNav({
  currentTab,
  onTabChange,
  darkMode,
  onToggleTheme,
}: MobileBottomNavProps) {
  return (
    <div className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 border-t py-2 px-6 flex items-center justify-around ${
      darkMode ? 'bg-[#0b0f19]/95 border-slate-800 text-slate-400 backdrop-blur-xl' : 'bg-white/95 border-slate-200 text-slate-600 backdrop-blur-xl shadow-lg'
    }`}>
      <button
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold cursor-pointer transition-colors ${
          currentTab === 'home' ? 'text-blue-500 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => onTabChange('search')}
        className="flex flex-col items-center gap-1 text-[11px] font-semibold cursor-pointer text-blue-500 font-bold"
      >
        <div className="w-9 h-9 -mt-3 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Search className="w-4 h-4 stroke-[2.5]" />
        </div>
        <span>Search</span>
      </button>

      <button
        onClick={() => onTabChange('history')}
        className={`flex flex-col items-center gap-1 text-[11px] font-semibold cursor-pointer transition-colors ${
          currentTab === 'history' ? 'text-blue-500 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <History className="w-5 h-5" />
        <span>History</span>
      </button>

      <button
        onClick={onToggleTheme}
        className="flex flex-col items-center gap-1 text-[11px] font-semibold cursor-pointer transition-colors hover:text-amber-400"
      >
        {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        <span>{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  );
}
