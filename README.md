# Lead Compass --- AI Lead Management SaaS

> A multi-tenant lead management SaaS foundation built with **Go,
> MongoDB, Vanilla JavaScript, HTML and CSS**, with Google OAuth
> authentication, lead pipeline management, analytics, an admin area,
> and an embeddable lead-capture widget.
>
> **Important:** The current codebase is primarily a lead-management/CRM
> SaaS prototype. The AI intelligence layer is **planned but not yet
> implemented**. Features such as LLM-based lead scoring, intent
> detection, AI summaries, RAG, AI agents, and AI-generated follow-ups
> should not be considered available in the current version.

------------------------------------------------------------------------

## 1. Project Overview

Lead Compass is designed as a SaaS platform that helps businesses
collect, organize, track, and analyze customer leads from different
sources.

The core product flow is:

``` text
Business Website
      │
      ▼
Embeddable Lead Widget
      │
      ▼
Lead Capture API
      │
      ▼
Go Backend
      │
      ├── Authentication
      ├── Lead Management
      ├── Business/Tenant Management
      ├── Analytics
      ├── Activity Tracking
      └── Admin Management
      │
      ▼
MongoDB
```

A business can have its own workspace and leads. Lead data is scoped
using a `business_id`, providing the foundation for a multi-tenant SaaS
architecture.

------------------------------------------------------------------------

# 2. Current Product Status

## Implemented / Mostly Implemented

-   Go HTTP backend
-   MongoDB integration
-   User model
-   Business/tenant model
-   Lead model
-   Lead CRUD operations
-   Lead status pipeline
-   Lead source tracking
-   Activity tracking
-   Google OAuth architecture
-   Session-based authentication
-   Authentication middleware
-   Business-level data isolation
-   Dashboard statistics
-   Basic analytics
-   Admin user management
-   Frontend dashboard
-   Leads management UI
-   Analytics UI
-   Settings UI
-   Admin UI
-   Embeddable lead-form widget UI
-   API rate-limiting foundation
-   Security-header middleware
-   CORS configuration
-   Session expiration/cleanup foundation

## Incomplete / Requires Fixing

-   Google OAuth callback configuration
-   Widget-to-MongoDB lead persistence
-   Widget-specific rate-limiter wiring
-   Free-plan lead-limit enforcement
-   Admin statistics implementation
-   Full team/member management
-   Email notifications
-   CSV/import pipeline
-   Billing/subscription system
-   Production deployment hardening
-   Complete automated test coverage
-   Dependency/build cleanup

## Not Yet Implemented

The following are **future AI features**, not current features:

-   AI lead scoring
-   AI intent detection
-   AI lead qualification
-   AI lead summarization
-   AI next-best-action recommendations
-   AI-generated follow-up messages
-   LLM integration
-   Embeddings
-   Vector database
-   RAG
-   Autonomous sales/lead agents
-   AI feedback-learning system

------------------------------------------------------------------------

# 3. Why This Project Exists

Traditional lead-management systems often require a business to manually
collect leads, classify them, update statuses, and decide which leads
deserve immediate attention.

Lead Compass provides the foundation for automating that workflow.

The long-term product vision is:

``` text
Lead Collection
      ↓
Lead Normalization
      ↓
Lead Management
      ↓
Lead Analytics
      ↓
AI Lead Understanding
      ↓
AI Lead Scoring
      ↓
Recommended Action
      ↓
Automated Follow-up
      ↓
Sales Conversion
```

The current repository implements the **data, SaaS, CRM, and analytics
foundation**. The AI layer can be added on top of this foundation.

------------------------------------------------------------------------

# 4. Core Architecture

``` text
                           ┌─────────────────────┐
                           │  Customer Website   │
                           └──────────┬──────────┘
                                      │
                                      ▼
                           ┌─────────────────────┐
                           │  Lead Compass       │
                           │  Embedded Widget    │
                           └──────────┬──────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────┐
│                    Go Backend API                       │
│                                                         │
│  ┌─────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │ Auth        │  │ Leads      │  │ Analytics      │  │
│  └─────────────┘  └────────────┘  └────────────────┘  │
│                                                         │
│  ┌─────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │ Businesses  │  │ Activities │  │ Admin          │  │
│  └─────────────┘  └────────────┘  └────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │    MongoDB       │
                  │                  │
                  │ users            │
                  │ businesses       │
                  │ leads            │
                  │ activities       │
                  │ sessions         │
                  └──────────────────┘
```

------------------------------------------------------------------------

# 5. Technology Stack

## Backend

  Technology          Purpose
  ------------------- ----------------------------
  Go 1.22             Backend language
  `net/http`          HTTP server and routing
  MongoDB Go Driver   MongoDB access
  Google OAuth 2.0    Authentication
  HTTP cookies        Session transport
  MongoDB TTL         Session expiration support

