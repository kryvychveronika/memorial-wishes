import React, { useState } from 'react';
import { X, Flame, ShieldCheck, Send } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fafaf9] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-6 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        {/* Header */}
        <div className="bg-[#141210] text-stone-100 p-8 relative border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 text-xs tracking-wider uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Для родин та побратимів полеглих захисників</span>
          </div>
          <h2 className="font-serif text-3xl font-normal tracking-wide">Вписати бажання захисника</h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1 max-w-lg">
            Поділіться нездійсненою мрією воїна. Небайдужі люди допоможуть втілити її в життя як акт світлої пам'яті.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-12rem)] overflow-y-auto font-sans">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          {/* Section: Hero */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              1. Відомості про захисника
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Ім'я та позивний *
                </label>
                <input
                  type="text"
                  required
                  placeholder="напр., Андрій «Сармат» Коваль"
                  value={formData.hero_name}
                  onChange={(e) => setFormData({ ...formData, hero_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Підрозділ / Бригада
                </label>
                <input
                  type="text"
                  placeholder="напр., 93-тя ОМБр Холодний Яр"
                  value={formData.military_unit}
                  onChange={(e) => setFormData({ ...formData, military_unit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Посилання на фотографію захисника (URL)
              </label>
              <input
                type="url"
                placeholder="https://... (залиште порожнім, якщо немає фото)"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Коротка історія про захисника *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Ким був у цивільному житті, чим захоплювався, про що мріяв..."
                value={formData.hero_story}
                onChange={(e) => setFormData({ ...formData, hero_story: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>
          </div>

          {/* Section: Wish */}
          <div className="space-y-4 pt-4 border-t border-stone-200/80">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              2. Нездійснена мрія
            </h3>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Суть або назва бажання *
              </label>
              <input
                type="text"
                required
                placeholder="напр., З'їсти піцу в Римі / Побачити море / Пробігти півмарафон"
                value={formData.wish_title}
                onChange={(e) => setFormData({ ...formData, wish_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Детальний опис *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Чому це було важливо? Що саме волонтер має зробити на знак пам'яті?"
                value={formData.wish_description}
                onChange={(e) => setFormData({ ...formData, wish_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Місто / Локація
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Категорія
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-800 bg-white"
                >
                  <option value="travel">Подорожі</option>
                  <option value="sport">Спорт</option>
                  <option value="food">Смак / Кафе</option>
                  <option value="culture">Книги / Культура</option>
                  <option value="family">Родина</option>
                  <option value="other">Інше</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Складність
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-800 bg-white"
                >
                  <option value="free">Безкоштовно / Символічно</option>
                  <option value="budget">Потребує витрат</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Consent */}
          <div className="space-y-4 pt-4 border-t border-stone-200/80">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              3. Контакти та згода родини
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Хто подає (ПІБ, ким доводитесь) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Олена Коваль (сестра)"
                  value={formData.submitted_by_name}
                  onChange={(e) => setFormData({ ...formData, submitted_by_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email для зв'язку *
                </label>
                <input
                  type="email"
                  required
                  placeholder="olenakoval@example.com"
                  value={formData.submitted_by_email}
                  onChange={(e) => setFormData({ ...formData, submitted_by_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 rounded-xl bg-stone-100 border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.family_consent}
                onChange={(e) => setFormData({ ...formData, family_consent: e.target.checked })}
                className="mt-0.5 rounded text-stone-900 focus:ring-stone-800"
              />
              <span className="text-xs text-stone-700 leading-relaxed font-light">
                <strong className="text-stone-900 block font-medium mb-0.5">Підтвердження згоди родини:</strong>
                Я підтверджую, що маю згоду найближчих родичів полеглого воїна на публікацію його історії та вшанування пам'яті через цей некомерційний простір.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-100 transition"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{loading ? 'Збереження...' : 'Вписати в книгу'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
