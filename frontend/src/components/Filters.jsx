import React from 'react';
import { Search, SlidersHorizontal, MapPin, Tag } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Всі категорії' },
  { id: 'travel', label: '✈️ Подорожі' },
  { id: 'sport', label: '🏃 Спорт' },
  { id: 'food', label: '🍕 Їжа' },
  { id: 'culture', label: '📚 Культура' },
  { id: 'family', label: '👨‍👩‍👧 Сім\'я' },
];

const DIFFICULTIES = [
  { id: 'all', label: 'Будь-яка складність' },
  { id: 'free', label: 'Безкоштовно / Символічно' },
  { id: 'budget', label: 'Потребує витрат' },
];

const STATUSES = [
  { id: 'all', label: 'Всі статуси' },
  { id: 'approved', label: 'Очікує волонтера' },
  { id: 'claimed', label: 'В роботі' },
  { id: 'completed', label: 'Виконано' },
];

export default function Filters({ filters, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm">
      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Пошук за ім'ям воїна, містом або назвою бажання..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
        />
      </div>

      {/* Categories Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange({ ...filters, category: cat.id })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              filters.category === cat.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Selects: Difficulty & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Складність:</span>
          <select
            value={filters.difficulty}
            onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
            className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs focus:outline-none focus:border-amber-500"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Статус:</span>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs focus:outline-none focus:border-amber-500"
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
