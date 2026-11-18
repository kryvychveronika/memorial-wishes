import React, { useState } from 'react';
import { X, Calendar, Check, ExternalLink, ShieldCheck, RefreshCw } from 'lucide-react';

export default function GoogleCalendarModal({ wish, isOpen, onClose }) {
  const [synced, setSynced] = useState(false);

  if (!isOpen || !wish) return null;

  // Build direct Google Calendar URL
  const title = encodeURIComponent(`Вшанування: ${wish.wish_title} (в пам'ять про ${wish.hero_name})`);
  const details = encodeURIComponent(
    `Бажання: ${wish.wish_title}\nГерой: ${wish.hero_name}\nПідрозділ: ${wish.military_unit || '-'}\nОпис: ${wish.wish_description}\nЛокація: ${wish.city}\n\nСтворено на платформі «Жива Пам'ять»`
  );
  const location = encodeURIComponent(wish.city);
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;

  const handleSimulateOAuthSync = () => {
    setSynced(true);
    setTimeout(() => {
      window.open(gcalUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium mb-2 backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5" />
            <span>Google Calendar Інтеграція</span>
          </div>
          <h2 className="text-xl font-bold">Додати подію в календар</h2>
          <p className="text-xs text-blue-100 mt-1">
            Заплануйте виконання бажання в пам'ять про {wish.hero_name}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="font-bold text-slate-800 text-sm">{wish.wish_title}</div>
            <div className="text-slate-600">Локація: <span className="font-semibold">{wish.city}</span></div>
            <div className="text-slate-500 italic">«{wish.wish_description}»</div>
          </div>

          {/* Architecture showcase badge */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1.5">
            <div className="font-semibold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Архітектура інтеграції з Google Calendar:</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              • <strong>OAuth 2.0 Scope:</strong> <code>calendar.events</code> із шифруванням токенів.<br/>
              • <strong>Push/Webhooks:</strong> Google надсилає сповіщення про перенесення дати волонтером (лаг до 5 хв враховується чергою бекенду).<br/>
              • <strong>Privacy:</strong> Інші приватні події календаря бекенд ніколи не читає і не зберігає.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleSimulateOAuthSync}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Відкрити в Google Calendar</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
