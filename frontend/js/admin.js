import { requireAdmin, logout } from './auth.js';
import api from './api.js';
import { toast, formatDate, avatarEl } from './utils.js';

async function init() {
  const user = await requireAdmin();
  renderUserInfo(user);
  loadUsers();

  document.getElementById('logout-btn')?.addEventListener('click', logout);
}

function renderUserInfo(user) {
  const el = document.getElementById('user-avatar-wrap');
  if (el) el.innerHTML = avatarEl(user);
  const nameEl = document.getElementById('user-name');
  const emailEl = document.getElementById('user-email');
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
}

async function loadUsers() {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;

  try {
    const res = await api.admin.users({ limit: 50 });
    const users = res.data || [];

    if (!users.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:32px">No users found</td></tr>';
      return;
    }

    tbody.innerHTML = users.map(u => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            ${u.avatar
              ? `<img class="user-row-avatar" src="${u.avatar}" alt="${u.name}">`
              : `<div class="user-row-avatar" style="display:flex;align-items:center;justify-content:center;background:var(--accent-light);color:var(--accent);font-weight:600;font-size:12px">${u.name?.charAt(0)?.toUpperCase()}</div>`
            }
            <div>
              <div style="font-weight:500;font-size:var(--text-sm)">${esc(u.name)}</div>
            </div>
          </div>
        </td>
        <td style="font-size:var(--text-sm);color:var(--text-secondary)">${esc(u.email)}</td>
        <td>
          ${u.role === 'admin'
            ? '<span class="admin-badge">⭐ Admin</span>'
            : '<span class="badge" style="background:var(--bg-elevated);color:var(--text-muted)">User</span>'
          }
        </td>
        <td style="font-size:var(--text-xs);color:var(--text-muted)">${formatDate(u.created_at)}</td>
        <td>
          <span class="badge" style="${u.is_active ? 'background:rgba(16,185,129,0.15);color:#34d399' : 'background:rgba(239,68,68,0.15);color:#f87171'}">
            ${u.is_active ? 'Active' : 'Inactive'}
          </span>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    toast('Failed to load users', 'error');
  }
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

init();
