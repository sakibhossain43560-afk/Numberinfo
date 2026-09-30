import { motion } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';

interface PrivacyBannerProps {
  onTryNow: () => void;
}

export default function PrivacyBanner({ onTryNow }: PrivacyBannerProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#0b1224] border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Strict Zero-Log Privacy
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mt-0.5">
                We never store your search queries, phone logs, or identity on remote servers.
              </p>
            </div>
          </div>

          <button
            onClick={onTryNow}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>Search A Number</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
