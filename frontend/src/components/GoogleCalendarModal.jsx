import React, { useState } from 'react';
import { X, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';

export default function GoogleCalendarModal({ wish, isOpen, onClose }) {
  if (!isOpen || !wish) return null;

  const title = encodeURIComponent(`Вшанування: ${wish.wish_title} (в пам'ять про ${wish.hero_name})`);
  const details = encodeURIComponent(
    `Бажання: ${wish.wish_title}\nГерой: ${wish.hero_name}\nПідрозділ: ${wish.military_unit || '-'}\nОпис: ${wish.wish_description}\nЛокація: ${wish.city}\n\nСтворено у просторі «Жива Пам'ять»`
  );
  const location = encodeURIComponent(wish.city);
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;

  const handleOpenGCal = () => {
    window.open(gcalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="bg-[#fafaf9] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        {/* Header */}
        <div className="bg-[#141210] text-stone-100 p-7 relative border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs tracking-wider uppercase mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Google Calendar</span>
          </div>
          <h2 className="font-serif text-2xl font-normal tracking-wide">Запланувати вчинок</h2>
          <p className="text-xs text-stone-400 mt-1 font-light">
            Призначте день для здійснення бажання в пам'ять про {wish.hero_name}
          </p>
        </div>

        {/* Content */}
        <div className="p-7 space-y-5 font-sans">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 text-xs space-y-2">
            <div className="font-serif text-lg font-medium text-stone-900">«{wish.wish_title}»</div>
            <div className="text-stone-600">Локація: <span className="font-medium text-stone-800">{wish.city}</span></div>
            <div className="text-stone-500 italic">«{wish.wish_description}»</div>
          </div>

          {/* Architecture showcase */}
          <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-700 space-y-1.5 font-light leading-relaxed">
            <div className="font-medium text-stone-900 flex items-center gap-1.5 not-italic">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span>Архітектурна інтеграція з Google Calendar:</span>
            </div>
            <p className="text-stone-600 text-[11px]">
              • <strong>OAuth 2.0 Scope:</strong> <code>calendar.events</code> із шифруванням токенів на бекенді.<br/>
              • <strong>Синхронізація:</strong> обробка змін у датах волонтера з урахуванням 5-хвилинного лагу.<br/>
              • <strong>Приватність:</strong> бекенд не має доступу до сторонніх подій користувача.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleOpenGCal}
              className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Відкрити в Google Calendar</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-100 transition"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
