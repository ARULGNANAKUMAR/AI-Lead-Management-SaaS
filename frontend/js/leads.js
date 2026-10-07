import { requireAuth, logout } from './auth.js';
import api from './api.js';
import { toast, formatDate, formatCurrency, statusBadge, debounce, openModal, closeModal, timeAgo, emptyState, avatarEl, showLoader } from './utils.js';

let state = {
  page: 1,
  limit: 25,
  search: '',
  status: '',
  source: '',
  total: 0,
  pages: 0,
  currentLead: null,
};

async function init() {
  const user = await requireAuth();
  renderUserInfo(user);
  bindEvents();
  loadLeads();

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

function bindEvents() {
  // Search
  document.getElementById('search-input')?.addEventListener('input', debounce(e => {
    state.search = e.target.value;
    state.page = 1;
    loadLeads();
  }));

  // Filters
  document.getElementById('status-filter')?.addEventListener('change', e => {
    state.status = e.target.value;
    state.page = 1;
    loadLeads();
  });

  document.getElementById('source-filter')?.addEventListener('change', e => {
    state.source = e.target.value;
    state.page = 1;
    loadLeads();
  });

  // Create lead modal
  document.getElementById('create-lead-btn')?.addEventListener('click', () => openModal('create-modal'));
  document.getElementById('modal-close')?.addEventListener('click', () => closeModal('create-modal'));
  document.getElementById('create-modal')?.addEventListener('click', e => {
    if (e.target.id === 'create-modal') closeModal('create-modal');
  });

  // Create form submit
  document.getElementById('create-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    await createLead();
  });

  // Detail panel close
  document.getElementById('panel-close')?.addEventListener('click', closePanel);
  document.getElementById('lead-detail-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'lead-detail-overlay') closePanel();
  });
}

async function loadLeads() {
  const tbody = document.getElementById('leads-tbody');
  if (!tbody) return;
  showLoader(tbody.closest('.card') || tbody.parentElement);

  try {
    const params = {
      page: state.page,
      limit: state.limit,
      ...(state.search && { search: state.search }),
      ...(state.status && { status: state.status }),
      ...(state.source && { source: state.source }),
    };

    const res = await api.leads.list(params);
    const leads = res.data || [];
    state.total = res.meta?.total || 0;
    state.pages = res.meta?.pages || 1;

    renderTable(leads);
    renderPagination();
  } catch (e) {
    toast('Failed to load leads', 'error');
  }
}

function renderTable(leads) {
  const tbody = document.getElementById('leads-tbody');
  if (!tbody) return;

  if (!leads.length) {
    tbody.innerHTML = `<tr><td colspan="7">${emptyState('📋', 'No leads yet', 'Create your first lead or use the widget to capture leads.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = leads.map(lead => `
    <tr data-id="${lead.id}" style="cursor:pointer">
      <td>
        <div class="lead-name-cell">
          <span class="lead-name">${esc(lead.name)}</span>
          <span class="lead-email">${esc(lead.email)}</span>
        </div>
      </td>
      <td class="hide-mobile"><span class="lead-company">${esc(lead.company || '—')}</span></td>
      <td>${statusBadge(lead.status)}</td>
      <td class="hide-mobile"><span style="font-size:var(--text-xs);color:var(--text-muted)">${esc(lead.source || '—')}</span></td>
      <td class="hide-mobile"><span class="lead-value">${formatCurrency(lead.value)}</span></td>
      <td class="hide-mobile"><span class="text-xs text-muted">${timeAgo(lead.created_at)}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-ghost btn-sm" onclick="editLead('${lead.id}',event)" title="Edit">✏️</button>
          <button class="btn btn-ghost btn-sm" onclick="deleteLead('${lead.id}',event)" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');

  // Row click → detail panel
  tbody.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', () => openPanel(row.dataset.id));
  });
}

function renderPagination() {
  const info = document.getElementById('pagination-info');
  const btns = document.getElementById('pagination-btns');
  if (!info || !btns) return;

  const start = (state.page - 1) * state.limit + 1;
  const end = Math.min(state.page * state.limit, state.total);
  info.textContent = state.total > 0
    ? `Showing ${start}–${end} of ${state.total} leads`
    : 'No leads found';

  btns.innerHTML = `
    <button class="page-btn" onclick="changePage(${state.page - 1})" ${state.page <= 1 ? 'disabled' : ''}>←</button>
    <button class="page-btn active">${state.page}</button>
    <button class="page-btn" onclick="changePage(${state.page + 1})" ${state.page >= state.pages ? 'disabled' : ''}>→</button>
  `;
}

window.changePage = (p) => {
  if (p < 1 || p > state.pages) return;
  state.page = p;
  loadLeads();
};

