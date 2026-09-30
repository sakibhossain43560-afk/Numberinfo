import { History, X } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (num: string) => void;
  onClear: () => void;
}

export default function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="mt-4 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs">
      <span className="text-slate-500 flex items-center gap-1">
        <History className="w-3.5 h-3.5" /> সাম্প্রতিক:
      </span>
      {searches.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onSelect(num)}
          className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800/80 transition-colors cursor-pointer font-mono"
        >
          {num}
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="p-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        title="হিস্ট্রি মুছে ফেলুন"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
