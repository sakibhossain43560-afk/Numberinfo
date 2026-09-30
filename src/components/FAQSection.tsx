import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  darkMode: boolean;
}

const FAQS = [
  {
    q: 'How does this Caller ID tool identify unknown callers?',
    a: 'We query live telecommunication network registries, verified caller datasets, and community spam lists in real time to present you with the registered subscriber name and operator details.',
  },
  {
    q: 'Is my phone number or search history saved?',
    a: 'No. We operate a strict zero-log policy. Your searches are processed entirely in memory via secure encrypted TLS channels and never stored on remote database servers.',
  },
  {
    q: 'Which Bangladeshi networks are supported?',
    a: 'We support 100% of Bangladeshi mobile operators: Grameenphone (017, 013), Robi Axiata (018), Banglalink (019, 014), Teletalk (015), and Airtel (016).',
  },
  {
    q: 'Can I check international numbers outside Bangladesh?',
    a: 'Yes, international dialing codes are supported, including India (+91), United States (+1), United Kingdom (+44), UAE (+971), and Saudi Arabia (+966).',
  },
  {
    q: 'How are spam warnings determined?',
    a: 'Spam scores are calculated using algorithmic threat detection, known telemarketer lists, and real-time community reports to warn you against potential financial fraud and nuisance calls.',
  },
];

export default function FAQSection({ darkMode }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={`py-16 sm:py-24 transition-colors border-t ${
      darkMode ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Answers to Common <span className="text-blue-500">Questions</span>
          </h2>
          <p className={`mt-3 text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Everything you need to know about phone lookups, operator data, and privacy.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  darkMode ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg cursor-pointer ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base leading-relaxed border-t pt-4 ${
                    darkMode ? 'border-slate-800/80 text-slate-300' : 'border-slate-100 text-slate-600'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
