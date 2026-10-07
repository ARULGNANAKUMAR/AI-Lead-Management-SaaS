import { requireAuth, logout } from './auth.js';
import api from './api.js';
import { toast, avatarEl } from './utils.js';

async function init() {
  const user = await requireAuth();
  renderUserInfo(user);
  loadSettings(user);

  document.getElementById('logout-btn')?.addEventListener('click', logout);
  document.getElementById('profile-form')?.addEventListener('submit', saveProfile);
  document.getElementById('business-form')?.addEventListener('submit', saveBusiness);

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

  // Prefill profile form
  const nameInput = document.getElementById('profile-name');
  const emailInput = document.getElementById('profile-email');
  if (nameInput) nameInput.value = user.name;
  if (emailInput) { emailInput.value = user.email; emailInput.disabled = true; }
}

async function loadSettings(user) {
  try {
    const res = await api.business.get();
    const biz = res.data;

    const nameInput = document.getElementById('biz-name');
    const domainInput = document.getElementById('biz-domain');
    const widgetKeyEl = document.getElementById('widget-key');

    if (nameInput) nameInput.value = biz.name || '';
    if (domainInput) domainInput.value = biz.domain || '';
    if (widgetKeyEl) widgetKeyEl.textContent = biz.widget_key || '—';

    setEl('plan-badge', biz.plan || 'free');
    setEl('lead-usage', `${biz.lead_count} / ${biz.lead_limit}`);
  } catch (e) {
    toast('Failed to load settings', 'error');
  }
}

async function saveProfile(e) {
  e.preventDefault();
  const btn = document.getElementById('profile-submit');
  btn.disabled = true;
  btn.textContent = 'Saving…';

  try {
    const name = document.getElementById('profile-name').value;
    await api.user.update({ name });
    toast('Profile updated!', 'success');
  } catch (err) {
    toast(err.message || 'Failed to update profile', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Profile';
  }
}

async function saveBusiness(e) {
  e.preventDefault();
  const btn = document.getElementById('biz-submit');
  btn.disabled = true;
  btn.textContent = 'Saving…';

  try {
    const name = document.getElementById('biz-name').value;
    const domain = document.getElementById('biz-domain').value;
    await api.business.update({ name, domain });
    toast('Business settings saved!', 'success');
  } catch (err) {
    toast(err.message || 'Failed to update business', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Settings';
  }
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// Copy widget key
window.copyWidgetKey = () => {
  const key = document.getElementById('widget-key')?.textContent;
  if (key && key !== '—') {
    navigator.clipboard.writeText(key).then(() => toast('Widget key copied!', 'success'));
  }
};

init();
