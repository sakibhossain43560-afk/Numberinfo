import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
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
  Globe,
  Sparkles,
} from 'lucide-react';
import type { CountryOption } from '../types';

interface HeroSectionProps {
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
  { label: '01713-000000', name: 'Kasha Islam', operator: 'Grameenphone', number: '01713000000', color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
  { label: '01819-210000', name: 'Robi User', operator: 'Robi', number: '01819210000', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
  { label: '01911-000000', name: 'Shamsur R.', operator: 'Banglalink', number: '01911000000', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  { label: '01552-000000', name: 'Teletalk User', operator: 'Teletalk', number: '01552000000', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
];

export default function HeroSection({ darkMode, onSearch, loading }: HeroSectionProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Real-time carrier prefix detection for Bangladesh numbers
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
        return { name: 'Grameenphone', color: 'text-sky-500 border-sky-500/30 bg-sky-500/10', tag: 'GP 4G/5G' };
      case '018':
        return { name: 'Robi Axiata', color: 'text-rose-500 border-rose-500/30 bg-rose-500/10', tag: 'Robi 4.5G' };
      case '019':
      case '014':
        return { name: 'Banglalink', color: 'text-amber-500 border-amber-500/30 bg-amber-500/10', tag: 'BL 4G' };
      case '015':
        return { name: 'Teletalk BD', color: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10', tag: 'Teletalk' };
      case '016':
        return { name: 'Airtel', color: 'text-red-500 border-red-500/30 bg-red-500/10', tag: 'Airtel 4G' };
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

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
      {/* Ambient Canvas Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[140px] ${
          darkMode ? 'bg-blue-600/[0.08]' : 'bg-blue-400/[0.07]'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Brand-New Spotlight Search Console */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Trust Subtitle */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Telecom & Truecaller Intelligence</span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.08] ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Identify Unknown <br className="hidden sm:inline" />
                Callers <span className="text-blue-500">Instantly.</span>
              </h1>

              <p className={`mt-4 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Real-time subscriber name identification, carrier verification (Grameenphone, Robi, BL, Teletalk), and live spam threat ratings.
              </p>
            </motion.div>

            {/* BRAND-NEW SEARCH CONSOLE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`rounded-3xl p-4 sm:p-5 border shadow-2xl transition-all ${
                darkMode
                  ? 'bg-[#111827] border-slate-800 shadow-black/30'
                  : 'bg-white border-slate-200/90 shadow-slate-900/5'
              }`}
            >
              {/* Top Bar of Search Console: Country Switcher & Carrier Detector */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80 text-xs">
                {/* Country Pill Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors border ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{selectedCountry.flag}</span>
                    <span>{selectedCountry.name} ({selectedCountry.dialCode})</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {countryDropdownOpen && (
                    <div className={`absolute top-full left-0 mt-2 w-60 rounded-2xl shadow-2xl border py-1.5 z-50 overflow-hidden ${
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
                          <span>{c.flag}</span>
                          <span className="flex-1 truncate">{c.name}</span>
                          <span className="font-mono text-slate-400">{c.dialCode}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Detected Live Carrier Indicator */}
                <div>
                  {detectedCarrier ? (
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 animate-in fade-in duration-150 ${detectedCarrier.color}`}>
                      <Radio className="w-3.5 h-3.5" />
                      <span>{detectedCarrier.tag}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs hidden sm:inline">
                      Enter BD mobile number
                    </span>
                  )}
                </div>
              </div>

              {/* Main Input Field + Large Search Button */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className={`relative flex-1 rounded-2xl border flex items-center px-4 transition-all ${
                  isFocused
                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                    : darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="font-mono font-bold text-sm sm:text-base text-slate-400 pr-2 shrink-0 select-none">
                    {selectedCountry.dialCode}
                  </span>

                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={selectedCountry.placeholder}
                    className={`w-full py-3.5 bg-transparent font-bold text-base sm:text-lg focus:outline-none ${
                      darkMode ? 'text-white placeholder:text-slate-600' : 'text-slate-900 placeholder:text-slate-400'
                    }`}
                    autoFocus
                  />

                  {phoneNumber && (
                    <button
                      type="button"
                      onClick={() => setPhoneNumber('')}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer shrink-0 ml-1"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !phoneNumber.trim()}
                  className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 active:scale-[0.98]"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Inspect Number</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Sample Demo Chips Below Input */}
              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Quick Test:</span>
                {QUICK_TESTS.map((sample) => (
                  <button
                    key={sample.number}
                    type="button"
                    onClick={() => handleQuickTest(sample.number)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:scale-105 ${sample.color}`}
                  >
                    <span>{sample.name} ({sample.label.slice(0, 5)}...)</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 3 Core Trust Signals */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-1 text-xs sm:text-sm font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-500" /> Instant Results
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-500" /> 100% Zero-Log Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-500" /> All BD Networks Supported
              </span>
            </div>
          </div>

          {/* Right Column: Hyper-Realistic iPhone 16 Pro Frame with Incoming Caller UI */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Behind-Phone Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-blue-500/15 blur-[100px] pointer-events-none" />

            {/* iPhone 16 Pro Device Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 w-[285px] sm:w-[320px] rounded-[50px] p-[10px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-[0_30px_80px_rgba(0,0,0,0.85)] border border-slate-600/60"
            >
              {/* Inner Screen */}
              <div className="relative rounded-[42px] overflow-hidden bg-[#070b16] border border-blue-500/20 aspect-[9/19] flex flex-col justify-between p-6">
                
                {/* Dynamic Island at Top */}
                <div className="pt-1 flex flex-col items-center">
                  <div className="w-24 h-6 rounded-full bg-black border border-slate-800 flex items-center justify-between px-2.5 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">LIVE</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2">Incoming Call</span>
                </div>

                {/* Center: Live Caller Card Display */}
                <div className="text-center my-auto space-y-4">
                  {/* Avatar */}
                  <div className="mx-auto w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 p-[2px] shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    <div className="w-full h-full bg-[#0a1226] rounded-full flex items-center justify-center text-white font-black text-2xl">
                      KI
                    </div>
                  </div>

                  <div>
                    {/* Big Caller Name */}
                    <div className="flex items-center justify-center gap-1.5">
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        Kasha Islam
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                    </div>

                    <p className="text-sm font-mono font-bold text-sky-400 mt-1">
                      +880 1713 000000
                    </p>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 mt-2">
                      <Radio className="w-3.5 h-3.5 text-sky-400" />
                      <span>Grameenphone · Dhaka Circle</span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Caller · Safe</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Call Controls (Decline / Accept Buttons) */}
                <div className="pb-2">
                  <div className="flex items-center justify-around">
                    {/* Decline Call Button */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 cursor-pointer transition-transform active:scale-95">
                        <PhoneOff className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] text-slate-400">Decline</span>
                    </div>

                    {/* Accept Call Button */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 cursor-pointer transition-transform active:scale-95 animate-pulse">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] text-slate-400">Accept</span>
                    </div>
                  </div>

                  {/* Home Bar indicator */}
                  <div className="w-28 h-1 rounded-full bg-slate-700 mx-auto mt-6" />
                </div>
              </div>

              {/* Floating Verified Badge (Top Right) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => handleQuickTest('01713000000')}
                className="absolute -top-3 -right-6 px-3.5 py-2 rounded-2xl bg-[#0d162e]/95 border border-blue-500/40 text-white shadow-xl backdrop-blur-md flex items-center gap-2.5 cursor-pointer hover:border-blue-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">Telecom Verified</div>
                  <div className="text-[10px] text-blue-300">Truecaller DB Ready</div>
                </div>
              </motion.div>

              {/* Floating Spam Shield Badge (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute bottom-16 -left-6 px-3.5 py-2 rounded-2xl bg-[#0d162e]/95 border border-emerald-500/40 text-white shadow-xl backdrop-blur-md flex items-center gap-2.5 hidden sm:flex"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">Spam Shield</div>
                  <div className="text-[10px] text-emerald-300">0 Reports · Clean</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
