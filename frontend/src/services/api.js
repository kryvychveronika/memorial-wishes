const API_BASE = import.meta.env.VITE_API_URL || '';

function getHeaders() {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  return headers;
}

export const api = {
  // Auth
  async register(username, email, password) {
    const res = await fetch(`${API_BASE}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Помилка реєстрації');
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async login(username, password) {
    const res = await fetch(`${API_BASE}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Невірний логін або пароль');
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  },

  async getMe() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const res = await fetch(`${API_BASE}/api/auth/me/`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      this.logout();
      return null;
    }
    return await res.json();
  },

  // Wishes
  async getWishes(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.difficulty && filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
    if (filters.city && filters.city !== 'all') params.append('city', filters.city);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/api/wishes/?${params.toString()}`);
    if (!res.ok) throw new Error('Не вдалося завантажити бажання');
    return await res.json();
  },

  async createWish(wishData) {
    const res = await fetch(`${API_BASE}/api/wishes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wishData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Помилка при створенні бажання');
    return data;
  },

  async claimWish(id) {
    const res = await fetch(`${API_BASE}/api/wishes/${id}/claim/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Не вдалося взяти бажання');
    return data;
  },

  async unclaimWish(id) {
    const res = await fetch(`${API_BASE}/api/wishes/${id}/unclaim/`, {
      method: 'POST',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Не вдалося повернути бажання');
    return data;
  },

  async completeWish(id, reportText, reportPhotoUrl) {
    const res = await fetch(`${API_BASE}/api/wishes/${id}/complete/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        report_text: reportText,
        report_photo_url: reportPhotoUrl,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Не вдалося надіслати звіт');
    return data;
  },
};
