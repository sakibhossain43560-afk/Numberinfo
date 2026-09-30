import { motion } from 'motion/react';
import { UserCheck, ShieldCheck, Radio, Lock } from 'lucide-react';

interface FeaturesSectionProps {
  darkMode: boolean;
}

export default function FeaturesSection({ darkMode }: FeaturesSectionProps) {
  return (
    <section id="features" className={`py-16 sm:py-24 transition-colors ${darkMode ? 'bg-[#0b0f19]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Core Capabilities
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Designed for Speed, Accuracy, and Privacy.
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Everything you need to identify unknown callers, verify mobile networks, and protect against phone scams.
          </p>
        </div>

        {/* Unified Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento Card 1: Dominant Caller Identification (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className={`md:col-span-7 p-7 sm:p-9 rounded-3xl border flex flex-col justify-between transition-all ${
              darkMode
                ? 'bg-[#111827] border-slate-800 hover:border-slate-700 shadow-xl'
                : 'bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-6">
                <UserCheck className="w-6 h-6" />
              </div>

              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Real-Time Caller Identity
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Interrogate live telecom records and true caller registries to unveil the actual subscriber name before you answer or return an unknown call.
              </p>
            </div>

            {/* Visual Micro-Card Preview */}
            <div className={`mt-8 p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              darkMode ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 font-black text-sm flex items-center justify-center shrink-0">
                  KI
                </div>
                <div>
                  <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Kasha Islam</div>
                  <div className="text-xs text-slate-400 font-mono">+880 1713 000000 · Grameenphone</div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                Verified
              </span>
            </div>
          </motion.div>

          {/* Bento Card 2: Spam & Threat Defense (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className={`md:col-span-5 p-7 sm:p-9 rounded-3xl border flex flex-col justify-between transition-all ${
              darkMode
                ? 'bg-[#111827] border-slate-800 hover:border-slate-700 shadow-xl'
                : 'bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Spam & Fraud Defense
              </h3>

              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Cross-reference community complaint logs, robocall patterns, and financial fraud reports to flag malicious callers instantly.
              </p>
            </div>

            <div className={`mt-8 p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
              darkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
            }`}>
              <span className="font-semibold">Reputation Audit</span>
              <span className="font-bold text-emerald-500">0 Reports · Clean Record</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Zero-Log Privacy (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className={`md:col-span-5 p-7 sm:p-9 rounded-3xl border flex flex-col justify-between transition-all ${
              darkMode
                ? 'bg-[#111827] border-slate-800 hover:border-slate-700 shadow-xl'
                : 'bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6">
                <Lock className="w-6 h-6" />
              </div>

              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Zero-Log Privacy Guarantee
              </h3>

              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Your queries stay entirely private. Searches are executed over encrypted TLS channels and never persisted on our backend servers.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>No Account or Registration Required</span>
            </div>
          </motion.div>

          {/* Bento Card 4: Telecom Carrier Detection (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className={`md:col-span-7 p-7 sm:p-9 rounded-3xl border flex flex-col justify-between transition-all ${
              darkMode
                ? 'bg-[#111827] border-slate-800 hover:border-slate-700 shadow-xl'
                : 'bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mb-6">
                <Radio className="w-6 h-6" />
              </div>

              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Full Bangladesh Operator Coverage
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Instant prefix detection and network verification for Grameenphone, Robi Axiata, Banglalink, Teletalk, and Airtel.
              </p>
            </div>

            {/* Operator Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 text-xs font-bold font-mono">
                GP (017, 013)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold font-mono">
                Robi (018)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold font-mono">
                Banglalink (019, 014)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold font-mono">
                Teletalk (015)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold font-mono">
                Airtel (016)
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