async function createLead() {
  const form = document.getElementById('create-form');
  const btn = document.getElementById('create-submit');
  btn.disabled = true;
  btn.textContent = 'Creating…';

  try {
    const data = {
      name:    form.querySelector('[name=name]').value,
      email:   form.querySelector('[name=email]').value,
      phone:   form.querySelector('[name=phone]').value,
      company: form.querySelector('[name=company]').value,
      source:  form.querySelector('[name=source]').value || 'manual',
      notes:   form.querySelector('[name=notes]').value,
    };

    await api.leads.create(data);
    toast('Lead created!', 'success');
    closeModal('create-modal');
    form.reset();
    loadLeads();
  } catch (e) {
    toast(e.message || 'Failed to create lead', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Create Lead';
  }
}

window.editLead = async (id, e) => {
  e?.stopPropagation();
  // Open panel then switch to edit view
  await openPanel(id);
};

window.deleteLead = async (id, e) => {
  e?.stopPropagation();
  if (!confirm('Delete this lead? This cannot be undone.')) return;
  try {
    await api.leads.delete(id);
    toast('Lead deleted', 'success');
    loadLeads();
  } catch (e) {
    toast('Failed to delete lead', 'error');
  }
};

async function openPanel(id) {
  const overlay = document.getElementById('lead-detail-overlay');
  overlay?.classList.add('open');

  try {
    const res = await api.leads.get(id);
    const { lead, activities } = res.data;
    state.currentLead = lead;
    renderPanel(lead, activities || []);
  } catch (e) {
    toast('Failed to load lead', 'error');
    closePanel();
  }
}

function closePanel() {
  document.getElementById('lead-detail-overlay')?.classList.remove('open');
  state.currentLead = null;
}

function renderPanel(lead, activities) {
  const body = document.getElementById('panel-body');
  if (!body) return;

  const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

  body.innerHTML = `
    <div class="detail-section">
      <div style="margin-bottom:var(--space-4)">
        <div style="font-size:var(--text-xl);font-weight:600">${esc(lead.name)}</div>
        <div style="font-size:var(--text-sm);color:var(--text-muted)">${esc(lead.email)}</div>
      </div>

      <div class="status-select-wrap">
        ${statuses.map(s => `
          <button class="status-btn ${s} ${lead.status === s ? 'active' : ''}"
            onclick="updateStatus('${lead.id}','${s}')">
            ${s}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Contact Info</div>
      <div class="detail-row"><span class="detail-key">Phone</span><span class="detail-val">${esc(lead.phone || '—')}</span></div>
      <div class="detail-row"><span class="detail-key">Company</span><span class="detail-val">${esc(lead.company || '—')}</span></div>
      <div class="detail-row"><span class="detail-key">Job Title</span><span class="detail-val">${esc(lead.job_title || '—')}</span></div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Lead Details</div>
      <div class="detail-row"><span class="detail-key">Source</span><span class="detail-val">${esc(lead.source || '—')}</span></div>
      <div class="detail-row"><span class="detail-key">Value</span><span class="detail-val">${formatCurrency(lead.value)}</span></div>
      <div class="detail-row"><span class="detail-key">Created</span><span class="detail-val">${formatDate(lead.created_at)}</span></div>
    </div>

    ${lead.message ? `
    <div class="detail-section">
      <div class="detail-section-title">Message</div>
      <p style="font-size:var(--text-sm);color:var(--text-secondary)">${esc(lead.message)}</p>
    </div>` : ''}

    ${lead.notes ? `
    <div class="detail-section">
      <div class="detail-section-title">Notes</div>
      <p style="font-size:var(--text-sm);color:var(--text-secondary)">${esc(lead.notes)}</p>
    </div>` : ''}

    <div class="detail-section">
      <div class="detail-section-title">Activity</div>
      <div class="activity-feed">
        ${activities.length ? activities.map(a => `
          <div class="activity-item">
            <div class="activity-dot"></div>
            <div class="activity-content">
              <div class="activity-message">${esc(a.message)}</div>
              <div class="activity-time">${timeAgo(a.created_at)} ${a.user_name ? '· ' + esc(a.user_name) : ''}</div>
            </div>
          </div>
        `).join('') : '<div class="activity-message" style="color:var(--text-muted)">No activity yet</div>'}
      </div>
    </div>

    <div style="display:flex;gap:var(--space-3);margin-top:var(--space-4)">
      <button class="btn btn-danger btn-sm" onclick="deleteLead('${lead.id}')">Delete</button>
    </div>
  `;
}

window.updateStatus = async (id, status) => {
  try {
    await api.leads.status(id, status);
    toast(`Status updated to ${status}`, 'success');
    if (state.currentLead?.id === id) {
      const res = await api.leads.get(id);
      renderPanel(res.data.lead, res.data.activities || []);
    }
    loadLeads();
  } catch (e) {
    toast('Failed to update status', 'error');
  }
};

function esc(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

init();