## Frontend

  Technology            Purpose
  --------------------- -------------------------
  HTML5                 Page structure
  CSS3                  Styling
  Vanilla JavaScript    Frontend logic
  ES Modules            JavaScript organization
  Chart/UI components   Dashboard visualization

## Database

MongoDB is used as the primary database.

Collections include:

``` text
users
businesses
leads
activities
sessions
```

------------------------------------------------------------------------

# 6. Repository Structure

``` text
ai-lead-management-saas/
│
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   │
│   ├── internal/
│   │   ├── config/
│   │   ├── database/
│   │   ├── handlers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── .env.example
│   ├── go.mod
│   └── go.sum
│
├── frontend/
│   ├── pages/
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── leads.html
│   │   ├── analytics.html
│   │   ├── settings.html
│   │   └── admin.html
│   │
│   ├── css/
│   │   ├── main.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── leads.css
│   │   └── admin.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── config.js
│   │   ├── dashboard.js
│   │   ├── leads.js
│   │   ├── analytics.js
│   │   ├── settings.js
│   │   ├── admin.js
│   │   └── utils.js
│   │
│   └── components/
│       └── sidebar.html
│
├── widget/
│   ├── lead-form.js
│   └── README.md
│
├── docs/
│   └── api.md
│
└── README.md
```

> File names can evolve as the project is cleaned up. The directories
> above describe the current architectural organization.

------------------------------------------------------------------------

# 7. Backend Architecture

The backend follows a layered structure:

``` text
HTTP Request
     │
     ▼
Middleware
     │
     ▼
Handler
     │
     ▼
Service
     │
     ▼
Database
```

### Example

``` text
POST /api/leads
      │
      ▼
Authentication Middleware
      │
      ▼
Lead Handler
      │
      ▼
Lead Service
      │
      ▼
MongoDB
      │
      ▼
Activity Service
      │
      ▼
JSON Response
```

This separation makes it easier to maintain and extend the application.

------------------------------------------------------------------------

# 8. Backend Entry Point

Main server entry:

``` text
backend/cmd/server/main.go
```

The startup process is approximately:

``` text
Load Configuration
      ↓
Connect to MongoDB
      ↓
Initialize OAuth
      ↓
Initialize Services
      ↓
Register Routes
      ↓
Apply Middleware
      ↓
Start HTTP Server
      ↓
Run Session Cleanup
      ↓
Graceful Shutdown
```

------------------------------------------------------------------------

# 9. Configuration

Configuration is loaded from environment variables.

Example:

``` env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=lead_management

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

SESSION_SECRET=replace-with-a-long-random-secret

ADMIN_EMAIL=admin@example.com

PORT=8080

FRONTEND_URL=http://localhost:3000

ALLOWED_ORIGINS=http://localhost:3000

ENVIRONMENT=development
```

## Required Configuration

### `MONGODB_URI`

MongoDB connection URI.

Example:

``` text
mongodb+srv://...
```

### `DATABASE_NAME`

MongoDB database name.

Example:

``` text
lead_management
```

### `GOOGLE_CLIENT_ID`

Google OAuth client ID.

### `GOOGLE_CLIENT_SECRET`

Google OAuth client secret.

### `SESSION_SECRET`

Secret intended for secure session-related configuration.

### `ADMIN_EMAIL`

Email used to identify the initial/admin account.

### `PORT`

Backend server port.

Default:

``` text
8080
```

### `FRONTEND_URL`

Frontend URL.

Example:

``` text
http://localhost:3000
```

### `ALLOWED_ORIGINS`

Allowed CORS origins.

### `ENVIRONMENT`

Example:

``` text
development
```

or:

``` text
production
```

------------------------------------------------------------------------

# 10. Database Architecture

## Users Collection

Conceptual structure:

``` json
{
  "_id": "ObjectId",
  "google_id": "google-user-id",
  "email": "user@example.com",
  "name": "User Name",
  "avatar": "https://...",
  "role": "user",
  "business_id": "ObjectId",
  "created_at": "datetime",
  "updated_at": "datetime",
  "last_login": "datetime",
  "is_active": true
}
```

Roles:

``` text
user
admin
```

------------------------------------------------------------------------

# 11. Business Collection

A business represents a SaaS tenant.

Conceptual structure:

``` json
{
  "_id": "ObjectId",
  "name": "Example Business",
  "domain": "example.com",
  "owner_id": "ObjectId",
  "member_ids": [],
  "plan": "free",
  "lead_limit": 100,
  "lead_count": 0,
  "widget_key": "unique-widget-key",
  "settings": {},
  "is_active": true
}
```

Supported plan concepts:

``` text
free
pro
enterprise
```

The current implementation primarily establishes the free-plan
foundation.

------------------------------------------------------------------------

# 12. Lead Collection

A lead represents a potential customer.

Conceptual fields:

