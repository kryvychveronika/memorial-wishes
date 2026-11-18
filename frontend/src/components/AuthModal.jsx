import React, { useState } from 'react';
import { X, User, Lock, Mail, Flame, LogIn, UserPlus } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="bg-[#fafaf9] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 text-stone-900">
        {/* Header */}
        <div className="bg-[#141210] text-stone-100 p-7 relative border-b border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="font-serif text-2xl font-normal tracking-wide">
            {isLoginTab ? 'Вхід для волонтерів' : 'Реєстрація у просторі'}
          </h2>
          <p className="text-xs text-stone-400 mt-1 font-light">
            {isLoginTab
              ? 'Увійдіть, щоб брати бажання в роботу та звітувати'
              : 'Створіть профіль для здійснення бажань захисників'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 text-xs font-medium text-stone-600">
          <button
            onClick={() => { setIsLoginTab(true); setError(''); }}
            className={`flex-1 py-3 text-center transition border-b-2 ${
              isLoginTab ? 'border-stone-900 text-stone-900 font-semibold bg-stone-100/50' : 'border-transparent hover:bg-stone-50'
            }`}
          >
            Увійти
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setError(''); }}
            className={`flex-1 py-3 text-center transition border-b-2 ${
              !isLoginTab ? 'border-stone-900 text-stone-900 font-semibold bg-stone-100/50' : 'border-transparent hover:bg-stone-50'
            }`}
          >
            Зареєструватися
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-7 space-y-4 font-sans">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Логін (Ім'я користувача) *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="oleksandr"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Пароль *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-800 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isLoginTab ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{loading ? 'Зачекайте...' : isLoginTab ? 'Увійти' : 'Створити акаунт'}</span>
          </button>

          {/* Quick Demo Credentials */}
          <div className="pt-4 border-t border-stone-200 text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium inline-flex items-center gap-1.5 p-2 rounded-lg hover:bg-stone-100 transition"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Швидкий демо-вхід (volodymyr_v)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
