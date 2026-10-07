# Lead Compass Widget

Embeddable lead capture widget for any website.

## Quick Start

```html
<script
  src="https://yourdomain.com/widget/lead-form.js"
  data-key="YOUR_WIDGET_KEY"
  data-theme="dark"
  data-api="https://yourdomain.com/api">
</script>
```

## Attributes

| Attribute    | Required | Description                        | Default                    |
|--------------|----------|------------------------------------|----------------------------|
| `data-key`   | ✅ Yes    | Your widget key from Settings page | —                          |
| `data-theme` | No       | `dark` or `light`                  | `dark`                     |
| `data-api`   | No       | Your API base URL                  | `http://localhost:8080/api` |

## Features

- Floating chat bubble button
- Smooth open/close animation
- Name, email, phone, message fields
- Validation before submit
- Success state after submission
- Dark and light themes
- Zero dependencies, pure JS

## Getting your widget key

1. Sign in to Lead Compass
2. Go to Settings → Lead Widget
3. Copy your widget key