``` json
{
  "_id": "ObjectId",
  "business_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91XXXXXXXXXX",
  "company": "Example Corp",
  "job_title": "Manager",

  "status": "new",
  "source": "website",

  "value": 50000,
  "notes": "",
  "tags": [],

  "message": "I would like to know more.",

  "ip_address": "...",
  "user_agent": "...",
  "referrer_url": "...",

  "created_at": "datetime",
  "updated_at": "datetime",
  "contacted_at": "datetime"
}
```

------------------------------------------------------------------------

# 13. Lead Status Pipeline

The lead pipeline is:

``` text
NEW
 │
 ▼
CONTACTED
 │
 ▼
QUALIFIED
 │
 ▼
PROPOSAL
 │
 ├──────────────► WON
 │
 └──────────────► LOST
```

This provides a basic CRM sales funnel.

------------------------------------------------------------------------

# 14. Lead Sources

The project supports the concept of multiple lead sources:

``` text
website
widget
manual
import
referral
```

This allows analytics such as:

``` text
Which channel produces the most leads?
Which channel produces the most qualified leads?
Which channel produces the most won leads?
```

------------------------------------------------------------------------

# 15. Activity Tracking

Lead actions can be represented through activities.

Example activity types:

``` text
created
updated
contacted
note
status_change
assigned
```

Example:

``` text
Lead Created
     ↓
Status Changed → Contacted
     ↓
Note Added
     ↓
Status Changed → Qualified
     ↓
Status Changed → Won
```

This creates an audit/history layer around lead management.

------------------------------------------------------------------------

# 16. Multi-Tenant Architecture

Lead Compass is designed as a multi-tenant SaaS.

The important relationship is:

``` text
User
  │
  ▼
Business/Tenant
  │
  ▼
Leads
```

Every lead is associated with a business:

``` text
lead.business_id
```

Authenticated lead queries are scoped to the current business.

Conceptually:

``` text
Business A
 ├── Lead 1
 ├── Lead 2
 └── Lead 3

Business B
 ├── Lead 4
 ├── Lead 5
 └── Lead 6
```

Business A should never receive Business B's lead records.

------------------------------------------------------------------------

# 17. Authentication

The application uses Google OAuth 2.0.

Flow:

``` text
User
  │
  ▼
Login Page
  │
  ▼
Continue with Google
  │
  ▼
Google OAuth
  │
  ▼
OAuth Callback
  │
  ▼
Find/Create User
  │
  ▼
Create Session
  │
  ▼
HTTP-only Cookie
  │
  ▼
Dashboard
```

------------------------------------------------------------------------

# 18. Session Management

Sessions are stored server-side.

Conceptual session structure:

``` json
{
  "user_id": "ObjectId",
  "token": "random-session-token",
  "expires_at": "datetime",
  "created_at": "datetime",
  "user_agent": "...",
  "ip": "..."
}
```

The intended session lifetime is approximately:

``` text
7 days
```

Expired sessions can be removed using MongoDB TTL support and
server-side cleanup.

------------------------------------------------------------------------

# 19. Authentication Middleware

Protected endpoints follow:

``` text
Request
  │
  ▼
Read Cookie / Authorization Header
  │
  ▼
Find Session
  │
  ▼
Validate Expiration
  │
  ▼
Find Active User
  │
  ▼
Attach User to Request Context
  │
  ▼
Handler
```

The implementation can accept a session token through the supported
authentication mechanisms.

------------------------------------------------------------------------

# 20. Authorization

The application distinguishes normal users from administrators.

Conceptually:

``` text
User
 └── Normal application access

Admin
 ├── Normal application access
 └── Admin endpoints
```

Admin access is checked server-side.

The admin role is associated with the configured administrator identity.

------------------------------------------------------------------------

# 21. REST API

## Authentication

### Start Google OAuth

``` http
GET /api/auth/google
```

### Google OAuth callback

``` http
GET /api/auth/google/callback
```

### Current user

``` http
GET /api/auth/me
```

### Logout

``` http
POST /api/auth/logout
```

------------------------------------------------------------------------

# 22. Lead API

## Create Lead

``` http
POST /api/leads
```

Example:

``` json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91XXXXXXXXXX",
  "company": "Example Corp",
  "job_title": "Manager",
  "message": "Interested in the product.",
  "source": "website",
  "value": 50000
}
```

------------------------------------------------------------------------

## List Leads

``` http
GET /api/leads
```

Typical use cases:

``` text
Search
Filtering
Pagination
Status filtering
Source filtering
```

------------------------------------------------------------------------

## Get Lead

``` http
GET /api/leads/{id}
```

------------------------------------------------------------------------

## Update Lead

``` http
PUT /api/leads/{id}
```

------------------------------------------------------------------------

## Change Lead Status

``` http
PATCH /api/leads/{id}/status
```

Example:

``` json
{
  "status": "qualified"
}
```

