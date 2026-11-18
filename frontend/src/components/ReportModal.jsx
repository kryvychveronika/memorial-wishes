import React, { useState } from 'react';
import { X, Check, Camera, Send } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="bg-[#fafaf9] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        <div className="bg-[#141210] text-stone-100 p-7 relative border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-amber-300 text-xs tracking-wider uppercase mb-2">
            <Check className="w-3.5 h-3.5" />
            <span>Вшанування здійснено</span>
          </div>
          <h2 className="font-serif text-2xl font-normal tracking-wide">Слова пам'яті для родини</h2>
          <p className="text-xs text-stone-400 mt-1 line-clamp-1 font-light">
            Бажання: «{wish.wish_title}» (в пам'ять про {wish.hero_name})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-5 font-sans">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Як пройшло виконання? Ваші враження та слова шани родині *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Опишіть, як ви здійснили це бажання, ваші почуття, думки та слова тепла для родини захисника..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Посилання на фотографію-підтвердження (URL)
            </label>
            <div className="relative">
              <Camera className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://... (фото книги, прапора, фінішу, моря тощо)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-100 transition"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{loading ? 'Збереження...' : 'Передати родині'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
