import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Search,
  ShieldCheck,
  ShieldAlert,
  PhoneCall,
  MessageCircle,
  Copy,
  Check,
  ChevronDown,
  X,
  Radio,
  MapPin,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import type { NumberInfoResult, CountryOption } from '../types';

interface SearchResultDashboardProps {
  darkMode: boolean;
  result: NumberInfoResult;
  onBack: () => void;
  onSearchNew: (num: string, country: string) => void;
  loading: boolean;
}

const COUNTRIES: CountryOption[] = [
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩', placeholder: 'Enter phone number' },
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳', placeholder: 'Enter 10-digit number' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸', placeholder: 'Enter US number' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧', placeholder: 'Enter UK number' },
];

export default function SearchResultDashboard({
  darkMode,
  result,
  onBack,
  onSearchNew,
  loading,
}: SearchResultDashboardProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(result.mobile || '');
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const cleanDigits = result.mobile.replace(/\D/g, '');
  const bdLocalNum = cleanDigits.startsWith('880')
    ? '0' + cleanDigits.slice(3)
    : cleanDigits.length === 10 && cleanDigits.startsWith('1')
    ? '0' + cleanDigits
    : cleanDigits;

  const intlFormatted = cleanDigits.startsWith('880')
    ? `+880 ${cleanDigits.slice(3, 7)} ${cleanDigits.slice(7)}`
    : `+880 ${bdLocalNum.slice(1, 5)} ${bdLocalNum.slice(5)}`;

  // Big Caller Name as requested
  const displayName = result.name?.trim() || 'Unknown Caller';

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`Copied ${label}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchNew(searchQuery.trim(), selectedCountry.code);
    }
  };

  return (
    <div className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-blue-200 border border-blue-500/40 text-xs font-semibold shadow-2xl backdrop-blur-md">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto w-full space-y-6">
        
        {/* Navigation & Back Action */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
              darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Search</span>
          </button>

          <span className="text-xs font-mono text-blue-500 font-bold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            {intlFormatted}
          </span>
        </div>

        {/* Quick In-Page Search Bar */}
        <form onSubmit={handleSearchSubmit}>
          <div className={`flex items-center rounded-2xl p-1.5 shadow-lg border transition-all ${
            darkMode ? 'bg-[#111827] border-slate-800 focus-within:border-blue-500' : 'bg-white border-slate-200 focus-within:border-blue-500'
          }`}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  darkMode ? 'bg-slate-900 text-slate-200 hover:bg-slate-800' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{selectedCountry.flag}</span>
                <span className="font-mono">{selectedCountry.dialCode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {countryDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-52 rounded-2xl shadow-2xl border py-1.5 z-50 overflow-hidden ${
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
                          ? 'text-blue-500 font-bold bg-blue-500/10'
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

            <div className="relative flex-1 flex items-center min-w-0 px-2">
              <input
                type="tel"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search another phone number..."
                className={`w-full py-2 bg-transparent text-sm sm:text-base font-bold font-mono focus:outline-none pr-8 ${
                  darkMode ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md shadow-blue-500/25 active:scale-95"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Lookup</span>
            </button>
          </div>
        </form>

        {/* CLEAN CALLER DOSSIER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl border shadow-xl overflow-hidden ${
            darkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-600/10 via-sky-500/10 to-indigo-600/10 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/20 shrink-0">
                  <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-black text-2xl sm:text-3xl ${
                    darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-blue-600'
                  }`}>
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Big Caller Name */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {displayName}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Formatted Number */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-base font-bold text-blue-500">
                      {intlFormatted}
                    </span>
                    <button
                      onClick={() => copyToClipboard(intlFormatted, 'Phone Number')}
                      className="p-1 text-slate-400 hover:text-blue-500 cursor-pointer"
                      title="Copy Number"
                    >
                      {copiedKey === 'Phone Number' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-slate-400 text-xs">· {result.carrier || 'Grameenphone'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${bdLocalNum}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/88${bdLocalNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => copyToClipboard(`${displayName} - ${intlFormatted} (${result.carrier})`, 'Summary')}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  title="Copy Details"
                >
                  {copiedKey === 'Summary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* Body Info Breakdown */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* 3 Metric Summary Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-2xl border ${
                result.isSpam ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                <div className="text-xs font-bold mb-0.5">Spam Status</div>
                <div className="text-base font-black text-white">{result.isSpam ? 'Flagged Spam' : 'Safe / Clean'}</div>
              </div>

              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold text-slate-400 mb-0.5">Operator</div>
                <div className="text-base font-black text-white truncate">{result.carrier || 'Grameenphone'}</div>
              </div>

              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold text-slate-400 mb-0.5">Location Circle</div>
                <div className="text-base font-black text-white truncate">{result.location || 'Dhaka, Bangladesh'}</div>
              </div>
            </div>

            {/* Structured Table */}
            <div className={`rounded-2xl border divide-y overflow-hidden text-sm ${
              darkMode ? 'bg-[#0f172a] border-slate-800 divide-slate-800' : 'bg-slate-50 border-slate-200 divide-slate-200'
            }`}>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400 font-medium">Registered Caller</span>
                <span className={`font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{displayName}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400 font-medium">National Number</span>
                <span className="font-mono font-bold text-blue-500">{bdLocalNum}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400 font-medium">Operator Network</span>
                <span className="font-bold text-sky-400">{result.carrier || 'Grameenphone'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400 font-medium">Line Classification</span>
                <span className="font-semibold text-slate-300">{result.type || 'Mobile (GSM 4G/5G)'}</span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-slate-400 font-medium">Telecom Circle</span>
                <span className="font-semibold text-slate-300">{result.location || 'Dhaka, Bangladesh'}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer text-center"
              >
                Search Another Number
              </button>
              <button
                onClick={() => {
                  const summary = `Caller: ${displayName}\nNumber: ${intlFormatted}\nCarrier: ${result.carrier || 'Mobile'}`;
                  navigator.clipboard.writeText(summary);
                  copyToClipboard(summary, 'Dossier');
                }}
                className={`px-5 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