------------------------------------------------------------------------

## Delete Lead

``` http
DELETE /api/leads/{id}
```

------------------------------------------------------------------------

# 23. Dashboard API

``` http
GET /api/dashboard/stats
```

The dashboard can provide:

``` text
Total leads
New leads
Won leads
Conversion rate
Pipeline value
Recent leads
Leads by status
Leads by source
Monthly lead counts
```

------------------------------------------------------------------------

# 24. Conversion Rate

The basic conversion formula is:

\[ ConversionRate = `\frac{WonLeads}{TotalLeads}`{=tex}`\times100`{=tex}
\]

Example:

``` text
Total Leads = 100
Won Leads = 20
```

Therefore:

\[ ConversionRate = `\frac{20}{100}`{=tex}`\times100`{=tex} =20% \]

------------------------------------------------------------------------

# 25. Admin API

Conceptually available admin routes include:

``` http
GET /api/admin/users
GET /api/admin/stats
```

The users endpoint is intended to expose administrative user
information.

The admin statistics endpoint is currently a placeholder and should be
completed before treating it as a production feature.

------------------------------------------------------------------------

# 26. Frontend Pages

## Landing Page

``` text
frontend/pages/index.html
```

Introduces the product.

------------------------------------------------------------------------

## Login

``` text
frontend/pages/login.html
```

Provides Google login.

------------------------------------------------------------------------

## Dashboard

``` text
frontend/pages/dashboard.html
```

Provides an overview of:

``` text
Total Leads
New Leads
Won Leads
Conversion
Pipeline Value
Recent Leads
```

------------------------------------------------------------------------

## Leads

``` text
frontend/pages/leads.html
```

Main lead-management interface.

Typical operations:

``` text
Create
Search
Filter
View
Update
Change status
Delete
```

------------------------------------------------------------------------

## Analytics

``` text
frontend/pages/analytics.html
```

Displays lead trends and distribution.

Possible views include:

``` text
Monthly lead trends
Lead sources
Lead statuses
Conversion information
Pipeline value
```

------------------------------------------------------------------------

## Settings

``` text
frontend/pages/settings.html
```

Business/user settings such as:

``` text
Profile name
Business name
Business domain
Plan information
Lead usage
Widget key
```

------------------------------------------------------------------------

## Admin

``` text
frontend/pages/admin.html
```

Administrative interface for viewing user information.

------------------------------------------------------------------------

# 27. Frontend API Layer

The frontend centralizes API communication through:

``` text
frontend/js/api.js
```

Other JavaScript modules consume this API layer.

This reduces duplication and keeps HTTP calls separate from UI logic.

------------------------------------------------------------------------

# 28. Embeddable Widget

Lead Compass is designed to provide an embeddable lead form for external
websites.

Widget file:

``` text
widget/lead-form.js
```

Intended integration:

``` html
<script
  src="https://your-domain.com/widget/lead-form.js"
  data-key="YOUR_WIDGET_KEY">
</script>
```

Optional configuration can include a theme.

Example:

``` html
<script
  src="https://your-domain.com/widget/lead-form.js"
  data-key="YOUR_WIDGET_KEY"
  data-theme="dark">
</script>
```

------------------------------------------------------------------------

# 29. Widget User Experience

The intended experience is:

``` text
Visitor opens website
       │
       ▼
Floating Lead Compass button
       │
       ▼
Lead form opens
       │
       ├── Name
       ├── Email
       ├── Phone
       └── Message
       │
       ▼
Submit
       │
       ▼
Lead API
       │
       ▼
Business Lead Inbox
```

------------------------------------------------------------------------

# 30. Important Widget Limitation

The current widget implementation contains the UI and submission path,
but the backend does not yet fully persist widget submissions into the
`leads` collection.

Therefore, do **not** consider the widget's end-to-end lead capture
production-ready until the following flow is implemented:

``` text
widget_key
    ↓
Find Business
    ↓
Validate Business
    ↓
Validate Input
    ↓
Check Lead Limit
    ↓
Create Lead
    ↓
Create Activity
    ↓
Update Lead Count
    ↓
Return Created Lead
```

------------------------------------------------------------------------

# 31. Analytics Architecture

Analytics are derived from lead data.

Example:

``` text
MongoDB
   │
   ├── Count leads
   ├── Group by status
   ├── Group by source
   ├── Group by month
   └── Sum pipeline value
          │
          ▼
      Analytics API
          │
          ▼
       Dashboard
```

MongoDB aggregation is useful here because the analytics can be
calculated close to the stored data.

------------------------------------------------------------------------

# 32. Security Architecture

Current security foundations include:

### HTTP-only authentication cookie

Reduces direct JavaScript access to the session cookie.

### CORS

Controls allowed browser origins.

### Security headers

The backend includes security-oriented HTTP headers such as:

``` text
X-Content-Type-Options
X-Frame-Options
Referrer-Policy
Permissions-Policy
```

