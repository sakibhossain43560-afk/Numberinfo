import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ShieldCheck,
  ChevronDown,
  X,
  PhoneCall,
  PhoneOff,
  Radio,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Clipboard,
  Sparkles,
} from 'lucide-react';
import type { CountryOption } from '../types';

interface HomePageProps {
  darkMode: boolean;
  onSearch: (phone: string, country: string) => void;
  loading: boolean;
}

const COUNTRIES: CountryOption[] = [
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩', placeholder: '01713 000000' },
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳', placeholder: '98765 43210' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸', placeholder: '(555) 000-0000' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧', placeholder: '07123 456789' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦', placeholder: '050 123 4567' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪', placeholder: '050 123 4567' },
];

const QUICK_TESTS = [
  { name: 'Kasha Islam', operator: 'Grameenphone', number: '01713000000', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
  { name: 'Robi User', operator: 'Robi', number: '01819210000', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
  { name: 'Banglalink', operator: 'Banglalink', number: '01911000000', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { name: 'Teletalk', operator: 'Teletalk', number: '01552000000', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
];

export default function HomePage({ darkMode, onSearch, loading }: HomePageProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Real-time carrier prefix detection
  const detectedCarrier = useMemo(() => {
    if (selectedCountry.code !== 'BD') return null;
    const clean = phoneNumber.replace(/\D/g, '');
    let prefix = '';
    if (clean.startsWith('880')) {
      prefix = clean.slice(3, 6);
    } else if (clean.startsWith('0')) {
      prefix = clean.slice(0, 3);
    } else if (clean.length >= 2) {
      prefix = '0' + clean.slice(0, 2);
    }

    switch (prefix) {
      case '017':
      case '013':
        return { name: 'Grameenphone', dot: 'bg-sky-400', tag: 'GP 4G/5G', color: 'text-sky-400 bg-sky-500/15 border-sky-500/30' };
      case '018':
        return { name: 'Robi Axiata', dot: 'bg-rose-500', tag: 'Robi 4.5G', color: 'text-rose-400 bg-rose-500/15 border-rose-500/30' };
      case '019':
      case '014':
        return { name: 'Banglalink', dot: 'bg-amber-400', tag: 'BL 4G', color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' };
      case '015':
        return { name: 'Teletalk BD', dot: 'bg-emerald-400', tag: 'Teletalk', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' };
      case '016':
        return { name: 'Airtel', dot: 'bg-red-500', tag: 'Airtel 4G', color: 'text-red-400 bg-red-500/15 border-red-500/30' };
      default:
        return null;
    }
  }, [phoneNumber, selectedCountry.code]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onSearch(phoneNumber.trim(), selectedCountry.code);
    }
  };

  const handleQuickTest = (num: string) => {
    setPhoneNumber(num);
    onSearch(num, selectedCountry.code);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const clean = text.replace(/[^\d+]/g, '');
        setPhoneNumber(clean);
      }
    } catch {}
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Main Grid: Clean Search on Left, Phone Graphic on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Gorgeous Search Console */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Live Caller ID & Spam Registry</span>
              </div>

              {/* Title */}
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Identify Unknown <br />
                Callers <span className="text-blue-500">Instantly.</span>
              </h1>

              <p className={`mt-2.5 text-sm sm:text-base font-medium leading-relaxed ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Search any mobile number to uncover the verified subscriber identity, operator network, and spam risk in seconds.
              </p>
            </div>

            {/* GORGEOUS PREMIUM SEARCH CONSOLE CARD */}
            <div className="relative group">
              {/* Subtle Ambient Behind-Glow */}
              <div className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-300 pointer-events-none ${
                isFocused ? 'opacity-100 bg-blue-500/20' : 'opacity-40 bg-blue-500/10'
              }`} />

              <div className={`relative rounded-3xl p-3 sm:p-4 border transition-all duration-300 shadow-2xl ${
                isFocused
                  ? 'border-blue-500 shadow-[0_12px_40px_rgba(59,130,246,0.18)]'
                  : darkMode
                  ? 'bg-[#111827] border-slate-800 shadow-black/40'
                  : 'bg-white border-slate-200/90 shadow-slate-900/5'
              }`}>
                
                {/* Search Header Strip: Country Pill + Live Detected Carrier Pill */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80 text-xs">
                  {/* Country Selector Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer ${
                        darkMode
                          ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base leading-none">{selectedCountry.flag}</span>
                      <span className="font-mono">{selectedCountry.dialCode}</span>
                      <span className="hidden sm:inline text-slate-400 font-normal">({selectedCountry.name})</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {countryDropdownOpen && (
                      <div className={`absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-2xl border py-1.5 z-50 overflow-hidden ${
                        darkMode ? 'bg-[#0f172a] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}>
                        {COUNTRIES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setCountryDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                              selectedCountry.code === c.code
                                ? 'bg-blue-600/15 text-blue-500 font-bold'
                                : darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-base">{c.flag}</span>
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className="font-mono text-slate-400">{c.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Live Carrier Detection Badge */}
                  <div>
                    <AnimatePresence mode="wait">
                      {detectedCarrier ? (
                        <motion.div
                          key={detectedCarrier.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 shadow-xs ${detectedCarrier.color}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${detectedCarrier.dot} animate-pulse`} />
                          <span>{detectedCarrier.tag}</span>
                        </motion.div>
                      ) : (
                        <span className="text-slate-400 text-xs hidden sm:inline font-medium">
                          Supports GP, Robi, BL, Teletalk
                        </span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Primary Search Input Row */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className={`relative flex-1 rounded-2xl border flex items-center px-4 transition-all duration-200 ${
                    isFocused
                      ? darkMode ? 'bg-slate-900/90 border-blue-500/80 ring-2 ring-blue-500/15' : 'bg-white border-blue-500/80 ring-2 ring-blue-500/15'
                      : darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    
                    {/* Fixed Prefix Lock */}
                    <span className="font-mono font-bold text-base sm:text-lg text-slate-400 mr-2.5 select-none shrink-0">
                      {selectedCountry.dialCode}
                    </span>

                    {/* Clean Input Field */}
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder={selectedCountry.placeholder}
                      className={`w-full py-4 bg-transparent font-black font-mono text-lg sm:text-xl focus:outline-none tracking-wide ${
                        darkMode ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'
                      }`}
                      autoFocus
                    />

                    {/* Paste from Clipboard Button (Convenience) */}
                    {!phoneNumber && (
                      <button
                        type="button"
                        onClick={handlePasteClipboard}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer shrink-0 ml-1 text-xs font-semibold flex items-center gap-1"
                        title="Paste from clipboard"
                      >
                        <Clipboard className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Paste</span>
                      </button>
                    )}

                    {/* Clear Button */}
                    {phoneNumber && (
                      <button
                        type="button"
                        onClick={() => setPhoneNumber('')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-1"
                        title="Clear input"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Gradient Premium Search Button */}
                  <button
                    type="submit"
                    disabled={loading || !phoneNumber.trim()}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-800 disabled:opacity-50 text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 active:scale-[0.98]"
                  >
                    <Search className="w-4 h-4 stroke-[2.8]" />
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Tactile Demo Chips Below Search Bar */}
                <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Quick Try:</span>
                  </span>
                  {QUICK_TESTS.map((sample) => (
                    <button
                      key={sample.number}
                      type="button"
                      onClick={() => handleQuickTest(sample.number)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:scale-105 shadow-2xs active:scale-95 ${sample.color}`}
                    >
                      <span>{sample.name} ({sample.operator})</span>
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* 3 Clean Trust Indicators */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-500" /> Instant Results
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> 100% Zero-Log Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" /> Grameenphone, Robi, BL, Teletalk
              </span>
            </div>
          </div>

          {/* Right Column: Phone Mockup ("ager phon image ta rakho") */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-[260px] sm:w-[280px] rounded-[44px] p-2 bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-2xl border border-slate-600/60">
              <div className="rounded-[36px] overflow-hidden bg-[#070b16] border border-blue-500/20 aspect-[9/18.5] flex flex-col justify-between p-5">
                
                {/* Dynamic Island */}
                <div className="pt-1 flex flex-col items-center">
                  <div className="w-20 h-5 rounded-full bg-black border border-slate-800 flex items-center justify-between px-2">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                    <span className="text-[8px] font-mono text-emerald-400 font-bold">LIVE</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-2">Incoming Call</span>
                </div>

                {/* Center Caller Screen */}
                <div className="text-center my-auto space-y-3">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 p-[2px] shadow-lg shadow-blue-500/30">
                    <div className="w-full h-full bg-[#0a1226] rounded-full flex items-center justify-center text-white font-black text-xl">
                      KI
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      Kasha Islam
                    </h3>
                    <p className="text-xs font-mono font-bold text-sky-400 mt-0.5">
                      +880 1713 000000
                    </p>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mt-1">
                      <Radio className="w-3 h-3 text-sky-400" />
                      <span>Grameenphone · Dhaka</span>
                    </div>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Caller</span>
                    </div>
                  </div>
                </div>

                {/* Accept & Decline Buttons */}
                <div className="pb-1">
                  <div className="flex items-center justify-around">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                        <PhoneOff className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-400">Decline</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-pulse">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-400">Accept</span>
                    </div>
                  </div>
                  <div className="w-20 h-1 rounded-full bg-slate-700 mx-auto mt-4" />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
