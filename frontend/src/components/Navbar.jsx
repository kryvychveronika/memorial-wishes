import React from 'react';
import { Heart, PlusCircle, User as UserIcon, LogOut, CheckCircle2, Flame } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onOpenAddWish, stats }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-sm">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                Жива Пам'ять
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Культура вшанування дією
              </span>
            </div>
          </div>

          {/* Quick Metrics in Header */}
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-200/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Бажань: <strong className="text-slate-900">{stats.total}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              В роботі: <strong className="text-slate-900">{stats.claimed}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Виконано: <strong className="text-slate-900">{stats.completed}</strong>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddWish}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Подати бажання</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2 bg-slate-100 py-1.5 px-3 rounded-lg text-xs font-medium text-slate-700">
                  <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="max-w-[120px] truncate font-semibold">{user.username}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Вийти"
                  className="p-2 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 transition"
              >
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span>Вхід / Реєстрація</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