### Rate limiting

The backend contains rate-limiting support.

### Authentication middleware

Protected endpoints require an authenticated session.

### Tenant isolation

Lead queries are scoped by business.

------------------------------------------------------------------------

# 33. Rate Limiting

The application contains a general API rate-limiting mechanism.

The widget also has a dedicated rate-limiting implementation intended to
limit widget submissions.

However, the widget-specific middleware must be explicitly connected to
the widget route before considering that protection active.

------------------------------------------------------------------------

# 34. Data Flow --- Manual Lead

``` text
User
 │
 ▼
Leads Page
 │
 ▼
Create Lead Form
 │
 ▼
POST /api/leads
 │
 ▼
Authentication
 │
 ▼
Business Identification
 │
 ▼
Validation
 │
 ▼
Lead Service
 │
 ├── Insert Lead
 │
 ├── Update Lead Count
 │
 └── Create Activity
 │
 ▼
MongoDB
 │
 ▼
JSON Response
 │
 ▼
Frontend
```

------------------------------------------------------------------------

# 35. Data Flow --- Lead Status Change

``` text
User selects status
        │
        ▼
PATCH /api/leads/{id}/status
        │
        ▼
Authentication
        │
        ▼
Business Ownership Check
        │
        ▼
Validate Status
        │
        ▼
Update Lead
        │
        ▼
Create Activity
        │
        ▼
Return Response
```

------------------------------------------------------------------------

# 36. Data Flow --- Dashboard

``` text
Dashboard Page
      │
      ▼
GET /api/dashboard/stats
      │
      ▼
Authentication
      │
      ▼
Business ID
      │
      ▼
MongoDB Aggregations
      │
      ├── Total
      ├── New
      ├── Won
      ├── Status
      ├── Source
      ├── Monthly
      └── Pipeline Value
      │
      ▼
JSON
      │
      ▼
Dashboard UI
```

------------------------------------------------------------------------

# 37. Data Flow --- Future AI Pipeline

The intended future architecture can be:

``` text
New Lead
   │
   ▼
Normalize Data
   │
   ▼
AI Lead Understanding
   │
   ├── Intent
   ├── Urgency
   ├── Company relevance
   ├── Buying signals
   └── Customer requirements
   │
   ▼
AI Lead Score
   │
   ▼
HOT / WARM / COLD
   │
   ▼
Recommended Action
   │
   ├── Contact immediately
   ├── Send follow-up
   ├── Request more information
   └── Nurture
   │
   ▼
Sales Team
```

This is the intended AI evolution, not the current implementation.

------------------------------------------------------------------------

# 38. Proposed AI Lead Score

A future AI scoring system could combine:

``` text
Lead profile
+
Message semantics
+
Business context
+
Source
+
Engagement
+
Historical conversion data
```

Example conceptual score:

\[ S = w_1I + w_2U + w_3V + w_4E + w_5F \]

Where:

-   `I` = intent score
-   `U` = urgency
-   `V` = estimated value
-   `E` = engagement
-   `F` = historical fit
-   `w` = configurable weights

The implementation should not hard-code this formula until the
AI/product requirements are defined.

------------------------------------------------------------------------

# 39. Future AI Features

## AI Lead Scoring

Automatically classify:

``` text
HOT
WARM
COLD
```

------------------------------------------------------------------------

## Intent Detection

Detect intent from messages:

``` text
Pricing inquiry
Demo request
Product inquiry
Complaint
Support request
Partnership
General information
```

------------------------------------------------------------------------

## AI Summary

Convert long messages and lead history into a short sales summary.

Example:

``` text
Company:
ABC Technologies

Intent:
Enterprise purchase

Urgency:
High

Requirement:
50+ seats

Recommended action:
Contact within 2 hours
```

------------------------------------------------------------------------

## AI Follow-up

Generate personalized follow-up messages using:

``` text
Lead profile
Lead message
Company information
Current pipeline status
Previous interactions
```

------------------------------------------------------------------------

## AI Next-Best-Action

Recommend what the salesperson should do next.

------------------------------------------------------------------------

# 40. Current AI Status

There is currently no direct LLM integration.

The following are **not currently present as working AI components**:

``` text
OpenAI API
Gemini API
Claude API
Ollama integration
Embedding model
Vector database
RAG pipeline
Agent framework
ML classifier
AI scoring engine
```

If these are added later, they should be documented separately with
model, provider, cost, privacy, latency, and fallback information.

------------------------------------------------------------------------

# 41. Installation

## Prerequisites

Install:

-   Go 1.22+
-   MongoDB Atlas account or local MongoDB
-   Git
-   Modern web browser

For Google authentication:

-   Google Cloud project
-   OAuth credentials

------------------------------------------------------------------------

# 42. Clone the Repository

``` bash
git clone <repository-url>
cd ai-lead-management-saas
```

