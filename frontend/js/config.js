// Config — update API_BASE for production
const CONFIG = {
  API_BASE: window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api',
  APP_NAME: 'Lead Compass',
  VERSION: '1.0.0',
};

export default CONFIG;
