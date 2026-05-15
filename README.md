# Teach For India Volunteer Portal

A modern, responsive volunteer registration web application inspired by the [Teach For India](https://www.teachforindia.org/) design language. Built with React, Vite, Tailwind CSS, and Firebase.

## Features

- **Authentication** — Email/password signup and login via Firebase Auth
- **Two-step registration** — Personal details + preferences with validation
- **Autosave** — Form draft saved to localStorage as you type
- **Admin dashboard** — Search, filter by language/day, card + table views, CSV export
- **Dark mode** — Toggle with system preference detection
- **Responsive UI** — Mobile-first NGO-inspired design with toasts, skeletons, and empty states

## Tech Stack

- React 19 + Vite 6
- Tailwind CSS 4
- Firebase Authentication & Firestore
- React Router 7
- react-hot-toast, lucide-react

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Firebase Setup Guide

### Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** and follow the wizard
3. Enable **Google Analytics** (optional)

### Enable Authentication

1. In your project, go to **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in method**, enable **Email/Password**

### Create Firestore database

1. Go to **Build → Firestore Database**
2. Click **Create database** → start in **test mode** for development
3. Choose a region close to your users

### Register a web app

1. Project **Settings** (gear icon) → **Your apps** → **Web** (`</>`)
2. Register the app and copy the `firebaseConfig` values into `.env`

### Firestore security rules (production)

Replace test-mode rules with rules like:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /volunteers/{docId} {
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid;
      allow read: if request.auth != null
        && request.auth.token.email in [
          'admin@example.com'
        ];
      allow update, delete: if false;
    }
  }
}
```

Adjust admin emails to match `VITE_ADMIN_EMAILS`. For client-side admin checks, also restrict reads in rules.

### Firestore index

The admin query orders by `createdAt`. Firebase may prompt you to create a composite index on first load — follow the console link if needed.

### Admin access

Set admin emails in `.env`:

```
VITE_ADMIN_EMAILS=you@example.com,admin@teachforindia.org
```

Only these emails can access `/admin`.

### Collection structure

**Collection:** `volunteers`

| Field        | Type     | Description              |
|-------------|----------|--------------------------|
| uid         | string   | Firebase Auth user ID  |
| name        | string   | Full name                |
| email       | string   | Email address            |
| phone       | string   | Contact number           |
| dob         | string   | Date of birth (ISO date) |
| location    | string   | City / location          |
| languages   | array    | Languages spoken         |
| availability| array    | Weekdays available       |
| createdAt   | timestamp| Server timestamp         |

## Project Structure

```
src/
  components/     # Reusable UI, layout, forms, admin
  pages/          # Route-level pages
  firebase/       # Auth & Firestore helpers
  context/        # Auth & theme providers
  hooks/          # useAutosave, useVolunteers
  utils/          # Validation, CSV export, constants
```

## Deployment

### Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting   # select existing project, public: dist, SPA: yes
firebase deploy --only hosting
```

### Vercel

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables from `.env`
4. Deploy — `vercel.json` handles SPA routing

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build to `dist` |
| `npm run preview` | Preview production build |

## Design Tokens

| Token            | Value     |
|------------------|-----------|
| Primary Navy     | `#0B1F3A` |
| Accent Yellow    | `#F4C542` |
| Secondary Blue   | `#2563EB` |
| Background       | `#F8FAFC` |
| Card             | `#FFFFFF` |
| Text             | `#1E293B` |
| Muted            | `#64748B` |

## License

For educational and demonstration purposes. Teach For India is a registered trademark of its respective organization.