------------------------------------------------------------------------

# 43. Backend Setup

Move into the backend:

``` bash
cd backend
```

Download dependencies:

``` bash
go mod download
```

If the repository is missing required module metadata, run:

``` bash
go mod tidy
```

Then verify:

``` bash
go test ./...
```

and build:

``` bash
go build ./...
```

> The current ZIP should be dependency-cleaned before relying on a fresh
> build, because the inspected version has module/dependency metadata
> that needs reconciliation.

------------------------------------------------------------------------

# 44. Environment Setup

Create:

``` text
backend/.env
```

using the example configuration:

``` env
MONGODB_URI=mongodb+srv://...
DATABASE_NAME=lead_management

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

SESSION_SECRET=change-this-to-a-long-random-value

ADMIN_EMAIL=admin@example.com

PORT=8080

FRONTEND_URL=http://localhost:3000

ALLOWED_ORIGINS=http://localhost:3000

ENVIRONMENT=development
```

Never commit:

``` text
.env
```

to Git.

------------------------------------------------------------------------

# 45. MongoDB Setup

Create a MongoDB database.

Example database:

``` text
lead_management
```

The backend should connect using:

``` env
MONGODB_URI=...
DATABASE_NAME=lead_management
```

Recommended production setup:

``` text
MongoDB Atlas
+
Private credentials
+
IP/network restrictions
+
Database user with least required permissions
```

------------------------------------------------------------------------

# 46. Google OAuth Setup

In Google Cloud Console:

1.  Create/select a project.
2.  Configure the OAuth consent screen.
3.  Create OAuth credentials.
4.  Select a web application/client.
5.  Configure authorized origins.
6.  Configure the backend OAuth callback.
7.  Put the client ID and secret into `.env`.

The exact callback must match the backend's actual externally reachable
URL.

For local development, ensure the callback is routed to the **Go
backend**, not accidentally to the frontend server.

------------------------------------------------------------------------

# 47. Run Backend

From:

``` text
backend/
```

run:

``` bash
go run ./cmd/server
```

Expected server:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

# 48. Run Frontend

The frontend is static HTML/CSS/JavaScript.

A simple development server can be used.

For example:

``` bash
cd frontend
python -m http.server 3000
```

Then open:

``` text
http://localhost:3000
```

The frontend API configuration must point to the Go backend.

------------------------------------------------------------------------

# 49. Recommended Local Development Setup

``` text
Frontend
http://localhost:3000
        │
        │ HTTP API
        ▼
Backend
http://localhost:8080
        │
        │ MongoDB Driver
        ▼
MongoDB
```

------------------------------------------------------------------------

# 50. Environment Separation

Recommended:

``` text
Development
    ↓
.env.development

Production
    ↓
Secure platform environment variables
```

Do not put secrets directly into:

``` text
HTML
JavaScript
Git
README
Docker image source
```

------------------------------------------------------------------------

# 51. Testing Strategy

The project should eventually contain tests for:

## Authentication

``` text
OAuth state
Session creation
Session expiry
Logout
Unauthorized requests
```

## Leads

``` text
Create
Read
Update
Delete
Status update
Validation
Business isolation
```

## Analytics

``` text
Total counts
Status grouping
Source grouping
Monthly aggregation
Conversion rate
```

## Widget

``` text
Widget key validation
Input validation
Lead creation
Business lookup
Rate limiting
```

## Admin

``` text
Admin access
Non-admin rejection
User listing
Admin statistics
```

------------------------------------------------------------------------

# 52. Important Production Fixes

Before deployment, prioritize these fixes.

## Priority 1 --- Build

Ensure:

``` bash
go mod tidy
go test ./...
go build ./...
```

work on a clean machine.

------------------------------------------------------------------------

## Priority 2 --- OAuth

Correct the callback URL configuration.

------------------------------------------------------------------------

## Priority 3 --- Widget

Implement:

``` text
widget key
    ↓
business lookup
    ↓
lead creation
    ↓
activity creation
    ↓
lead count update
```

------------------------------------------------------------------------

## Priority 4 --- Widget Rate Limit

Actually attach the widget rate limiter to:

``` http
POST /api/widget/submit
```

------------------------------------------------------------------------

## Priority 5 --- Lead Limit

Enforce:

``` text
lead_count < lead_limit
```

before creating leads.

------------------------------------------------------------------------

## Priority 6 --- Admin Statistics

Implement real admin metrics.

------------------------------------------------------------------------

## Priority 7 --- Email

Add a transactional email provider if notifications are required.

------------------------------------------------------------------------

## Priority 8 --- Testing

Increase automated backend/API test coverage.

------------------------------------------------------------------------

# 53. Suggested Future SaaS Plans

