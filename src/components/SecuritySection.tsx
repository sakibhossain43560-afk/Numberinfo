import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface SecuritySectionProps {
  onStartLookup: () => void;
}

export default function SecuritySection({ onStartLookup }: SecuritySectionProps) {
  const checklist = [
    'Real-time carrier identification',
    'Spam & telemarketer fraud detection',
    'Private & anonymous lookup guarantee',
    'No registration or login required',
  ];

  return (
    <section id="security" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1428] via-[#090f1e] to-[#050812] border border-slate-800 p-8 sm:p-12 lg:p-14 shadow-2xl"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Consumer Protection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Safeguard Against{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                Unknown Scammers
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Verify incoming callers before replying or sending funds. Detect spam risk, identity spoofing, and unsolicited marketing campaigns immediately.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                onClick={onStartLookup}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Lookup an Unknown Number</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
