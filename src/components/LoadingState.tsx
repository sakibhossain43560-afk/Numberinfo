import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ mobile }: { mobile: string }) {
  const cleanDigits = mobile.replace(/\D/g, '');
  const formatted = cleanDigits.startsWith('880')
    ? `+880 ${cleanDigits.slice(3, 7)}-${cleanDigits.slice(7)}`
    : cleanDigits.startsWith('01')
    ? `+880 ${cleanDigits.slice(1, 5)}-${cleanDigits.slice(5)}`
    : mobile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-md mx-auto py-10 px-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center flex flex-col items-center justify-center"
    >
      <div className="relative mb-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>

      <h3 className="text-base font-semibold text-white mb-1">
        তথ্য অনুসন্ধান করা হচ্ছে...
      </h3>

      <p className="text-sm font-mono text-slate-400">
        {formatted}
      </p>

      <div className="flex items-center gap-1.5 mt-4 text-xs text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>LookupNow & Truecaller ডেটাবেজ চেক করা হচ্ছে</span>
      </div>
    </motion.div>
  );
}
