import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Phone,
  Radio,
  Lock,
  RotateCcw,
  Copy,
  Check,
  PhoneCall,
  Share2,
} from 'lucide-react';
import Header from './Header';
import type { NumberInfoResult } from '../types';

interface ResultPageProps {
  result: NumberInfoResult;
  onBackToSearch: () => void;
}

export default function ResultPage({ result, onBackToSearch }: ResultPageProps) {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);

  // Normalize phone number to raw with 880 format as shown in screenshot (e.g. 8801925723245)
  const cleanDigits = result.mobile.replace(/\D/g, '');
  const displayRawNum = result.rawWith880 || (cleanDigits.startsWith('880')
    ? cleanDigits
    : cleanDigits.startsWith('0')
    ? '880' + cleanDigits.slice(1)
    : '880' + cleanDigits);

  const localDialNum = cleanDigits.startsWith('880')
    ? '0' + cleanDigits.slice(3)
    : cleanDigits.startsWith('0')
    ? cleanDigits
    : '0' + cleanDigits;

  const displayName = result.name?.trim() || 'টেলিকম নিবন্ধিত গ্রাহক (Private)';
  const isPrivate = result.isPrivate ?? displayName.includes('Private');
  const operatorName = result.carrier?.replace(/\(BD\)/g, '').trim() || 'Banglalink';

  // Operator badge border color (Screenshot had gold/amber for Banglalink)
  const getOperatorStyle = (op: string) => {
    if (op.includes('Banglalink')) {
      return 'text-amber-400 border-amber-400/60 bg-amber-400/10';
    }
    if (op.includes('Grameenphone')) {
      return 'text-sky-400 border-sky-400/60 bg-sky-400/10';
    }
    if (op.includes('Robi')) {
      return 'text-rose-400 border-rose-400/60 bg-rose-400/10';
    }
    if (op.includes('Teletalk')) {
      return 'text-emerald-400 border-emerald-400/60 bg-emerald-400/10';
    }
    if (op.includes('Airtel')) {
      return 'text-red-400 border-red-400/60 bg-red-400/10';
    }
    return 'text-cyan-400 border-cyan-400/60 bg-cyan-400/10';
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(displayRawNum);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleCopyDetails = () => {
    const summary = `Name: ${displayName}\nNumber: ${displayRawNum}\nOperator: ${operatorName}\nStatus: বায়োমেট্রিক সিম রেকর্ড (Biometric SIM)`;
    navigator.clipboard.writeText(summary);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans pb-10">
      
      {/* Top Badges Header: Official Telecom & Live Record */}
      <Header isResultPage={true} onGoHome={onBackToSearch} />

      <main className="w-full max-w-md mx-auto px-4 space-y-5 mt-1">
        
        {/* Main Result Card (Image 4 & 5) */}
        <div className="rounded-3xl p-6 bg-[#0a1226] border border-cyan-500/30 shadow-[0_0_30px_rgba(0,212,255,0.18)] text-center space-y-4">
          
          {/* Glowing Circular Avatar */}
          <div className="relative mx-auto w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#00e5ff] via-sky-500 to-blue-600 shadow-[0_0_25px_rgba(0,229,255,0.4)]">
            <div className="w-full h-full rounded-full bg-[#060b18] flex items-center justify-center text-cyan-400">
              <User className="w-11 h-11 stroke-[1.8]" />
            </div>
            {/* Green Online Dot */}
            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#060b18] shadow-[0_0_8px_#10b981]" />
          </div>

          {/* Pill Badge: বায়োমেট্রিক সিম রেকর্ড (Biometric SIM) */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold text-[#00e5ff] bg-cyan-500/10 border border-cyan-500/40 shadow-xs">
              বায়োমেট্রিক সিম রেকর্ড (Biometric SIM)
            </span>
          </div>

          {/* FULL NAME (পূর্ণ নাম) Label */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              FULL NAME (পূর্ণ নাম)
            </span>
            {/* BIG CALLER NAME */}
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {displayName}
            </h2>
          </div>

          {/* Phone Number + Operator Badge (e.g. 8801925723245 [ Banglalink ]) */}
          <div className="flex items-center justify-center gap-2.5 pt-1">
            <span className="font-mono text-lg font-bold text-white tracking-wider">
              {displayRawNum}
            </span>
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getOperatorStyle(operatorName)}`}>
              {operatorName}
            </span>
          </div>

          {/* Notice Alert Box (Image 4 & 5) */}
          <div className="rounded-2xl p-3.5 bg-[#0b1633] border border-cyan-500/30 flex items-start gap-2.5 text-left text-xs leading-relaxed text-slate-300">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              {isPrivate ? (
                <span>
                  এই নাম্বারের নাম পাবলিক ডাটাবেজে উন্মুক্ত নয় (Private)। তবে BTRC বরাদ্দকৃত সিম অপারেটর সংক্রান্ত তথ্য নিচে দেখানো হয়েছে।
                </span>
              ) : (
                <span>
                  পাবলিক ডাটাবেজ ও লাইভ টেলিকম রেকর্ড থেকে ভেরিফাইড তথ্য সফলভাবে লোড হয়েছে।
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: [ Call Now ] and [ Copy Details ] */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* 1. Call Now */}
            <a
              href={`tel:${localDialNum}`}
              className="py-3 px-4 rounded-2xl bg-[#0088ff] hover:bg-[#0077ee] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* 2. Copy Details */}
            <button
              type="button"
              onClick={handleCopyDetails}
              className="py-3 px-4 rounded-2xl bg-[#0b1328] hover:bg-[#0f1b38] border border-cyan-500/40 text-cyan-300 font-bold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              {copiedDetails ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedDetails ? 'Copied' : 'Copy Details'}</span>
            </button>
          </div>

        </div>

        {/* Profile Information Table Card (Image 4 & 5) */}
        <div className="rounded-3xl p-5 bg-[#0a1226] border border-cyan-500/30 shadow-lg shadow-black/40 space-y-4">
          
          {/* Header Row: Profile Information on Left, Search Another on Right */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>Profile Information</span>
            </div>

            {/* Search Another button */}
            <button
              onClick={onBackToSearch}
              className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Search Another</span>
            </button>
          </div>

          {/* Rows */}
          <div className="space-y-3.5 text-xs sm:text-sm">
            
            {/* 1. Full Name */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 flex items-center gap-2 font-medium">
                <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Full Name</span>
              </span>
              <span className="font-bold text-white text-right">
                {displayName}
              </span>
            </div>

            {/* 2. Phone Number with Copy Icon */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 flex items-center gap-2 font-medium">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Phone Number</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white">
                  {displayRawNum}
                </span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="p-1 text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors"
                  title="Copy number"
                >
                  {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* 3. Telecom Operator */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 flex items-center gap-2 font-medium">
                <Radio className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Telecom Operator</span>
              </span>
              <span className="font-bold text-cyan-400">
                {operatorName}
              </span>
            </div>

            {/* 4. Gender (নাম অনুযায়ী) */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 flex items-center gap-2 font-medium">
                <span className="text-pink-400 font-bold">⚥</span>
                <span>Gender (নাম অনুযায়ী)</span>
              </span>
              <span className="font-semibold text-slate-300">
                বায়োমেট্রিক সিম রেকর্ড (Biometric SIM)
              </span>
            </div>

            {/* 5. Telecom Circle / Region */}
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-cyan-500/10">
              <span className="text-slate-400 font-medium">Geographic Circle</span>
              <span className="font-semibold text-slate-300">
                {result.location || 'Dhaka, Bangladesh'}
              </span>
            </div>

            {/* 6. Line Status */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 font-medium">SIM Classification</span>
              <span className="font-semibold text-emerald-400">
                Active GSM (4G/LTE)
              </span>
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
