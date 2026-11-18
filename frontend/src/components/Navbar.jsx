import React from 'react';
import { Flame, Plus, User as UserIcon, LogOut } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onOpenAddWish, stats }) {
  return (
    <header className="sticky top-0 z-40 bg-[#fafaf9]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Cormorant Garamond */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-amber-300 shadow-sm">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-stone-900 block leading-tight">
                Жива Пам'ять
              </span>
              <span className="text-[11px] text-stone-500 font-normal tracking-wide uppercase">
                Простір вшанування через дію
              </span>
            </div>
          </div>

          {/* Stats / Counters - Quiet & dignified */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-stone-500 py-1.5 px-4 rounded-full border border-stone-200/70 bg-stone-100/50">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
              Бажань у книзі: <strong className="text-stone-800 font-semibold">{stats.total}</strong>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              Втілюються зараз: <strong className="text-stone-800 font-semibold">{stats.claimed}</strong>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
              Здійснено: <strong className="text-stone-800 font-semibold">{stats.completed}</strong>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddWish}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white transition text-xs font-medium tracking-wide shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Подати бажання воїна</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-3 border-l border-stone-200">
                <div className="flex items-center gap-2 bg-stone-100 py-1.5 px-3 rounded-lg text-xs font-medium text-stone-700">
                  <UserIcon className="w-3.5 h-3.5 text-stone-500" />
                  <span className="max-w-[110px] truncate">{user.username}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Вийти"
                  className="p-2 text-stone-400 hover:text-stone-700 transition rounded-lg hover:bg-stone-100"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition"
              >
                <span>Вхід</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
