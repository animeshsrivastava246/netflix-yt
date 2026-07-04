# 🎬 Netflix Premium UI Clone

A high-fidelity, production-ready Netflix web application built with **React**, **TypeScript**, and **Vite**. Styled with custom-tuned **Tailwind CSS** for cinematic animations, and integrated with **Firebase** for cloud authentication and database synchronization.

---

## ✨ Features

- **Tudum Logo Animation**: Custom cinematic splash screen displaying the iconic Netflix brand intro on initial load, complete with scaling soundwaves and ripple effects.
- **Buttery smooth UX**: Custom-tuned Bezier timing curves (`ease-butter`, `ease-spring`, etc.) driving premium hover zooms, sliding chevrons, fade-ins, and modal scale-ups.
- **Portalled Detail Modals**: High-performance movie details modals loaded using React Portals to guarantee layout escaping and scrollability on all screens.
- **Auto-Search Play Redirects**: Interactive Play buttons that launch a targeted Google search in a new tab for instant trailer and streaming options.
- **Intelligent Auth Gateways**: Automatic smart redirects to the secure login gateway if guest users attempt to favorite items.
- **Profile Synchronization**: Cloud-persisted watchlist for every account syncing instantly via Firebase Firestore snapshots.
- **Search Engine**: Real-time filtering of TMDB shows using asynchronous search debouncing and custom empty/skeleton state indicators.
- **SEO & Production Optimized**: Optimized Open Graph tags, responsive meta headers, and preloaded Netflix Sans brand fonts.
- **Code Health Score (100/100)**: Fully refactored codebase using SOLID principles, maintaining low cyclomatic/cognitive complexity verified via Fallow static analysis tools.

---

## 📂 Project Architecture

Concern separation is strictly maintained across components and context stores:

```
src/
  assets/              # Preloaded brand fonts & custom branding SVG assets
  components/
    common/            # Reusable UI elements (SplashScreen, warning modals)
    layout/            # Structural wrapper (Navbar, ProtectedRoute)
    movies/            # Movie details, cards, rows (Hero, MovieRow, MovieItem)
  context/             # State contexts (Firebase AuthContext session listener)
  pages/               # Core view sheets (Home, Login, Signup, Profile, Search)
  services/            # Integration services (Firebase client, TMDB endpoint mappings)
```

---

## 🛠️ Setup & Local Development

This project uses **Bun** for rapid package installation and script orchestration.

### 1. Prerequisites
Install [Bun](https://bun.sh/) on your system:
```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Environment Variables
Configure your credentials in a `.env` file at the root:
```env
VITE_TMDB_KEY=your_tmdb_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_API_ID=your_firebase_app_id
```

### 3. Installation
Install project dependencies:
```bash
bun install
```

### 4. Running Dev Server
Boot up the local Vite server:
```bash
bun run start
```

### 5. Static Verification & Production Build
Run TypeScript type-checks, ESLint analysis, complexity verification, and production compilation:
```bash
# Verify types
bunx tsc --noEmit

# Static quality & complexity checking
bun run lint

# Build production bundle
bun run build
```

---

## 🛡️ CI/CD Deployment

Automated pipelines are managed via **GitHub Actions** located in `.github/workflows/`:
- **PR Preview Channel**: Deploys transient test builds to Firebase Hosting on incoming Pull Requests.
- **Live Branch Merging**: Deploys stable builds directly to the production CDN upon merges to `main`.
