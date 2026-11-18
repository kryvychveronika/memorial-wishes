import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Sparkles, Send } from 'lucide-react';

export default function AddWishModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    hero_name: '',
    photo_url: '',
    military_unit: '',
    hero_story: '',
    wish_title: '',
    wish_description: '',
    city: 'Київ',
    category: 'travel',
    difficulty: 'free',
    submitted_by_name: '',
    submitted_by_email: '',
    family_consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hero_name || !formData.wish_title || !formData.wish_description || !formData.submitted_by_name) {
      setError('Будь ласка, заповніть обов\'язкові поля.');
      return;
    }
    if (!formData.family_consent) {
      setError('Згода родини є обов\'язковою для публікації.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Помилка при збереженні');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-medium mb-2">
            <Heart className="w-3.5 h-3.5 fill-amber-300" />
            <span>Для родин та побратимів полеглих захисників</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Подати бажання захисника</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Розкажіть про мрію воїна, яку він не встиг втілити. Волонтери допоможуть її здійснити в його пам'ять.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[calc(85vh-10rem)] overflow-y-auto">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {/* Section: Hero */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Інформація про захисника
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ім'я та позивний *
                </label>
                <input
                  type="text"
                  required
                  placeholder="напр., Андрій «Сармат» Коваль"
                  value={formData.hero_name}
                  onChange={(e) => setFormData({ ...formData, hero_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Підрозділ / Бригада
                </label>
                <input
                  type="text"
                  placeholder="напр., 93-тя ОМБр Холодний Яр"
                  value={formData.military_unit}
                  onChange={(e) => setFormData({ ...formData, military_unit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Посилання на фото (URL)
              </label>
              <input
                type="url"
                placeholder="https://... (залиште порожнім, якщо немає прямого посилання)"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Коротка історія про захисника *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Ким був у цивільному житті, що любив, яким запам'ятався рідним та друзям..."
                value={formData.hero_story}
                onChange={(e) => setFormData({ ...formData, hero_story: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Section: Wish */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              2. Мрія / Бажання
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Назва бажання *
              </label>
              <input
                type="text"
                required
                placeholder="напр., З'їсти піцу в Римі / Побачити гори / Пробігти півмарафон"
                value={formData.wish_title}
                onChange={(e) => setFormData({ ...formData, wish_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Детальний опис бажання *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Чому це було важливо для воїна? Що саме потрібно зробити волонтеру?"
                value={formData.wish_description}
                onChange={(e) => setFormData({ ...formData, wish_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Місто / Локація
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Категорія
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="travel">✈️ Подорожі</option>
                  <option value="sport">🏃 Спорт</option>
                  <option value="food">🍕 Їжа / Кафе</option>
                  <option value="culture">📚 Культура</option>
                  <option value="family">👨‍👩‍👧 Сім'я</option>
                  <option value="other">Інше</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Складність
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="free">Безкоштовно / Символічно</option>
                  <option value="budget">Потребує витрат</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Contact & Consent */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Контакти та згода родини
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Хто подає (ПІБ, ким доводитесь) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="напр., Олена Коваль (сестра)"
                  value={formData.submitted_by_name}
                  onChange={(e) => setFormData({ ...formData, submitted_by_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email для зв'язку *
                </label>
                <input
                  type="email"
                  required
                  placeholder="olenakoval@example.com"
                  value={formData.submitted_by_email}
                  onChange={(e) => setFormData({ ...formData, submitted_by_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.family_consent}
                onChange={(e) => setFormData({ ...formData, family_consent: e.target.checked })}
                className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 block mb-0.5">Підтвердження згоди родини:</strong>
                Я підтверджую, що маю згоду найближчих родичів полеглого воїна на публікацію його історії та вшанування пам'яті через цей проект.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{loading ? 'Публікація...' : 'Опублікувати бажання'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
