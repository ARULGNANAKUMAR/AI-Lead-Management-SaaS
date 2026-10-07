import CONFIG from './config.js';

const BASE = CONFIG.API_BASE;

async function request(method, path, body) {
  const opts = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(BASE + path, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  // Auth
  auth: {
    me:     ()    => request('GET', '/auth/me'),
    logout: ()    => request('POST', '/auth/logout'),
    loginURL: ()  => `${BASE}/auth/google`,
  },

  // Leads
  leads: {
    list:   (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request('GET', `/leads${qs ? '?' + qs : ''}`);
    },
    get:    (id)          => request('GET', `/leads/${id}`),
    create: (body)        => request('POST', '/leads', body),
    update: (id, body)    => request('PUT', `/leads/${id}`, body),
    status: (id, status)  => request('PATCH', `/leads/${id}/status`, { status }),
    delete: (id)          => request('DELETE', `/leads/${id}`),
  },

  // Dashboard
  dashboard: {
    stats: () => request('GET', '/dashboard/stats'),
  },

  // Business
  business: {
    get:    ()     => request('GET', '/business'),
    update: (body) => request('PATCH', '/business', body),
  },

  // User
  user: {
    profile: ()     => request('GET', '/user/profile'),
    update:  (body) => request('PATCH', '/user/profile', body),
  },

  // Admin
  admin: {
    users: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request('GET', `/admin/users${qs ? '?' + qs : ''}`);
    },
    stats: () => request('GET', '/admin/stats'),
  },
};

export default api;
