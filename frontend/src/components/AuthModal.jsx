import React, { useState } from 'react';
import { X, User, Lock, Mail, Sparkles, LogIn, UserPlus } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginTab) {
        await onLogin(username, password);
      } else {
        await onRegister(username, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Помилка авторизації');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await onLogin('volodymyr_v', 'volunteer123');
      onClose();
    } catch (err) {
      // If user doesn't exist yet, try login as admin
      try {
        await onLogin('admin', 'admin123');
        onClose();
      } catch (e2) {
        setError('Спробуйте зареєструватися новим користувачем.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {isLoginTab ? 'Вхід до платформи' : 'Реєстрація волонтера'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLoginTab
              ? 'Увійдіть, щоб брати бажання в роботу та звітувати'
              : 'Створіть профіль для вшанування пам\'яті захисників'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 text-xs font-semibold text-slate-600">
          <button
            onClick={() => { setIsLoginTab(true); setError(''); }}
            className={`flex-1 py-3 text-center transition border-b-2 ${
              isLoginTab ? 'border-amber-500 text-slate-900 font-bold bg-amber-50/30' : 'border-transparent hover:bg-slate-50'
            }`}
          >
            Увійти
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setError(''); }}
            className={`flex-1 py-3 text-center transition border-b-2 ${
              !isLoginTab ? 'border-amber-500 text-slate-900 font-bold bg-amber-50/30' : 'border-transparent hover:bg-slate-50'
            }`}
          >
            Зареєструватися
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Логін (Ім'я користувача) *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="напр., oleksandr"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Пароль *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isLoginTab ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{loading ? 'Зачекайте...' : isLoginTab ? 'Увійти' : 'Створити акаунт'}</span>
          </button>

          {/* Quick Demo Credentials */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-xs text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/80 hover:bg-amber-100/80 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Швидкий демо-вхід (volodymyr_v)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
