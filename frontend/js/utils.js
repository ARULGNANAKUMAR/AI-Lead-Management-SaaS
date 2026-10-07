// ---- TOAST ----
let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function toast(msg, type = 'info', duration = 3500) {
  const container = getToastContainer();
  const el = document.createElement('div');
  el.className = `toast ${type}`;

  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  el.innerHTML = `<span style="font-weight:600">${icons[type] || ''}</span><span>${msg}</span>`;
  container.appendChild(el);

  setTimeout(() => {
    el.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => el.remove(), 280);
  }, duration);
}

// ---- DATE FORMATTING ----
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30)  return `${days}d ago`;
  return formatDate(dateStr);
}

// ---- NUMBER FORMATTING ----
export function formatCurrency(n) {
  if (!n) return '—';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function formatNumber(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

// ---- STATUS BADGE ----
const STATUS_LABELS = {
  new: 'New', contacted: 'Contacted', qualified: 'Qualified',
  proposal: 'Proposal', won: 'Won', lost: 'Lost',
};

export function statusBadge(status) {
  const label = STATUS_LABELS[status] || status;
  return `<span class="badge badge-${status}">${label}</span>`;
}

// ---- DEBOUNCE ----
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ---- QUERY PARAMS ----
export function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ---- MODAL HELPERS ----
export function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}

export function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

// ---- CONFIRM DIALOG ----
export function confirm(msg) {
  return window.confirm(msg);
}

// ---- AVATAR INITIALS ----
export function initials(name = '') {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ---- AVATAR ----
export function avatarEl(user) {
  if (user?.avatar) {
    return `<img class="user-avatar" src="${user.avatar}" alt="${user.name}">`;
  }
  return `<div class="user-avatar" style="display:flex;align-items:center;justify-content:center;background:var(--accent-light);color:var(--accent);font-weight:600;font-size:12px">${initials(user?.name)}</div>`;
}

// ---- LOADER ----
export function showLoader(el) {
  el.innerHTML = '<div style="display:flex;justify-content:center;padding:40px"><div class="spinner"></div></div>';
}

// ---- EMPTY STATE ----
export function emptyState(icon, title, subtitle = '') {
  return `<div class="empty-state"><div class="icon">${icon}</div><h3>${title}</h3>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`;
}
