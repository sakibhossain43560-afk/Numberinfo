import { Shield, Sun, Moon, History } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenHistory: () => void;
  historyCount: number;
  onGoHome: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  onOpenHistory,
  historyCount,
  onGoHome,
}: NavbarProps) {
  return (
    <header className="w-full pt-4 sm:pt-6 px-4 sm:px-6">
      <div className={`max-w-4xl mx-auto rounded-2xl px-4 sm:px-6 py-3 border shadow-sm backdrop-blur-xl transition-all flex items-center justify-between gap-4 ${
        darkMode
          ? 'bg-[#0f172a]/90 border-slate-800 text-white'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-slate-900/5'
      }`}>
        
        {/* Brand */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer group text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 fill-white/20 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-lg font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Caller<span className="text-blue-500">ID</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        </button>

        {/* Right Controls: History & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* History Pill */}
          <button
            onClick={onOpenHistory}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Search History"
          >
            <History className="w-3.5 h-3.5 text-blue-500" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-blue-600 text-white font-mono">
                {historyCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
