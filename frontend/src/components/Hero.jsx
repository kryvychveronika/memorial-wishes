import React from 'react';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ onOpenAddWish, onScrollToCatalog }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Платформа вшанування через особисті вчинки</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-none text-slate-100 mb-6">
          Перетворюємо пам'ять на <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">живу дію</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
          З'їсти піцу в Римі, побачити море, пробігти марафон чи посадити дерево. 
          Рідні діляться бажаннями, які полеглі воїни не встигли здійснити. 
          Кожен із нас може взяти одне бажання, здійснити його в пам'ять про Героя та поділитися цим із сім'єю.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToCatalog}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Обрати бажання в каталозі</span>
          </button>

          <button
            onClick={onOpenAddWish}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition flex items-center justify-center gap-2"
          >
            <span>Я родич / побратим: подати бажання</span>
          </button>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-10 border-t border-slate-800/80 text-left">
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
            <span className="text-amber-400 font-bold text-sm block mb-1">1. Родина ділиться</span>
            <p className="text-xs text-slate-400">Близькі захисника публікують його мрію та коротку історію.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
            <span className="text-amber-400 font-bold text-sm block mb-1">2. Волонтер виконує</span>
            <p className="text-xs text-slate-400">Оберіть мрію, забронюйте її, щоб уникнути дублювання, та втіліть у життя.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
            <span className="text-amber-400 font-bold text-sm block mb-1">3. Звіт для родини</span>
            <p className="text-xs text-slate-400">Надішліть фото та слова підтримки. Сім'я знає, що пам'ять живе.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
