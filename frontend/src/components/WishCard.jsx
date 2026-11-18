import React from 'react';
import { MapPin, Tag, CheckCircle2, Clock, User, HeartHandshake } from 'lucide-react';

const CATEGORY_NAMES = {
  travel: 'Подорожі',
  sport: 'Спорт',
  food: 'Їжа / Кафе',
  culture: 'Культура',
  family: 'Сім\'я',
  other: 'Інше',
};

export default function WishCard({ wish, onSelect, onClaim, currentUser }) {
  const isClaimedByMe = currentUser && wish.claimed_by === currentUser.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex flex-col overflow-hidden group">
      {/* Top Image & Badge */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={wish.photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
          alt={wish.hero_name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {wish.status === 'approved' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm shadow-sm">
              Очікує волонтера
            </span>
          )}
          {wish.status === 'claimed' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white backdrop-blur-sm shadow-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>В роботі</span>
            </span>
          )}
          {wish.status === 'completed' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-sm shadow-sm flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Виконано</span>
            </span>
          )}
        </div>

        {/* Hero Name overlay on photo */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-base tracking-tight leading-snug drop-shadow-sm">
            {wish.hero_name}
          </h3>
          {wish.military_unit && (
            <p className="text-xs text-slate-200 line-clamp-1 font-light opacity-90">
              {wish.military_unit}
            </p>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Wish Title */}
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block mb-1">
              Нездійснене бажання:
            </span>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition">
              {wish.wish_title}
            </h4>
          </div>

          {/* Description Excerpt */}
          <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {wish.wish_description}
          </p>
        </div>

        {/* Meta Pills & Button */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[110px]">{wish.city}</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
              <Tag className="w-3 h-3 text-slate-400" />
              <span>{CATEGORY_NAMES[wish.category] || wish.category}</span>
            </span>
            <span className={`px-2 py-0.5 rounded-md font-medium ${
              wish.difficulty === 'free' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {wish.difficulty === 'free' ? 'Безкоштовно' : 'Витрати'}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={() => onSelect(wish)}
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition text-center"
            >
              Читати історію
            </button>

            {wish.status === 'approved' && (
              <button
                onClick={() => onClaim(wish)}
                className="py-2 px-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-sm flex items-center gap-1.5"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Я виконаю</span>
              </button>
            )}

            {wish.status === 'claimed' && isClaimedByMe && (
              <button
                onClick={() => onSelect(wish)}
                className="py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-sm"
              >
                Звіт
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
