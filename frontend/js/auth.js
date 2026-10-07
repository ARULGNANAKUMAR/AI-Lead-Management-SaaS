import api from './api.js';
import CONFIG from './config.js';

let currentUser = null;

export async function requireAuth() {
  try {
    const res = await api.auth.me();
    currentUser = res.data;
    return currentUser;
  } catch (e) {
    if (e.status === 401) {
      window.location.href = '/pages/login.html';
    }
    throw e;
  }
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    window.location.href = '/pages/dashboard.html';
    throw new Error('Not admin');
  }
  return user;
}

export function getUser() {
  return currentUser;
}

export function setUser(user) {
  currentUser = user;
}

export async function logout() {
  try {
    await api.auth.logout();
  } finally {
    window.location.href = '/pages/login.html';
  }
}

export function loginWithGoogle() {
  window.location.href = api.auth.loginURL();
}
