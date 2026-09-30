/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import type { NumberInfoResult, NumberInfoResponse } from './types';
import SearchPage from './components/SearchPage';
import ResultPage from './components/ResultPage';
import { resolveClientSideNumber } from './utils/telecomResolver';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'search' | 'result'>('search');
  const [activeResult, setActiveResult] = useState<NumberInfoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const executeLookup = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Clean digits if it's a phone number
    const cleanNum = trimmed.replace(/\D/g, '');
    if (cleanNum.length < 5 && isNaN(Number(trimmed))) {
      setErrorToast('Please enter a valid phone number or Facebook UID');
      setTimeout(() => setErrorToast(null), 3500);
      return;
    }

    setLoading(true);
    setErrorToast(null);

    try {
      const response = await fetch(`/api/lookup?mobile=${encodeURIComponent(cleanNum || trimmed)}`);
      const responseText = await response.text();
      let data: NumberInfoResponse | null = null;

      try {
        data = JSON.parse(responseText);
      } catch {
        // If server returns HTML (e.g. static hosting on Vercel without SSR),
        // we safely catch it instead of throwing "Unexpected token <"
        data = null;
      }

      if (data && data.results && data.results.length > 0) {
        const found = data.results[0];
        setActiveResult(found);
        setCurrentView('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Resilient fallback to telecom registry resolver
        const fallbackResult = resolveClientSideNumber(cleanNum || trimmed);
        setActiveResult(fallbackResult);
        setCurrentView('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      // Offline or network error fallback
      const fallbackResult = resolveClientSideNumber(cleanNum || trimmed);
      setActiveResult(fallbackResult);
      setCurrentView('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Global Error Toast */}
      {errorToast && (
        <div className="fixed top-5 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0f172a] border border-rose-500/50 text-rose-200 text-xs sm:text-sm shadow-[0_0_25px_rgba(244,63,94,0.3)] backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorToast}</span>
          </div>
        </div>
      )}

      {/* Cyber Glowing Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060b18]/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="p-8 rounded-3xl bg-[#0b1328] border border-cyan-500/40 shadow-[0_0_40px_rgba(0,212,255,0.25)] flex flex-col items-center gap-4 text-center max-w-xs mx-4">
            <div className="relative w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Searching Records...</h3>
              <p className="text-xs text-cyan-300/80 mt-1">Interrogating live database & telecom registers</p>
            </div>
          </div>
        </div>
      )}

      {/* 2-View Router (Search / Result) Matching Screenshots */}
      <AnimatePresence mode="wait">
        {currentView === 'search' ? (
          <motion.div
            key="search-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <SearchPage onSearch={executeLookup} loading={loading} />
          </motion.div>
        ) : activeResult ? (
          <motion.div
            key="result-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <ResultPage
              result={activeResult}
              onBackToSearch={() => {
                setCurrentView('search');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

    </div>
  );
}
