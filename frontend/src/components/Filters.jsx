import React from 'react';
import { Search } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Всі бажання' },
  { id: 'travel', label: 'Подорожі та місця' },
  { id: 'sport', label: 'Спорт та виклики' },
  { id: 'food', label: 'Смак та затишок' },
  { id: 'culture', label: 'Книги та культура' },
  { id: 'family', label: 'Родина та дім' },
];

const DIFFICULTIES = [
  { id: 'all', label: 'Будь-яка складність' },
  { id: 'free', label: 'Безкоштовно / Символічно' },
  { id: 'budget', label: 'Потребує фінансових витрат' },
];

const STATUSES = [
  { id: 'all', label: 'Всі статуси' },
  { id: 'approved', label: 'Очікує виконання' },
  { id: 'claimed', label: 'Зараз у роботі' },
  { id: 'completed', label: 'Вшановано (Виконано)' },
];

export default function Filters({ filters, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-6 mb-10 shadow-xs">
      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Пошук за ім'ям захисника, містом або суттю бажання..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-stone-50/50 text-stone-800 placeholder:text-stone-400 font-sans"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange({ ...filters, category: cat.id })}
            className={`px-4 py-2 rounded-full text-xs transition tracking-wide ${
              filters.category === cat.id
                ? 'bg-stone-900 text-stone-100 font-medium'
                : 'bg-stone-100/70 text-stone-600 hover:bg-stone-200/70'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Selects: Difficulty & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-stone-400 uppercase tracking-wider text-[10px]">Складність:</span>
          <select
            value={filters.difficulty}
            onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
            className="flex-1 py-2 px-3 rounded-lg border border-stone-200 bg-white text-stone-700 text-xs focus:outline-none focus:border-stone-800"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-stone-400 uppercase tracking-wider text-[10px]">Стан:</span>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="flex-1 py-2 px-3 rounded-lg border border-stone-200 bg-white text-stone-700 text-xs focus:outline-none focus:border-stone-800"
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
