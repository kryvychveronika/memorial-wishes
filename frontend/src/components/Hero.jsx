import React from 'react';
import { Compass, Flame } from 'lucide-react';

export default function Hero({ onOpenAddWish, onScrollToCatalog }) {
  return (
    <section className="relative overflow-hidden bg-[#141210] text-stone-100 py-20 sm:py-28 border-b border-stone-800">
      {/* Subtle warm glow - like a quiet flame in darkness */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(194,65,12,0.12),transparent_65%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-700/80 bg-stone-900/60 text-stone-400 text-xs font-normal mb-8 tracking-wider uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Культура вшанування пам'яті через дію</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] text-stone-100 mb-8 max-w-3xl mx-auto">
          Ми робимо те, що хотіли <span className="italic text-amber-200/90 font-light">зробити вони</span>
        </h1>

        <p className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-2xl mx-auto mb-10 font-light font-sans">
          З'їсти піцу в Римі, вперше побачити море, пробігти марафон чи подарувати книги рідній школі.
          Рідні полеглих воїнів діляться їхніми щирими людськими бажаннями. 
          Кожен із нас може взяти одне бажання, здійснити його в пам'ять про захисника та розділити цей момент із його сім'єю.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToCatalog}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-stone-100 text-stone-900 font-medium text-xs tracking-wider uppercase hover:bg-amber-100 transition shadow-sm flex items-center justify-center gap-2.5"
          >
            <Compass className="w-4 h-4 text-stone-700" />
            <span>Відкрити книгу бажань</span>
          </button>

          <button
            onClick={onOpenAddWish}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-stone-700 hover:border-stone-500 text-stone-300 font-normal text-xs tracking-wider uppercase transition"
          >
            <span>Подати історію рідного воїна</span>
          </button>
        </div>

        {/* 3 Pillars - Quiet & respectful */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-stone-800/80 text-left">
          <div className="border-l border-stone-800 pl-4">
            <span className="font-serif text-lg text-stone-200 block mb-1">Сім'я ділиться</span>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Рідні довіряють історію та нездійснене бажання захисника спільноті.
            </p>
          </div>
          <div className="border-l border-stone-800 pl-4">
            <span className="font-serif text-lg text-stone-200 block mb-1">Небайдужий втілює</span>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Один волонтер резервує бажання і присвячує свою дію пам'яті воїна.
            </p>
          </div>
          <div className="border-l border-stone-800 pl-4">
            <span className="font-serif text-lg text-stone-200 block mb-1">Пам'ять оживає</span>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Фото та слова підтримки передаються родині як знак вдячності та шани.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
