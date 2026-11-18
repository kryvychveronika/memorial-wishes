import React, { useState } from 'react';
import { X, CheckCircle2, Camera, Send } from 'lucide-react';

export default function ReportModal({ wish, isOpen, onClose, onSubmit }) {
  const [reportText, setReportText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !wish) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportText.trim()) {
      setError('Будь ласка, напишіть про те, як ви виконали бажання.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSubmit(wish.id, reportText, photoUrl);
      onClose();
    } catch (err) {
      setError(err.message || 'Помилка при надсиланні звіту');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-medium mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Вшанування виконано</span>
          </div>
          <h2 className="text-xl font-bold">Звіт про виконання бажання</h2>
          <p className="text-xs text-slate-300 mt-1 line-clamp-1">
            {wish.wish_title} (в пам'ять про {wish.hero_name})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Як пройшло виконання? Розкажіть ваші враження *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Опишіть, як ви здійснили цю мрію, ваші думки, почуття та слова для родини захисника..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Посилання на фото-підтвердження (URL)
            </label>
            <div className="relative">
              <Camera className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://... (фото піци, фінішу, моря, книги тощо)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Збереження...' : 'Надіслати звіт родині'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
