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
import { Flame, CheckCircle2, AlertCircle } from 'lucide-react';

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
    setTimeout(() => setToast(null), 4500);
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
    showToast(`Вітаємо, ${res.user.username}. Ви успішно увійшли.`);
    loadWishes();
  };

  const handleRegister = async (username, email, password) => {
    const res = await api.register(username, email, password);
    setUser(res.user);
    showToast(`Профіль створено. Ласкаво просимо, ${res.user.username}.`);
    loadWishes();
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    showToast('Ви вийшли з профілю.');
    loadWishes();
  };

  const handleClaim = async (wish) => {
    if (!user) {
      setIsAuthOpen(true);
      showToast('Будь ласка, увійдіть, щоб взяти бажання у роботу.', 'info');
      return;
    }

    try {
      await api.claimWish(wish.id);
      showToast('Бажання закріплено за вами. Дякуємо за ваше щире серце.');
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
      showToast('Бажання повернено до загальної книги.');
      setSelectedWish(null);
      await loadWishes();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleComplete = async (wishId, reportText, reportPhotoUrl) => {
    try {
      await api.completeWish(wishId, reportText, reportPhotoUrl);
      showToast('Слова та фото вшанування збережено. Дякуємо за збережену пам\'ять.');
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
      showToast('Бажання воїна вписано до книги пам\'яті.');
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
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-900 font-sans selection:bg-stone-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-top-3 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-medium border ${
            toast.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-200'
              : toast.type === 'info'
              ? 'bg-stone-900 text-stone-100 border-stone-800'
              : 'bg-stone-900 text-stone-100 border-stone-800'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-500" />
            ) : (
              <Flame className="w-4 h-4 text-amber-400" />
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

      {/* Hero */}
      <Hero
        onOpenAddWish={() => setIsAddWishOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Catalog */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-800 block mb-1">
              Книга спогадів та вчинків
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight leading-none">
              Бажання полеглих воїнів
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light mt-2 max-w-xl">
              Оберіть бажання, яке відгукується у вашому серці, та здійсніть його в пам'ять про захисника
            </p>
          </div>

          <div className="text-xs text-stone-400 font-light">
            Усього в книзі: <strong className="text-stone-800 font-medium">{wishes.length}</strong>
          </div>
        </div>

        {/* Filters */}
        <Filters filters={filters} onChange={setFilters} />

        {/* Wishes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 h-96 animate-pulse" />
            ))}
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
            <Flame className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-normal text-stone-800">Бажань за цими критеріями не знайдено</h3>
            <p className="text-xs text-stone-500 mt-1 mb-5 font-light">
              Спробуйте змінити фільтри або скинути параметри пошуку.
            </p>
            <button
              onClick={() => setFilters({ category: 'all', difficulty: 'all', status: 'all', city: 'all', search: '' })}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50 transition"
            >
              Скинути фільтри
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <footer className="bg-white border-t border-stone-200 py-12 mt-20 text-xs text-stone-500 font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4 text-amber-600" />
            <span className="font-serif text-lg font-medium text-stone-900 not-italic">zdiysny</span>
            <span className="text-stone-400">— культура вшанування пам'яті через вчинки</span>
          </div>

          <div className="text-center md:text-right text-stone-400">
            Команда: <strong className="text-stone-700 font-medium">Dariia Kravchenko</strong> & <strong className="text-stone-700 font-medium">Veronika Kryvych</strong> | Module 11 Prototype
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
