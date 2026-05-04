# Frontend (Web) — Vazifalar

## Paketlar
- [ ] `@tanstack/react-query` qo'shish
- [ ] `zustand` qo'shish
- [ ] `react-hot-toast` qo'shish
- [ ] `lucide-react` qo'shish
- [ ] `react-hook-form` + `zod` + `@hookform/resolvers` qo'shish

## API qatlami
- [ ] `src/api/index.js` — baseURL ni backend URL ga yangilash
- [ ] `src/api/auth.js` — login, register, refresh, logout
- [ ] `src/api/trials.js` — search, getById
- [ ] `src/api/match.js` — AI matching
- [ ] `src/api/profile.js` — get, update, updateMedical
- [ ] `src/api/applications.js` — list, create
- [ ] `src/api/saved.js` — list, save, remove

## State (Zustand)
- [ ] `src/store/auth.js` — user, token, login, logout (mavjudni yangilash)
- [ ] `src/store/patient.js` — tibbiy profil, matchlar

## Komponentlar
- [ ] `src/components/trial/TrialCard.jsx` — match score ranglar bilan
- [ ] `src/components/trial/EligibilityBar.jsx` — 0-100 progress bar
- [ ] `src/components/ui/StepIndicator.jsx` — wizard uchun
- [ ] `src/components/ui/TagInput.jsx` — diagnoz/dori kiritish
- [ ] `src/components/admin/ProtectedRoute.jsx` — role tekshirish

## Yangi sahifalar
- [ ] `src/pages/AIMatchPage.jsx` — 5 qadam wizard
- [ ] `src/pages/TrialDetailPage.jsx` — NCT ID sahifasi
- [ ] `src/pages/MedicalProfilePage.jsx`
- [ ] `src/pages/admin/DashboardPage.jsx`
- [ ] `src/pages/admin/UsersPage.jsx`
- [ ] `src/pages/admin/ApplicationsPage.jsx`

## Mavjud sahifalarni yangilash
- [ ] `SavedPage.jsx` — saqlash/o'chirish tugmalari
- [ ] `ProfilePage.jsx` — tibbiy profil bo'limi qo'shish
- [ ] `ResultsPage.jsx` — filtrlar (faza, mamlakat, status)
- [ ] `DashboardPage.jsx` — "AI Match" tugmasini qo'shish

## Router
- [ ] `/match` → AIMatchPage
- [ ] `/trials/:id` → TrialDetailPage
- [ ] `/profile/medical` → MedicalProfilePage
- [ ] `/admin/*` → Admin sahifalar (role guard)

## Deploy
- [ ] `.env` da `VITE_API_URL` ni Render backend URL ga o'rnatish
- [ ] `npx vercel --prod`
