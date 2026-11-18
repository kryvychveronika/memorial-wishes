import React from 'react';
import { MapPin, Tag, Check, Flame } from 'lucide-react';

const CATEGORY_NAMES = {
  travel: 'Подорожі',
  sport: 'Спорт',
  food: 'Смак та затишок',
  culture: 'Культура',
  family: 'Родина',
  other: 'Бажання',
};

export default function WishCard({ wish, onSelect, onClaim, currentUser }) {
  const isClaimedByMe = currentUser && wish.claimed_by === currentUser.id;

  return (
    <article className="bg-white rounded-2xl border border-stone-200/90 hover:border-stone-400/80 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col overflow-hidden group">
      {/* Top Portrait Image */}
      <div className="relative h-60 bg-stone-900 overflow-hidden">
        <img
          src={wish.photo_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500'}
          alt={wish.hero_name}
          className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-102 transition duration-700 ease-out opacity-90 group-hover:opacity-100"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* State Badge */}
        <div className="absolute top-3.5 right-3.5">
          {wish.status === 'approved' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-stone-900/80 text-amber-200 border border-stone-700/80 backdrop-blur-sm shadow-xs">
              Очікує вшанування
            </span>
          )}
          {wish.status === 'claimed' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-amber-950/90 text-amber-300 border border-amber-800/80 backdrop-blur-sm shadow-xs">
              Зараз у роботі
            </span>
          )}
          {wish.status === 'completed' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-stone-800/90 text-stone-200 border border-stone-600/80 backdrop-blur-sm shadow-xs flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Здійснено</span>
            </span>
          )}
        </div>

        {/* Hero Name with Cormorant Garamond */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-serif text-2xl font-normal tracking-wide leading-tight drop-shadow-xs">
            {wish.hero_name}
          </h3>
          {wish.military_unit && (
            <p className="text-xs text-stone-300 line-clamp-1 font-light opacity-80 mt-0.5">
              {wish.military_unit}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Wish Title in Serif */}
          <div className="mb-3">
            <span className="text-[10px] font-medium uppercase tracking-widest text-amber-800/80 block mb-1">
              Нездійснена мрія:
            </span>
            <h4 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition leading-snug">
              «{wish.wish_title}»
            </h4>
          </div>

          {/* Description Excerpt */}
          <p className="text-xs text-stone-600 line-clamp-3 mb-5 leading-relaxed font-light">
            {wish.wish_description}
          </p>
        </div>

        <div>
          {/* Location & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-stone-500 font-light">
            <span className="inline-flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-md">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span className="truncate max-w-[120px]">{wish.city}</span>
            </span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-md">
              {CATEGORY_NAMES[wish.category] || wish.category}
            </span>
            <span className={`px-2.5 py-1 rounded-md ${
              wish.difficulty === 'free' ? 'text-stone-700 font-normal' : 'text-stone-600'
            }`}>
              {wish.difficulty === 'free' ? 'Безкоштовно' : 'Витрати'}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
            <button
              onClick={() => onSelect(wish)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 transition text-center"
            >
              Читати історію
            </button>

            {wish.status === 'approved' && (
              <button
                onClick={() => onClaim(wish)}
                className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs transition shadow-xs flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Я виконаю</span>
              </button>
            )}

            {wish.status === 'claimed' && isClaimedByMe && (
              <button
                onClick={() => onSelect(wish)}
                className="py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-medium text-xs transition shadow-xs"
              >
                Звіт
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
