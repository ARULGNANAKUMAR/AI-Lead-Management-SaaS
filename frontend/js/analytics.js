import { requireAuth, logout } from './auth.js';
import api from './api.js';
import { toast, formatNumber, formatCurrency, avatarEl } from './utils.js';

async function init() {
  const user = await requireAuth();
  renderUserInfo(user);
  loadAnalytics();

  document.getElementById('logout-btn')?.addEventListener('click', logout);
  if (user.role === 'admin') {
    document.getElementById('admin-nav')?.classList.remove('hidden');
  }
}

function renderUserInfo(user) {
  const el = document.getElementById('user-avatar-wrap');
  if (el) el.innerHTML = avatarEl(user);
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email');
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
}

async function loadAnalytics() {
  try {
    const res = await api.dashboard.stats();
    const { stats, monthly } = res.data;

    setEl('stat-total', formatNumber(stats.total_leads));
    setEl('stat-won', formatNumber(stats.won_leads));
    setEl('stat-conversion', stats.conversion_rate.toFixed(1) + '%');
    setEl('stat-pipeline', formatCurrency(stats.total_value));

    renderSourceChart(stats.by_source);
    renderStatusChart(stats.by_status);
    if (monthly?.length) renderMonthlyChart(monthly);
  } catch (e) {
    toast('Failed to load analytics', 'error');
  }
}

function renderSourceChart(bySource) {
  const wrap = document.getElementById('source-chart');
  if (!wrap) return;

  const colors = {
    website: '#6366f1', widget: '#10b981', manual: '#f59e0b',
    referral: '#3b82f6', import: '#8b5cf6',
  };

  const total = Object.values(bySource).reduce((a, b) => a + b, 0) || 1;
  wrap.innerHTML = Object.entries(bySource)
    .filter(([, v]) => v > 0)
    .map(([source, count]) => {
      const pct = Math.round(count / total * 100);
      return `
        <div class="funnel-item">
          <span class="funnel-label" style="text-transform:capitalize">${source}</span>
          <div class="funnel-bar-wrap">
            <div class="funnel-bar-fill" style="width:${pct}%;background:${colors[source] || 'var(--accent)'}"></div>
          </div>
          <span class="funnel-count">${count}</span>
        </div>`;
    }).join('') || '<div style="color:var(--text-muted);font-size:var(--text-sm)">No data yet</div>';
}

function renderStatusChart(byStatus) {
  const wrap = document.getElementById('status-chart');
  if (!wrap) return;

  const colors = {
    new: '#818cf8', contacted: '#60a5fa', qualified: '#a78bfa',
    proposal: '#fbbf24', won: '#34d399', lost: '#f87171',
  };

  const total = Object.values(byStatus).reduce((a, b) => a + b, 0) || 1;
  wrap.innerHTML = Object.entries(byStatus).map(([status, count]) => {
    const pct = Math.round(count / total * 100);
    return `
      <div class="funnel-item">
        <span class="funnel-label" style="text-transform:capitalize">${status}</span>
        <div class="funnel-bar-wrap">
          <div class="funnel-bar-fill" style="width:${pct}%;background:${colors[status] || 'var(--accent)'}"></div>
        </div>
        <span class="funnel-count">${count}</span>
      </div>`;
  }).join('');
}

function renderMonthlyChart(monthly) {
  const wrap = document.getElementById('monthly-chart');
  if (!wrap) return;

  const max = Math.max(...monthly.map(m => m.count), 1);
  wrap.innerHTML = monthly.map(m => {
    const h = Math.round((m.count / max) * 180);
    return `
      <div class="bar-item">
        <div style="font-size:10px;color:var(--text-muted);margin-bottom:4px">${m.count}</div>
        <div class="bar-fill" style="height:${h}px;background:var(--accent)"></div>
        <div class="bar-label">${m.month}</div>
      </div>`;
  }).join('');
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

init();
