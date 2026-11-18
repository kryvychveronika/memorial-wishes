import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import WishCard from './components/WishCard';
import WishDetailModal from './components/WishDetailModal';
import AddWishModal from './components/AddWishModal';
import ReportModal from './components/ReportModal';
import AuthModal from './components/AuthModal';
import GoogleCalendarModal from './components/GoogleCalendarModal';
import { api } from './services/api';
import { Sparkles, Heart, CheckCircle2, Flame, AlertCircle } from 'lucide-react';

export default function App() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all',
    city: 'all',
    search: '',
  });

  // Modals state
  const [selectedWish, setSelectedWish] = useState(null);
  const [reportWish, setReportWish] = useState(null);
  const [calendarWish, setCalendarWish] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddWishOpen, setIsAddWishOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadWishes = async () => {
    try {
      setLoading(true);
      const data = await api.getWishes(filters);
      setWishes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check initial user
    const savedUser = api.getCurrentUser();
    if (savedUser) setUser(savedUser);

    api.getMe().then((meData) => {
      if (meData?.user) setUser(meData.user);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    loadWishes();
  }, [filters]);

  const handleLogin = async (username, password) => {
    const res = await api.login(username, password);
    setUser(res.user);
    showToast(`Вітаємо, ${res.user.username}! Ви успішно увійшли.`);
    loadWishes();
  };

  const handleRegister = async (username, email, password) => {
    const res = await api.register(username, email, password);
    setUser(res.user);
    showToast(`Акаунт створено! Ласкаво просимо, ${res.user.username}.`);
    loadWishes();
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    showToast('Ви вийшли з акаунту.');
    loadWishes();
  };

  const handleClaim = async (wish) => {
    if (!user) {
      setIsAuthOpen(true);
      showToast('Будь ласка, увійдіть або зареєструйтесь, щоб взяти бажання.', 'info');
      return;
    }

    try {
      await api.claimWish(wish.id);
      showToast('Бажання закріплено за вами! Дякуємо за ваш внесок.');
      await loadWishes();
      if (selectedWish && selectedWish.id === wish.id) {
        setSelectedWish((prev) => ({ ...prev, status: 'claimed', claimed_by: user.id }));
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleUnclaim = async (wish) => {
    try {
      await api.unclaimWish(wish.id);
      showToast('Бажання повернено до загального списку.');
      setSelectedWish(null);
      await loadWishes();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleComplete = async (wishId, reportText, reportPhotoUrl) => {
    try {
      await api.completeWish(wishId, reportText, reportPhotoUrl);
      showToast('Звіт збережено! Дякуємо за вшанування пам\'яті.');
      setReportWish(null);
      setSelectedWish(null);
      await loadWishes();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCreateWish = async (wishData) => {
    try {
      await api.createWish(wishData);
      showToast('Бажання успішно опубліковано! Воно вже доступне в каталозі.');
      await loadWishes();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const stats = {
    total: wishes.length,
    claimed: wishes.filter((w) => w.status === 'claimed').length,
    completed: wishes.filter((w) => w.status === 'completed').length,
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-3 duration-300">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
            toast.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : toast.type === 'info'
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        user={user}
        stats={stats}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenAddWish={() => setIsAddWishOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenAddWish={() => setIsAddWishOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Main Content */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Каталог бажань воїнів
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Оберіть бажання, яке відгукується у вашому серці, та здійсніть його
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Знайдено бажань: <strong className="text-slate-800 font-semibold">{wishes.length}</strong>
          </div>
        </div>

        {/* Filters */}
        <Filters filters={filters} onChange={setFilters} />

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 h-80 animate-pulse" />
            ))}
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Flame className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Бажань за цими фільтрами не знайдено</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Спробуйте змінити фільтри або скинути параметри пошуку.
            </p>
            <button
              onClick={() => setFilters({ category: 'all', difficulty: 'all', status: 'all', city: 'all', search: '' })}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
            >
              Скинути фільтри
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                currentUser={user}
                onSelect={(w) => setSelectedWish(w)}
                onClaim={handleClaim}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-800">Жива Пам'ять</span>
            <span>— проект культури вшанування пам'яті полеглих воїнів</span>
          </div>

          <div className="text-center md:text-right">
            Команда: <strong>Dariia Kravchenko</strong> & <strong>Veronika Kryvych</strong> | Module 11 Prototype
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WishDetailModal
        wish={selectedWish}
        currentUser={user}
        onClose={() => setSelectedWish(null)}
        onClaim={handleClaim}
        onUnclaim={handleUnclaim}
        onOpenReport={(w) => {
          setSelectedWish(null);
          setReportWish(w);
        }}
        onOpenCalendar={(w) => setCalendarWish(w)}
      />

      <AddWishModal
        isOpen={isAddWishOpen}
        onClose={() => setIsAddWishOpen(false)}
        onSubmit={handleCreateWish}
      />

      <ReportModal
        wish={reportWish}
        isOpen={!!reportWish}
        onClose={() => setReportWish(null)}
        onSubmit={handleComplete}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <GoogleCalendarModal
        wish={calendarWish}
        isOpen={!!calendarWish}
        onClose={() => setCalendarWish(null)}
      />
    </div>
  );
}