A possible future pricing architecture:

  Feature                    Free            Pro   Enterprise
  ------------------ ------------ -------------- ------------
  Leads                   Limited   Higher limit       Custom
  Dashboard                   Yes            Yes          Yes
  Analytics                 Basic       Advanced     Advanced
  Widget                      Yes            Yes          Yes
  Team members            Limited           More       Custom
  AI scoring              Limited            Yes          Yes
  AI summaries            Limited            Yes          Yes
  AI follow-up         No/limited            Yes          Yes
  AI automation                No        Limited     Advanced
  API access              Limited            Yes          Yes
  Priority support             No            Yes          Yes

This table is a **future product proposal**, not a description of
currently enforced billing logic.

------------------------------------------------------------------------

# 54. Recommended Product Roadmap

## Phase 1 --- Stabilize Core

``` text
Build
Dependencies
OAuth
Database
Sessions
API validation
Tests
```

## Phase 2 --- Complete CRM

``` text
Lead management
Pipeline
Activities
Search
Filters
Pagination
Team management
```

## Phase 3 --- Complete Widget

``` text
Business widget keys
Lead submission
Validation
Rate limiting
Spam protection
Analytics
```

## Phase 4 --- Analytics

``` text
Lead source ROI
Conversion funnel
Pipeline value
Time-to-contact
Sales performance
```

## Phase 5 --- AI Intelligence

``` text
Lead scoring
Intent classification
Summarization
Entity extraction
Recommended actions
```

## Phase 6 --- AI Automation

``` text
Follow-up generation
Email automation
Lead routing
Lead nurturing
Sales assistant
```

## Phase 7 --- Advanced AI

``` text
Historical learning
Personalized scoring
Feedback loops
Prediction
Agentic workflows
```

------------------------------------------------------------------------

# 55. Future Advanced Architecture

The long-term architecture could become:

``` text
                         Lead Compass
                              │
          ┌───────────────────┼────────────────────┐
          │                   │                    │
          ▼                   ▼                    ▼
     Lead Capture        CRM / Pipeline       Analytics
          │                   │                    │
          └───────────────────┼────────────────────┘
                              │
                              ▼
                       AI Intelligence
                              │
             ┌────────────────┼─────────────────┐
             │                │                 │
             ▼                ▼                 ▼
        Lead Scoring     Intent Engine      Summarizer
             │                │                 │
             └────────────────┼─────────────────┘
                              │
                              ▼
                      Decision Engine
                              │
               ┌──────────────┼──────────────┐
               │              │              │
               ▼              ▼              ▼
          Next Action     Follow-up       Routing
               │              │              │
               └──────────────┼──────────────┘
                              ▼
                        Sales Team
```

------------------------------------------------------------------------

# 56. Privacy Considerations

Lead management involves potentially sensitive business and customer
information.

Production deployments should consider:

-   Data minimization
-   Encryption in transit
-   Secure database credentials
-   Access control
-   Tenant isolation
-   Audit logging
-   Data retention policies
-   Account deletion
-   Lead deletion
-   Export/delete requests
-   Privacy policy
-   Cookie policy
-   Third-party AI data processing disclosures

If an external LLM is introduced, determine whether customer lead data
is sent to the model provider and document that clearly.

------------------------------------------------------------------------

# 57. Production Deployment Architecture

A possible deployment:

``` text
                  Internet
                     │
                     ▼
              HTTPS / CDN
                     │
             ┌───────┴────────┐
             │                │
             ▼                ▼
        Frontend           Backend
        Static Host        Go Server
                              │
                              ▼
                         MongoDB Atlas
```

Potential hosting categories:

``` text
Frontend:
Static hosting/CDN

Backend:
Go-compatible cloud/server platform

Database:
MongoDB Atlas
```

The exact provider should be selected according to traffic, cost,
security, and deployment requirements.

------------------------------------------------------------------------

# 58. Production Checklist

Before launch:

``` text
[ ] go mod tidy
[ ] go test ./...
[ ] go build ./...
[ ] Fix OAuth callback
[ ] Configure production CORS
[ ] Configure HTTPS
[ ] Secure cookies
[ ] Verify tenant isolation
[ ] Verify widget persistence
[ ] Enable widget rate limiting
[ ] Enforce lead limits
[ ] Add request validation
[ ] Add error monitoring
[ ] Add structured logging
[ ] Configure MongoDB indexes
[ ] Configure backups
[ ] Test session expiry
[ ] Test logout
[ ] Test admin authorization
[ ] Test malicious/invalid IDs
[ ] Test duplicate leads
[ ] Test high-volume widget requests
[ ] Remove development secrets
[ ] Configure production environment variables
[ ] Add privacy policy
[ ] Add terms of service
```

------------------------------------------------------------------------

# 59. Troubleshooting

## Backend does not start

Run:

``` bash
go mod tidy
go test ./...
```

Then:

``` bash
go run ./cmd/server
```

Check:

``` text
MONGODB_URI
DATABASE_NAME
PORT
```

