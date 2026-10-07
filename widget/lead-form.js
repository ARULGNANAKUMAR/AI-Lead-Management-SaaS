/**
 * Lead Compass Widget
 * Embed: <script src="lead-form.js" data-key="YOUR_KEY" data-theme="dark"><\/script>
 */
(function () {
  'use strict';

  const script = document.currentScript || document.querySelector('script[data-key]');
  const WIDGET_KEY = script?.getAttribute('data-key') || '';
  const THEME = script?.getAttribute('data-theme') || 'dark';
  const API_BASE = script?.getAttribute('data-api') || 'http://localhost:8080/api';

  if (!WIDGET_KEY) {
    console.warn('[LeadCompass] data-key is required');
    return;
  }

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    #lc-widget-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 22px;
      box-shadow: 0 4px 20px rgba(99,102,241,0.4);
      z-index: 9998;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #lc-widget-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(99,102,241,0.5);
    }
    #lc-widget-panel {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 340px;
      background: ${THEME === 'dark' ? '#1a1d27' : '#ffffff'};
      border: 1px solid ${THEME === 'dark' ? '#2e3347' : '#e5e7eb'};
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.3);
      z-index: 9999;
      overflow: hidden;
      transform: scale(0.92) translateY(12px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #lc-widget-panel.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    .lc-header {
      background: #6366f1;
      padding: 16px 20px;
      color: #fff;
    }
    .lc-header h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 2px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
    .lc-header p {
      font-size: 12px;
      opacity: 0.85;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
    .lc-body {
      padding: 20px;
    }
    .lc-field {
      margin-bottom: 12px;
    }
    .lc-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: ${THEME === 'dark' ? '#9ba3c9' : '#6b7280'};
      margin-bottom: 4px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
    .lc-input, .lc-textarea {
      width: 100%;
      padding: 8px 12px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      color: ${THEME === 'dark' ? '#e8eaf6' : '#111827'};
      background: ${THEME === 'dark' ? '#22263a' : '#f9fafb'};
      border: 1px solid ${THEME === 'dark' ? '#2e3347' : '#e5e7eb'};
      border-radius: 8px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .lc-input:focus, .lc-textarea:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
    }
    .lc-input::placeholder, .lc-textarea::placeholder {
      color: ${THEME === 'dark' ? '#5c6389' : '#9ca3af'};
    }
    .lc-textarea { resize: none; height: 72px; }
    .lc-btn {
      width: 100%;
      padding: 10px;
      background: #6366f1;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      transition: background 0.15s;
      margin-top: 4px;
    }
    .lc-btn:hover:not(:disabled) { background: #4f51d8; }
    .lc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .lc-error {
      font-size: 12px;
      color: #ef4444;
      margin-top: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
    .lc-success {
      text-align: center;
      padding: 24px 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
    .lc-success .lc-check { font-size: 40px; margin-bottom: 12px; }
    .lc-success h4 {
      font-size: 15px;
      font-weight: 600;
      color: ${THEME === 'dark' ? '#e8eaf6' : '#111827'};
      margin: 0 0 6px;
    }
    .lc-success p {
      font-size: 13px;
      color: ${THEME === 'dark' ? '#9ba3c9' : '#6b7280'};
      margin: 0;
    }
    .lc-branding {
      text-align: center;
      font-size: 11px;
      color: ${THEME === 'dark' ? '#5c6389' : '#9ca3af'};
      padding-bottom: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
    }
  `;
  document.head.appendChild(style);

  // Build HTML
  const btn = document.createElement('button');
  btn.id = 'lc-widget-btn';
  btn.title = 'Contact us';
  btn.innerHTML = '💬';

  const panel = document.createElement('div');
  panel.id = 'lc-widget-panel';
  panel.innerHTML = `
    <div class="lc-header">
      <h3>Get in touch</h3>
      <p>We'll get back to you as soon as possible.</p>
    </div>
    <div class="lc-body" id="lc-form-body">
      <div class="lc-field">
        <label class="lc-label">Name *</label>
        <input class="lc-input" id="lc-name" placeholder="Your full name">
      </div>
      <div class="lc-field">
        <label class="lc-label">Email *</label>
        <input class="lc-input" id="lc-email" type="email" placeholder="you@company.com">
      </div>
      <div class="lc-field">
        <label class="lc-label">Phone</label>
        <input class="lc-input" id="lc-phone" placeholder="+91 9876543210">
      </div>
      <div class="lc-field">
        <label class="lc-label">Message</label>
        <textarea class="lc-textarea" id="lc-message" placeholder="How can we help?"></textarea>
      </div>
      <div id="lc-error" class="lc-error" style="display:none"></div>
      <button class="lc-btn" id="lc-submit">Send Message</button>
    </div>
    <div class="lc-branding">Powered by Lead Compass</div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  // Toggle
  btn.addEventListener('click', () => {
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open', !isOpen);
    btn.innerHTML = isOpen ? '💬' : '×';
    btn.style.fontSize = isOpen ? '22px' : '28px';
  });

  // Submit
  document.getElementById('lc-submit').addEventListener('click', async () => {
    const name = document.getElementById('lc-name').value.trim();
    const email = document.getElementById('lc-email').value.trim();
    const phone = document.getElementById('lc-phone').value.trim();
    const message = document.getElementById('lc-message').value.trim();
    const errEl = document.getElementById('lc-error');

    errEl.style.display = 'none';

    if (!name) { showError('Please enter your name.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email.'); return;
    }

    const submitBtn = document.getElementById('lc-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(`${API_BASE}/widget/submit?key=${encodeURIComponent(WIDGET_KEY)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!res.ok) throw new Error('Failed');

      // Show success
      document.getElementById('lc-form-body').innerHTML = `
        <div class="lc-success">
          <div class="lc-check">✅</div>
          <h4>Message sent!</h4>
          <p>Thanks ${name.split(' ')[0]}, we'll be in touch shortly.</p>
        </div>
      `;
    } catch {
      showError('Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });

  function showError(msg) {
    const el = document.getElementById('lc-error');
    el.textContent = msg;
    el.style.display = 'block';
  }
})();
