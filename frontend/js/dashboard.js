import { requireAuth, logout } from './auth.js';
import api from './api.js';
import { formatNumber, formatCurrency, toast, avatarEl } from './utils.js';

async function init() {
  const user = await requireAuth();
  renderUserInfo(user);
  loadStats();

  document.getElementById('logout-btn')?.addEventListener('click', logout);
}

function renderUserInfo(user) {
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email');
  const avatarWrap = document.getElementById('user-avatar-wrap');

  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
  if (avatarWrap) avatarWrap.innerHTML = avatarEl(user);

  // Show admin link if admin
  if (user.role === 'admin') {
    document.getElementById('admin-nav')?.classList.remove('hidden');
  }
}

async function loadStats() {
  try {
    const res = await api.dashboard.stats();
    const { stats, monthly } = res.data;

    // Stat cards
    setEl('stat-total', formatNumber(stats.total_leads));
    setEl('stat-new', formatNumber(stats.new_leads));
    setEl('stat-won', formatNumber(stats.won_leads));
    setEl('stat-conversion', stats.conversion_rate.toFixed(1) + '%');
    setEl('stat-value', formatCurrency(stats.total_value));
    setEl('stat-recent', formatNumber(stats.recent_leads));

    // Funnel
    renderFunnel(stats.by_status, stats.total_leads);

    // Bar chart
    if (monthly?.length) renderChart(monthly);

  } catch (e) {
    toast('Failed to load dashboard', 'error');
  }
}

function renderFunnel(byStatus, total) {
  const wrap = document.getElementById('funnel-list');
  if (!wrap) return;

  const colors = {
    new: '#818cf8', contacted: '#60a5fa', qualified: '#a78bfa',
    proposal: '#fbbf24', won: '#34d399', lost: '#f87171',
  };

  wrap.innerHTML = Object.entries(byStatus).map(([status, count]) => {
    const pct = total > 0 ? Math.round(count / total * 100) : 0;
    return `
      <div class="funnel-item">
        <span class="funnel-label">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
        <div class="funnel-bar-wrap">
          <div class="funnel-bar-fill" style="width:${pct}%;background:${colors[status] || 'var(--accent)'}"></div>
        </div>
        <span class="funnel-count">${count}</span>
      </div>`;
  }).join('');
}

function renderChart(monthly) {
  const wrap = document.getElementById('chart-body');
  if (!wrap) return;

  const max = Math.max(...monthly.map(m => m.count), 1);
  wrap.innerHTML = monthly.map(m => {
    const h = Math.round((m.count / max) * 160);
    return `
      <div class="bar-item">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">${m.count}</div>
        <div class="bar-fill" style="height:${h}px"></div>
        <div class="bar-label">${m.month}</div>
      </div>`;
  }).join('');
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

init();
