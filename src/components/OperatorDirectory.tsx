import { motion } from 'motion/react';
import { Radio, ArrowRight, ShieldCheck } from 'lucide-react';

interface OperatorDirectoryProps {
  darkMode: boolean;
  onSelectNumber: (num: string) => void;
}

const OPERATORS = [
  {
    name: 'Grameenphone',
    company: 'Telenor Group',
    prefixes: ['017', '013'],
    coverage: '4G LTE / 5G Ready',
    subscribers: '83M+ Subscribers',
    color: '#0284c7',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    demoNum: '01713000000',
    badge: 'Market Leader',
  },
  {
    name: 'Robi Axiata',
    company: 'Axiata Group',
    prefixes: ['018'],
    coverage: '4.5G SuperNet',
    subscribers: '58M+ Subscribers',
    color: '#e11d48',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    demoNum: '01819210000',
    badge: 'Nationwide 4.5G',
  },
  {
    name: 'Banglalink',
    company: 'VEON Ltd',
    prefixes: ['019', '014'],
    coverage: '4G Fastest Network',
    subscribers: '42M+ Subscribers',
    color: '#ea580c',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    demoNum: '01911000000',
    badge: 'Fastest 4G Speed',
  },
  {
    name: 'Teletalk Bangladesh',
    company: 'State-Owned (Govt)',
    prefixes: ['015'],
    coverage: '3G / 4G Public Telco',
    subscribers: '6.5M+ Subscribers',
    color: '#059669',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    demoNum: '01552000000',
    badge: 'National Telco',
  },
  {
    name: 'Airtel Bangladesh',
    company: 'Robi Axiata Brand',
    prefixes: ['016'],
    coverage: '4G LTE Youth Brand',
    subscribers: 'Youth Brand',
    color: '#dc2626',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    demoNum: '01678123456',
    badge: 'Airtel Network',
  },
];

export default function OperatorDirectory({ darkMode, onSelectNumber }: OperatorDirectoryProps) {
  return (
    <section id="networks" className={`py-16 sm:py-24 transition-colors border-y ${
      darkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3">
            <Radio className="w-3.5 h-3.5" /> Full Telecom Coverage
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Supported Mobile Operators
          </h2>
          <p className={`mt-2.5 text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Direct carrier identification and subscriber profile verification for all Bangladeshi cellular operators.
          </p>
        </div>

        {/* 5 Operators Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {OPERATORS.map((op, idx) => (
            <motion.div
              key={op.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                darkMode
                  ? 'bg-[#111827] border-slate-800 hover:border-slate-700 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${op.badgeColor}`}>
                    {op.badge}
                  </span>
                  <Radio className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className={`text-base font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {op.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{op.company}</p>

                {/* Number prefixes */}
                <div className="flex items-center gap-1.5 mb-3">
                  {op.prefixes.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 font-mono font-bold text-xs border border-blue-500/20"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-400">
                  {op.coverage} · {op.subscribers}
                </p>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => onSelectNumber(op.demoNum)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Test Prefix</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
