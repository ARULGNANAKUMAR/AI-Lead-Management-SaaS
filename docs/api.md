# API Documentation

## Base URL
`http://localhost:8080/api` (dev)

## Authentication
All protected routes require a valid session cookie (`session_token`) set via Google OAuth.
Alternatively, pass `Authorization: Bearer <token>` header.

---

## Auth

### GET /api/auth/google
Redirects to Google OAuth consent screen.

### GET /api/auth/google/callback
Called by Google after user consents. Sets `session_token` HttpOnly cookie and redirects to dashboard.

### POST /api/auth/logout
Clears session. No body required.
**Response:** `{ "success": true, "data": { "message": "Logged out" } }`

### GET /api/auth/me
Returns current authenticated user.
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "Jane Smith",
    "avatar": "https://...",
    "role": "user",
    "business_id": "..."
  }
}
```

---

## Leads

### GET /api/leads
Query params: `page`, `limit`, `status`, `source`, `search`, `sort_by`, `sort_dir`
```json
{
  "success": true,
  "data": [...leads],
  "meta": { "total": 42, "page": 1, "limit": 25, "pages": 2 }
}
```

### POST /api/leads
```json
{
  "name": "Jane Smith",
  "email": "jane@acme.com",
  "phone": "+91 9876543210",
  "company": "Acme Corp",
  "source": "manual",
  "notes": "Interested in enterprise plan"
}
```

### GET /api/leads/{id}
Returns lead + activities array.

### PUT /api/leads/{id}
Update any lead fields (whitelist enforced server-side).

### PATCH /api/leads/{id}/status
```json
{ "status": "contacted" }
```
Valid: `new`, `contacted`, `qualified`, `proposal`, `won`, `lost`

### DELETE /api/leads/{id}
Deletes lead and decrements business lead count.

---

## Widget

### POST /api/widget/submit?key=WIDGET_KEY
Public endpoint. No auth required.
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9000000000",
  "message": "I'd like to learn more"
}
```

---

## Dashboard

### GET /api/dashboard/stats
```json
{
  "success": true,
  "data": {
    "stats": {
      "total_leads": 42,
      "new_leads": 12,
      "won_leads": 8,
      "conversion_rate": 19.05,
      "by_status": { "new": 10, "contacted": 8, ... },
      "by_source": { "website": 15, "widget": 12, ... },
      "total_value": 500000
    },
    "monthly": [
      { "month": "Jan", "count": 5 },
      ...
    ]
  }
}
```

---

## Error Responses
```json
{ "success": false, "error": "Unauthorized" }
```
HTTP status codes: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500 Internal Server Error
