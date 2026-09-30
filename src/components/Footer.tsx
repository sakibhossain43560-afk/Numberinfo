export default function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer className={`py-6 px-4 border-t text-center text-xs transition-colors ${
      darkMode ? 'bg-[#0b0f19] border-slate-800/80 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
    }`}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 CallerID Bangladesh · All queries encrypted and private</p>
        <p>Engineered by <strong className="text-blue-500 font-bold">SAKIB HOSSAIN</strong></p>
      </div>
    </footer>
  );
}
