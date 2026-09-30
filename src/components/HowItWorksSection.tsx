import { motion } from 'motion/react';
import { Search, Cpu, FileCheck } from 'lucide-react';

interface HowItWorksSectionProps {
  darkMode: boolean;
}

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Query Number',
    description: 'Enter any 11-digit Bangladesh mobile number or international phone number.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Interrogate Telecom Cache',
    description: 'Our engine queries telecom operator prefixes, spam records, and public registries.',
  },
  {
    step: '03',
    icon: FileCheck,
    title: 'Instant Identity Dossier',
    description: 'Review the verified subscriber name, operator, circle, and security safety score.',
  },
];

export default function HowItWorksSection({ darkMode }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className={`py-16 sm:py-24 transition-colors ${darkMode ? 'bg-[#080d1a]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            How It <span className="text-blue-500">Works</span>
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Three straightforward steps to identify unknown callers.
          </p>
        </div>

        {/* 3 Steps Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className={`relative p-8 rounded-2xl border transition-all duration-200 ${
                  darkMode
                    ? 'bg-[#0b1224] border-slate-800 shadow-lg'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    STEP {s.step}
                  </span>
                  <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className={`text-xl font-bold tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {s.title}
                </h3>

                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
