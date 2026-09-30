import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Search,
  CheckCircle2,
  Shield,
  Lock,
  Smartphone,
  Info,
  Send,
  Copy,
  Check,
  Code,
  Zap,
} from 'lucide-react';
import Header from './Header';

interface SearchPageProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchPage({ onSearch, loading }: SearchPageProps) {
  const [inputVal, setInputVal] = useState('');
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText('https://api.example.com/v1/lookup?num=8801925723245');
    setCopiedEndpoint(true);
    setTimeout(() => setCopiedEndpoint(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans pb-10">
      
      {/* Top Badges Header */}
      <Header />

      <main className="w-full max-w-md mx-auto px-4 space-y-5 mt-2">
        
        {/* Brand Title: Number to Info */}
        <div className="text-left space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Number to <span className="text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">Info</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Get public information from phone number
          </p>
        </div>

        {/* Glowing Search Box Container */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="relative rounded-3xl p-1.5 bg-[#0a1226] border border-cyan-500/40 shadow-[0_0_25px_rgba(0,212,255,0.22)] focus-within:border-cyan-400 focus-within:shadow-[0_0_35px_rgba(0,229,255,0.35)] transition-all">
            <div className="flex items-center gap-2">
              
              {/* Phone Icon in Glowing Pill */}
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 ml-1">
                <Phone className="w-5 h-5 fill-cyan-400/20" />
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter number or Facebook UID"
                className="w-full bg-transparent text-white font-medium text-sm sm:text-base placeholder:text-slate-400 focus:outline-none px-1"
                autoFocus
              />

              {/* Cyan Pill Search Button matching box border */}
              <button
                type="submit"
                disabled={loading || !inputVal.trim()}
                className="px-5 py-2.5 rounded-2xl bg-[#00e5ff] hover:bg-[#00cce6] disabled:opacity-40 text-[#060b18] font-black text-sm flex items-center gap-1.5 shadow-[0_0_18px_rgba(0,229,255,0.35)] active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 stroke-[2.8]" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Under-search notice */}
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium px-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Only public information is shown. We do not collect or store any data.</span>
          </div>
        </form>

        {/* Center Search Public Information Card (Image 1) */}
        <div className="rounded-3xl p-8 bg-[#0b1328] border border-cyan-500/25 text-center shadow-lg shadow-black/40 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_rgba(0,212,255,0.2)]">
            <Search className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="text-lg font-black text-white">
              Search <span className="text-[#00e5ff]">Public Information</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-2 max-w-xs mx-auto">
              Enter any mobile number or Facebook UID in the search bar above to view verified details.
            </p>
          </div>
        </div>

        {/* 4 Feature Cards (2x2 Grid - Image 2) */}
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Fast & Easy */}
          <div className="p-4 rounded-3xl bg-[#0b1328] border border-cyan-500/20 text-center flex flex-col items-center gap-2 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5 fill-emerald-400/20" />
            </div>
            <div>
              <div className="font-black text-sm text-white">Fast & Easy</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Get info in seconds</div>
            </div>
          </div>

          {/* 2. 100% Public Data */}
          <div className="p-4 rounded-3xl bg-[#0b1328] border border-cyan-500/20 text-center flex flex-col items-center gap-2 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5 fill-cyan-400/20" />
            </div>
            <div>
              <div className="font-black text-sm text-white">100% Public Data</div>
              <div className="text-[11px] text-slate-400 mt-0.5">No login required</div>
            </div>
          </div>

          {/* 3. Mobile Friendly */}
          <div className="p-4 rounded-3xl bg-[#0b1328] border border-cyan-500/20 text-center flex flex-col items-center gap-2 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-sm text-white">Mobile Friendly</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Works on all devices</div>
            </div>
          </div>

          {/* 4. Safe & Secure */}
          <div className="p-4 rounded-3xl bg-[#0b1328] border border-cyan-500/20 text-center flex flex-col items-center gap-2 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5 fill-amber-400/20" />
            </div>
            <div>
              <div className="font-black text-sm text-white">Safe & Secure</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Your privacy matters</div>
            </div>
          </div>
        </div>

        {/* Note Box (Image 2 & 3) */}
        <div className="rounded-3xl p-4 bg-[#0b1328] border border-cyan-500/20 flex items-start gap-3 text-xs leading-relaxed text-slate-300">
          <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Note: </span>
            <span>This tool only works with public information. We do not store any data or access private information.</span>
          </div>
        </div>

        {/* API ENDPOINT Card (Image 2 & 3) */}
        <div className="rounded-3xl p-5 bg-[#0b1328] border border-cyan-500/30 shadow-lg shadow-black/50 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>API ENDPOINT</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
              REST API
            </span>
          </div>

          {/* Telegram Contact Button (Username hidden) */}
          <a
            href="https://t.me/H6679_0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00e5ff] to-[#00b4d8] hover:from-[#00cce6] hover:to-[#0096c7] text-[#060b18] font-black text-sm flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_28px_rgba(0,229,255,0.45)] transition-all cursor-pointer active:scale-95"
          >
            <Send className="w-4.5 h-4.5" />
            <span>Telegram-এ যোগাযোগ করুন</span>
          </a>

          {/* Bengali text */}
          <p className="text-center text-xs text-slate-300 font-medium">
            আপনার ওয়েবসাইট বা অ্যাপের জন্য ডাটাবেজ API নিতে টেলিগ্রামে যোগাযোগ করুন।
          </p>

          {/* Endpoint box with Copy */}
          <div className="rounded-2xl p-2.5 bg-[#060b18] border border-cyan-500/20 flex items-center justify-between gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
              GET
            </span>
            <span className="text-slate-300 truncate text-[11px]">
              https://api.example.com/v1/lookup?num=...
            </span>
            <button
              type="button"
              onClick={handleCopyEndpoint}
              className="px-2.5 py-1 rounded-xl bg-[#0b1328] border border-cyan-500/30 text-cyan-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:border-cyan-400 transition-colors"
            >
              {copiedEndpoint ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedEndpoint ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* 3 Feature Checklist Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>JSON Output</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>High Speed (&lt;100ms)</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Phone &amp; UID Support</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 pt-5 pb-3 space-y-1">
          <div>© 2026 Number to Info. All public records verified.</div>
          <div className="text-[11px] text-slate-500 font-medium">
            Developed by <span className="text-[#00e5ff] font-bold">SAKIB HOSSAIN</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