------------------------------------------------------------------------

## MongoDB connection fails

Verify:

``` text
MongoDB URI
Database credentials
Network access
IP allowlist
MongoDB user permissions
```

------------------------------------------------------------------------

## Google login fails

Check:

``` text
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
OAuth consent screen
Authorized origin
Authorized redirect URI
FRONTEND_URL
Backend callback route
```

The redirect URI must point to the actual Go backend callback endpoint.

------------------------------------------------------------------------

## Frontend cannot call backend

Check:

``` text
Frontend URL
Backend URL
CORS
API base URL
Port
Browser console
```

Expected local architecture:

``` text
Frontend → localhost:3000
Backend  → localhost:8080
```

------------------------------------------------------------------------

## Widget says success but lead is missing

This is a known current limitation.

Verify that the widget submission handler has been implemented to:

``` text
Find business
Create lead
Create activity
Update lead count
```

------------------------------------------------------------------------

# 60. Known Limitations

The current project should be considered a **prototype/foundation**, not
a production-ready AI SaaS.

Known limitations include:

1.  AI functionality is not implemented.
2.  Widget lead persistence needs completion.
3.  Widget-specific rate limiting needs route integration.
4.  OAuth callback configuration requires correction.
5.  Lead-plan limits need enforcement.
6.  Admin statistics are incomplete.
7.  Email notification functionality is not implemented.
8.  Team management is partial.
9.  Import functionality is incomplete.
10. Billing/subscriptions are not implemented.
11. Automated test coverage should be expanded.
12. Production hardening is still required.
13. Dependency metadata should be cleaned and verified.

------------------------------------------------------------------------

# 61. Product Vision

The ultimate goal of Lead Compass can be summarized as:

> **Collect every lead, understand every lead, prioritize every lead,
> and help the sales team take the right action at the right time.**

The system can evolve from:

``` text
Lead Management
```

into:

``` text
AI-Powered Revenue Intelligence
```

with the progression:

``` text
Capture
  ↓
Organize
  ↓
Track
  ↓
Analyze
  ↓
Understand
  ↓
Score
  ↓
Recommend
  ↓
Automate
  ↓
Learn
```

------------------------------------------------------------------------

# 62. Project Strengths

The strongest parts of the current foundation are:

### 1. Clear backend separation

``` text
handlers
services
models
database
middleware
routes
```

### 2. Multi-tenant foundation

``` text
business_id
```

is used to isolate data.

### 3. Server-side sessions

Better foundation than exposing long-lived authentication tokens to
frontend JavaScript.

### 4. CRM pipeline

The status model provides a useful base for sales workflows.

### 5. Analytics foundation

MongoDB aggregation can support increasingly sophisticated analytics.

### 6. Embeddable widget concept

This gives the SaaS a way to collect leads directly from customer
websites.

### 7. Extensible AI opportunity

Because leads, activities, businesses, and historical data already have
structured representations, an AI layer can be introduced without
redesigning the entire product.

------------------------------------------------------------------------

# 63. Recommended Next Development Order

Do not immediately add AI before fixing the core system.

Recommended order:

``` text
1. Dependency/build cleanup
        ↓
2. OAuth correction
        ↓
3. Widget persistence
        ↓
4. Widget rate limiting
        ↓
5. Lead-limit enforcement
        ↓
6. Admin completion
        ↓
7. Team management
        ↓
8. Testing
        ↓
9. Analytics improvements
        ↓
10. AI lead scoring
        ↓
11. AI intent detection
        ↓
12. AI summarization
        ↓
13. AI next-best-action
        ↓
14. AI follow-up generation
        ↓
15. AI agent/automation
```

------------------------------------------------------------------------

# 64. Final Project Summary

**Lead Compass** is a Go + MongoDB SaaS foundation for business lead
management.

The current platform provides:

``` text
Google Authentication
        +
Multi-Tenant Businesses
        +
Lead CRM
        +
Sales Pipeline
        +
Activity Tracking
        +
Dashboard
        +
Analytics
        +
Admin Area
        +
Embeddable Lead Widget
```

The major future differentiator is an AI intelligence layer capable of:

``` text
Understanding Leads
        ↓
Scoring Leads
        ↓
Detecting Intent
        ↓
Summarizing Context
        ↓
Recommending Actions
        ↓
Generating Follow-ups
        ↓
Automating Sales Workflows
```

The current repository should therefore be treated as the **core
SaaS/CRM foundation for an AI Lead Management product**, rather than as
a completed AI product.

------------------------------------------------------------------------

## License

Add the project's intended license here before public distribution.

Example:

``` text
MIT License
```

Only use the MIT license if the project owner intentionally chooses it.

------------------------------------------------------------------------

## Author

**Lead Compass --- AI Lead Management SaaS**

Built as a scalable foundation for intelligent lead management and
future AI-powered sales automation.
