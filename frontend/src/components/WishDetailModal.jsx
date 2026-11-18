import React from 'react';
import { X, MapPin, Tag, Calendar, Flame, Check, ArrowRight } from 'lucide-react';

export default function WishDetailModal({ wish, onClose, onClaim, onOpenReport, onUnclaim, onOpenCalendar, currentUser }) {
  if (!wish) return null;

  const isClaimedByMe = currentUser && wish.claimed_by === currentUser.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fafaf9] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        {/* Header with Hero Portrait */}
        <div className="relative h-72 sm:h-80 bg-stone-950">
          <img
            src={wish.photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'}
            alt={wish.hero_name}
            className="w-full h-full object-cover grayscale contrast-105 opacity-90"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-stone-300 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Bio on Photo */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 rounded-full text-xs font-normal tracking-wider uppercase bg-stone-800/80 text-amber-200 border border-stone-700/80 inline-block mb-3">
              {wish.status === 'approved' && 'Очікує вшанування'}
              {wish.status === 'claimed' && 'Зараз у роботі'}
              {wish.status === 'completed' && 'Бажання здійснено'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">
              {wish.hero_name}
            </h2>
            {wish.military_unit && (
              <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 opacity-80">
                {wish.military_unit}
              </p>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-20rem)] overflow-y-auto">
          {/* Wish Box - Editorial Paper Frame */}
          <div className="bg-stone-100/70 border border-stone-200 rounded-2xl p-6">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-800 block mb-1">
              Нездійснена мрія захисника:
            </span>
            <h3 className="font-serif text-2xl font-normal text-stone-900 mb-3 leading-snug">
              «{wish.wish_title}»
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed font-light">
              {wish.wish_description}
            </p>

            <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-stone-200/80 text-xs text-stone-600 font-light">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {wish.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-stone-400" />
                {wish.category}
              </span>
              <span>
                {wish.difficulty === 'free' ? 'Складність: Безкоштовно / Символічно' : 'Складність: Потребує витрат'}
              </span>
            </div>
          </div>

          {/* Hero Story */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Про життя та особистість захисника
            </h4>
            <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-white p-5 rounded-2xl border border-stone-200 font-light">
              {wish.hero_story}
            </div>
          </div>

          {/* Submission Note */}
          <div className="text-xs text-stone-500 border-l border-stone-300 pl-3 italic">
            Подано: <strong className="text-stone-700 not-italic">{wish.submitted_by_name}</strong>. Згода родини на вшанування пам'яті підтверджена.
          </div>

          {/* Completed Report section */}
          {wish.status === 'completed' && wish.report && (
            <div className="bg-stone-100 border border-stone-300 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-stone-800 font-medium text-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Звіт про виконання від волонтера ({wish.report.volunteer_name})</span>
              </div>
              <p className="font-serif text-base text-stone-800 leading-relaxed italic">
                «{wish.report.report_text}»
              </p>
              {wish.report.report_photo_url && (
                <div className="mt-4 rounded-xl overflow-hidden border border-stone-200">
                  <img
                    src={wish.report.report_photo_url}
                    alt="Звіт виконання"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
            {wish.status === 'approved' && (
              <button
                onClick={() => onClaim(wish)}
                className="flex-1 py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Я виконаю це бажання</span>
              </button>
            )}

            {wish.status === 'claimed' && isClaimedByMe && (
              <>
                <button
                  onClick={() => onOpenReport(wish)}
                  className="flex-1 py-3 px-6 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Подати звіт для родини</span>
                </button>
                <button
                  onClick={() => onUnclaim(wish)}
                  className="py-3 px-4 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 text-xs font-light transition"
                >
                  Повернути до каталогу
                </button>
              </>
            )}

            <button
              onClick={() => onOpenCalendar(wish)}
              className="py-3 px-4 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-normal flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>Запланувати в календарі</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
