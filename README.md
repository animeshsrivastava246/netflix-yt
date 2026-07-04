# Netflix UI Clone

A high-performance, modern Netflix web interface clone built using **Vite**, **React**, and **TypeScript**, with **Tailwind CSS** for styling and **Firebase** for authentication and data storage.

## Key Features

- **TypeScript Conversion**: Fully typed codebase resolving previous JavaScript bugs and providing compile-time type-safety.
- **Glassmorphic Startup Warning Modal**: Warns users that the app is an educational clone with a premium backdrop blur design. Restricts display to once per session.
- **Dynamic Scrolling Glassmorphic Navbar**: Matches modern Netflix design. Blurs and changes background opacity smoothly on window scroll.
- **Responsive Layout**: Re-architected layouts for movie banners, pages, grids, and form screens to be completely responsive on mobile viewports.
- **Firebase Authentication & Firestore Sync**: Register, log in, manage credentials, and persist favorited movies/series in user documents.
- **TMDB API Integration**: Dynamically loads real-time upcoming, trending, top-rated, comedy, and popular shows.

---

## Directory Reorganization

The project structure is organized professionally to separate concerns:

```
src/
  assets/              # Custom brand fonts and graphics
  components/
    common/            # Reusable UI elements (e.g. Warning Modal)
    layout/            # Site structural wrapper (e.g. Navbar, ProtectedRoute)
    movies/            # Movie details and slider grids (e.g. Hero, MovieRow)
  context/             # Shared state controllers (e.g. AuthContext)
  pages/               # Site views (Home, Login, Signup, Profile)
  services/            # Third-party integrations (Firebase, TMDB endpoints)
```

---

## Setup & Running

This project prefers **Bun** for dependency and script execution.

### 1. Prerequisites
Ensure you have [Bun](https://bun.sh/) installed.

### 2. Environment Configuration
Create a `.env` file in the root folder of the project with your configurations:

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
Install all dependencies using Bun:
```bash
bun install
```

### 4. Running Local Development Server
Launch the development server:
```bash
bun run dev
```

### 5. Production Compilation
Perform static typescript compilation check followed by bundler packaging:
```bash
bun run build
```

---

## Technical Highlights
- **Firebase v12+ Compatibility**: Standardized modular SDK syntax across Auth and Firestore.
- **Overlay Gradients**: Built bottom-fade masks to cleanly merge movie imagery with page backgrounds.
- **Memory Optimization**: Auto-cleanups on Firestore `onSnapshot` updates to avoid background connection leaks.

---

## CI/CD & Deployment

This project uses **GitHub Actions** for automated building and deployment to Firebase Hosting. The workflows use **Bun** for rapid installation and compilation.

### GitHub Workflows
- **Pull Request Workflow** ([firebase-hosting-pull-request.yml](file:///.github/workflows/firebase-hosting-pull-request.yml)): Triggered on pull requests. Builds the application and deploys a temporary preview channel to Firebase Hosting for testing and verification.
- **Merge/Push Workflow** ([firebase-hosting-merge.yml](file:///.github/workflows/firebase-hosting-merge.yml)): Triggered on pushes or merges to `main` or `master` branches. Builds the application and deploys it directly to the live Firebase Hosting channel.

### Required GitHub Secrets
To enable the automated deployment pipeline, add the following two secrets to your GitHub repository settings under **Settings > Secrets and variables > Actions**:
1. `FIREBASE_SERVICE_ACCOUNT_NETFLIX_YT_1`: The JSON key of your Firebase Service Account (generated via Google Cloud Console / Firebase Service Accounts).
2. `ENV_FILE`: The entire contents of your local `.env` file containing all the TMDB and Firebase credentials.


