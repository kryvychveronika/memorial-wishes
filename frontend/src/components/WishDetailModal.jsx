import React from 'react';
import { X, MapPin, Tag, Calendar, HeartHandshake, CheckCircle2, User, Share2, ArrowLeft } from 'lucide-react';

export default function WishDetailModal({ wish, onClose, onClaim, onOpenReport, onUnclaim, onOpenCalendar, currentUser }) {
  if (!wish) return null;

  const isClaimedByMe = currentUser && wish.claimed_by === currentUser.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 bg-slate-900">
          <img
            src={wish.photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'}
            alt={wish.hero_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Bio in Header */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 inline-block mb-2">
              {wish.status === 'approved' && 'Очікує волонтера'}
              {wish.status === 'claimed' && 'В процесі виконання'}
              {wish.status === 'completed' && 'Бажання виконано'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {wish.hero_name}
            </h2>
            {wish.military_unit && (
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                {wish.military_unit}
              </p>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          {/* Wish Box */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Нездійснена мрія захисника:
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {wish.wish_title}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-light">
              {wish.wish_description}
            </p>

            <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-amber-200/60 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {wish.city}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                {wish.category}
              </span>
              <span className="font-medium">
                {wish.difficulty === 'free' ? 'Складність: Безкоштовно / Символічно' : 'Складність: Потребує витрат'}
              </span>
            </div>
          </div>

          {/* Hero Story */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Про життя та службу захисника
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
              {wish.hero_story}
            </p>
          </div>

          {/* Family Submission Note */}
          <div className="text-xs text-slate-500 border-l-2 border-slate-300 pl-3">
            Подано: <strong className="text-slate-700">{wish.submitted_by_name}</strong>. Згода родини на вшанування отримана.
          </div>

          {/* Completed Report section if completed */}
          {wish.status === 'completed' && wish.report && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Звіт про виконання від волонтера ({wish.report.volunteer_name})</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                «{wish.report.report_text}»
              </p>
              {wish.report.report_photo_url && (
                <div className="mt-3 rounded-xl overflow-hidden border border-emerald-200">
                  <img
                    src={wish.report.report_photo_url}
                    alt="Звіт виконання"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions & Calendar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            {wish.status === 'approved' && (
              <button
                onClick={() => onClaim(wish)}
                className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Я виконаю це бажання</span>
              </button>
            )}

            {wish.status === 'claimed' && isClaimedByMe && (
              <>
                <button
                  onClick={() => onOpenReport(wish)}
                  className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Подати звіт про виконання</span>
                </button>
                <button
                  onClick={() => onUnclaim(wish)}
                  className="py-3 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition"
                >
                  Повернути до каталогу
                </button>
              </>
            )}

            {/* Google Calendar Sync Button */}
            <button
              onClick={() => onOpenCalendar(wish)}
              className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Додати в Google Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
