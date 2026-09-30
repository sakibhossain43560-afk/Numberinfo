import { Phone, Shield, Globe, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  isResultPage?: boolean;
  onGoHome?: () => void;
}

export default function Header({ isResultPage, onGoHome }: HeaderProps) {
  if (isResultPage) {
    return (
      <header className="w-full pt-4 pb-2 px-4 max-w-md mx-auto flex items-center justify-between">
        {/* Left Badge: Official Telecom */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b1328] border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Official Telecom</span>
        </div>

        {/* Right Badge: Live Record */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b1328] border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-xs">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Live Record</span>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full pt-5 pb-3 px-4 max-w-md mx-auto flex items-center justify-between">
      {/* Left Icon: Phone in rounded square with green online dot */}
      <button
        onClick={onGoHome}
        className="relative p-2.5 rounded-2xl bg-[#0b1328] border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.18)] hover:border-cyan-400 transition-colors cursor-pointer group"
        title="Number to Info Home"
      >
        <Phone className="w-5 h-5 fill-cyan-400/20 stroke-[2.2]" />
        {/* Glowing Green Online Dot */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#060b18] shadow-[0_0_8px_#10b981]" />
      </button>

      {/* Right Badges: PUBLIC DATABASE & Live Database */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b1328] border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>PUBLIC DATABASE</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b1328] border border-cyan-500/30 text-slate-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
          <span>Live Database</span>
        </div>
      </div>
    </header>
  );
}
