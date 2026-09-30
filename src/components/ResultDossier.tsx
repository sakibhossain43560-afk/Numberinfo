import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Phone,
  Radio,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  PhoneCall,
  MessageCircle,
  Send,
  Building,
  Info,
} from 'lucide-react';
import type { NumberInfoResult } from '../types';

interface ResultDossierProps {
  result: NumberInfoResult;
}

export default function ResultDossier({ result }: ResultDossierProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const cleanDigits = result.mobile.replace(/\D/g, '');
  const bdLocalNum = cleanDigits.startsWith('880')
    ? '0' + cleanDigits.slice(3)
    : cleanDigits.length === 10 && cleanDigits.startsWith('1')
    ? '0' + cleanDigits
    : cleanDigits;

  const intlFormatted = cleanDigits.startsWith('880')
    ? `+880 ${cleanDigits.slice(3, 7)}-${cleanDigits.slice(7)}`
    : `+880 ${bdLocalNum.slice(1, 5)}-${bdLocalNum.slice(5)}`;

  const localFormatted = `${bdLocalNum.slice(0, 5)}-${bdLocalNum.slice(5)}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const op = result.operatorInfo || {
    operator: result.carrier || 'Bangladesh Telecom',
    shortName: 'BD Telecom',
    circle: 'Bangladesh 🇧🇩',
    color: '#10b981',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    type: '4G LTE Cellular',
  };

  const handleCopyAll = () => {
    const summary = `কলার তথ্য:
নাম: ${result.name}
মোবাইল: ${intlFormatted} (${localFormatted})
অপারেটর: ${op.operator}
নেটওয়ার্ক: ${op.type}
দেশ: বাংলাদেশ 🇧🇩`;
    navigator.clipboard.writeText(summary);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-2xl mx-auto bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-sm"
    >
      {/* Top clean operator accent line */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: op.color }}
      />

      {/* Main Header with Caller Name and Identity */}
      <div className="p-6 sm:p-7 border-b border-slate-800/80">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Caller Avatar */}
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: `${op.color}15`,
                borderColor: `${op.color}30`,
                color: op.color,
              }}
            >
              <User className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {result.isFallbackRegistry ? 'টেলিকম রেজিস্ট্রি' : 'ভেরিফাইড কলার'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">{op.shortName}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{result.name || 'Unknown Caller'}</span>
                <button
                  onClick={() => copyToClipboard(result.name, 'Name')}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  title="নাম কপি করুন"
                >
                  {copiedKey === 'Name' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </h2>

              <p className="text-sm font-mono text-slate-400 mt-1">
                {intlFormatted} <span className="text-slate-600">({localFormatted})</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAll}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer shrink-0"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>সম্পূর্ণ তথ্য কপি</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Contact Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800/60">
          <a
            href={`tel:${bdLocalNum}`}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>সরাসরি কল</span>
          </a>

          <a
            href={`https://wa.me/88${bdLocalNum}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-medium border border-emerald-500/30 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>হোয়াটসঅ্যাপ</span>
          </a>

          <a
            href={`sms:${bdLocalNum}`}
            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-slate-400" />
            <span>এসএমএস</span>
          </a>
        </div>
      </div>

      {/* Details Grid */}
      <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mobile Number Details */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-1">মোবাইল নম্বর</span>
            <span className="text-base font-mono font-bold text-white tracking-wide">{intlFormatted}</span>
            <span className="text-xs text-slate-400 block mt-0.5">লোকাল: {localFormatted}</span>
          </div>
          <button
            onClick={() => copyToClipboard(bdLocalNum, 'NumOnly')}
            className="text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
            title="নম্বর কপি করুন"
          >
            {copiedKey === 'NumOnly' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Operator Details */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80">
          <span className="text-xs text-slate-400 font-medium block mb-1">সিম অপারেটর</span>
          <span
            className="text-base font-bold tracking-wide"
            style={{ color: op.color }}
          >
            {op.operator}
          </span>
          <span className="text-xs text-slate-400 block mt-0.5">{op.type}</span>
        </div>

        {/* Country & Jurisdiction */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 sm:col-span-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇧🇩</span>
            <div>
              <span className="text-xs text-slate-400 font-medium block">দেশ ও নেটওয়ার্ক</span>
              <span className="text-sm font-semibold text-slate-200">
                বাংলাদেশ (BTRC টেলিকম নেটওয়ার্ক)
              </span>
            </div>
          </div>
          <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-md">
            +880
          </div>
        </div>
      </div>

      {/* Copy All Mobile View Button */}
      <div className="sm:hidden px-6 pb-6">
        <button
          onClick={handleCopyAll}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer"
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>সম্পূর্ণ তথ্য কপি হয়েছে</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>সম্পূর্ণ তথ্য কপি করুন</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
