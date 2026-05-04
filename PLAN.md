# GlobalTrialMatch — To'liq Texnik Reja

> **Stack:** TypeScript + Fastify + Drizzle ORM + Neon PostgreSQL + Upstash Redis + React + Expo  
> **Blink loyihasidan olingan tokenlar va infra ishlatiladi**

---

## 🔑 Muhim Tokenlar va Kredensiallar

```env
# ── Database (Neon) ──────────────────────────────────────────────
DATABASE_URL=postgresql://neondb_owner:npg_L3Nl5rCcSxMu@ep-proud-smoke-aoqqw1lu-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# ── JWT ─────────────────────────────────────────────────────────
JWT_SECRET=TRVzJBeAcUgTYL16vNblAZlSfG5d2ymEjzoZeMKhW9ueljeloB-L68py66Rq-VS5
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ── Redis (Upstash) ──────────────────────────────────────────────
UPSTASH_REDIS_URL=https://cosmic-griffon-106903.upstash.io
UPSTASH_REDIS_TOKEN=gQAAAAAAAaGXAAIgcDJmZWVjNDc4MTAwYTQ0NTA0YjVlNGM2ZDEyMjcwM2I3MQ

# ── AI (Anthropic) ───────────────────────────────────────────────
ANTHROPIC_API_KEY=your_anthropic_api_key_here   # Hozirgi .env.example dan

# ── Push (Expo) ──────────────────────────────────────────────────
EXPO_ACCESS_TOKEN=your_expo_token_here

# ── App ──────────────────────────────────────────────────────────
NODE_ENV=development
PORT=3000
ALLOWED_ORIGIN=http://localhost:5173
```

> ⚠️ **Diqqat:** Neon DB hozirda Blink bilan umumiy. GlobalTrialMatch uchun **Neon da alohida database yoki schema yarating**.  
> Neon console: https://console.neon.tech — yangi database nomi: `globaltrialmatch`

---

## 📁 Papkalar Tuzilmasi (Oxirgi ko'rinish)

```
GlobalTrialMatch/
├── backend/          # Fastify + TypeScript (QAYTA YOZISH)
├── frontend/         # React + Vite (MAVJUD — yangilash)
├── mobile/           # Expo + React Native (YANGI — siz qilasiz)
├── docs/             # Mavjud hujjatlar
├── tasks/            # Vazifalar
├── PLAN.md           # Bu fayl
└── ROADMAP.md        # Biznes yo'l xaritasi
```

---

## 🏗️ 1-QISM: BACKEND (Fastify + TypeScript)

### Hozirgi holat
- Express.js + JavaScript + SQLite ✅ (ishlaydi)
- Qayta yozish kerak: TypeScript + Fastify + Neon PostgreSQL

### Papka tuzilmasi
```
backend/
├── src/
│   ├── server.ts           # Fastify server entry
│   ├── app.ts              # Plugin registratsiyasi
│   ├── db/
│   │   ├── index.ts        # Drizzle + Pool ulanish
│   │   └── schema/
│   │       ├── index.ts
│   │       ├── users.ts
│   │       ├── patients.ts
│   │       ├── trials.ts
│   │       ├── applications.ts
│   │       ├── saved-trials.ts
│   │       ├── matches.ts
│   │       └── refresh-tokens.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.schema.ts    # Zod validatsiya
│   │   │   └── auth.service.ts
│   │   ├── trials/
│   │   │   ├── trials.routes.ts
│   │   │   ├── trials.schema.ts
│   │   │   └── trials.service.ts  # ClinicalTrials.gov API
│   │   ├── match/
│   │   │   ├── match.routes.ts
│   │   │   └── match.service.ts   # AI matching (Claude API)
│   │   ├── profile/
│   │   │   ├── profile.routes.ts
│   │   │   └── profile.service.ts
│   │   ├── applications/
│   │   │   ├── applications.routes.ts
│   │   │   └── applications.service.ts
│   │   └── saved/
│   │       ├── saved.routes.ts
│   │       └── saved.service.ts
│   ├── plugins/
│   │   ├── db.ts            # Drizzle plugin
│   │   ├── jwt.ts           # @fastify/jwt plugin
│   │   ├── redis.ts         # Upstash Redis
│   │   └── cors.ts
│   └── utils/
│       ├── clinical-trials.ts   # ClinicalTrials.gov API wrapper
│       ├── ai-match.ts          # Claude API wrapper
│       └── errors.ts
├── drizzle/                 # Auto-generated migrations
├── drizzle.config.ts
├── package.json
├── tsconfig.json
└── .env
```

### Database Schema

```typescript
// users.ts
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 50 }).default('patient'), // patient | clinic | admin
  createdAt: timestamp('created_at').defaultNow(),
})

// patients.ts — bemor tibbiy profili
export const patients = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  dateOfBirth: date('date_of_birth'),
  country: varchar('country', { length: 100 }),
  diagnoses: text('diagnoses').array(),         // ['Type 2 Diabetes', 'Hypertension']
  medications: text('medications').array(),
  allergies: text('allergies').array(),
  bloodGroup: varchar('blood_group', { length: 10 }),
  healthStatus: varchar('health_status', { length: 50 }), // good | fair | poor
  updatedAt: timestamp('updated_at').defaultNow(),
})

// applications.ts — arizalar
export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  trialId: varchar('trial_id', { length: 100 }).notNull(), // ClinicalTrials.gov ID
  trialTitle: text('trial_title'),
  status: varchar('status', { length: 50 }).default('pending'), // pending | accepted | rejected
  matchScore: integer('match_score'),   // 0-100 AI moslik foizi
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// saved_trials.ts — saqlangan tadqiqotlar
export const savedTrials = pgTable('saved_trials', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  trialId: varchar('trial_id', { length: 100 }).notNull(),
  trialTitle: text('trial_title'),
  savedAt: timestamp('saved_at').defaultNow(),
})

// refresh_tokens.ts
export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

### API Endpoints

```
POST   /api/v1/auth/register          Ro'yxatdan o'tish
POST   /api/v1/auth/login             Kirish (JWT qaytaradi)
POST   /api/v1/auth/refresh           Access token yangilash
POST   /api/v1/auth/logout            Chiqish (refresh token o'chirish)

GET    /api/v1/profile                O'z profilini olish
PUT    /api/v1/profile                Profilni yangilash
PUT    /api/v1/profile/medical        Tibbiy profilni yangilash

GET    /api/v1/trials/search          ClinicalTrials.gov dan qidirish
GET    /api/v1/trials/:id             Tadqiqot tafsiloti

POST   /api/v1/match                  AI matching — bemor ma'lumotlari → mos tadqiqotlar

GET    /api/v1/applications           Mening arizalarim
POST   /api/v1/applications           Ariza berish
PATCH  /api/v1/applications/:id/status  Admin: ariza holatini o'zgartirish

GET    /api/v1/saved                  Saqlangan tadqiqotlar
POST   /api/v1/saved/:trialId         Saqlash
DELETE /api/v1/saved/:trialId         O'chirish

GET    /api/v1/admin/users            Admin: barcha foydalanuvchilar
GET    /api/v1/admin/applications     Admin: barcha arizalar
GET    /api/v1/admin/stats            Admin: statistika
```

### Backend O'rnatish (Qadamlar)

```bash
# 1. Backend papkasini tozalab TypeScript ga ko'chirish
cd backend
npm init -y
npm install fastify @fastify/jwt @fastify/cors @fastify/rate-limit
npm install drizzle-orm pg @upstash/redis axios bcryptjs dotenv zod
npm install @anthropic-ai/sdk
npm install -D typescript tsx drizzle-kit @types/pg @types/bcryptjs

# 2. .env faylni to'ldirish (yuqoridagi tokenlar bilan)

# 3. Database yaratish
npx drizzle-kit push

# 4. Dev rejimda ishga tushirish
npm run dev
```

---

## 🌐 2-QISM: WEB FRONTEND (React + Vite)

### Hozirgi holat
- React + Vite + PWA ✅ (ishlaydi)
- Mavjud: Landing, Auth (email+Google), Qidiruv, Ariza berish, 3 til
- Qo'shish kerak: AI matching UI, Profil (tibbiy), Admin panel, Push bildirishnomalar

### O'zgartirishlar

#### 1. Paketlar qo'shish
```bash
cd frontend
npm install @tanstack/react-query zustand @tanstack/react-query-devtools
npm install react-hot-toast       # Bildirishnomalar
npm install lucide-react          # Ikonlar
npm install react-hook-form zod @hookform/resolvers  # Forma validatsiya
```

#### 2. Yangi sahifalar
```
src/pages/
├── auth/
│   ├── Login.jsx        ✅ mavjud
│   └── Register.jsx     ✅ mavjud
├── home/
│   └── Home.jsx         ✅ mavjud (yangilash)
├── trials/
│   ├── Search.jsx       ✅ mavjud (filtrlar qo'shish)
│   └── TrialDetail.jsx  🆕 yangi sahifa
├── match/
│   └── AIMatch.jsx      🆕 AI matching wizard (step-by-step)
├── profile/
│   ├── Profile.jsx      🆕 shaxsiy ma'lumotlar
│   └── MedicalProfile.jsx  🆕 tibbiy profil (diagnoz, dori, allergiya)
├── applications/
│   └── Applications.jsx  ✅ mavjud (UI yaxshilash)
├── saved/
│   └── Saved.jsx         🆕 saqlangan tadqiqotlar
└── admin/
    ├── AdminDashboard.jsx  🆕 statistika
    ├── AdminUsers.jsx      🆕 foydalanuvchilar
    └── AdminApplications.jsx  🆕 arizalarni boshqarish
```

#### 3. AI Match Wizard (asosiy feature)
```jsx
// 5 ta qadam:
// 1. Diagnoz kiriting (autocomplete)
// 2. Yosh va mamlakat
// 3. Sog'liq holati
// 4. Dorilar va allergiyalar (ixtiyoriy)
// 5. Natijalar — match score bo'yicha tartiblangan tadqiqotlar
```

#### 4. TrialCard komponenti
```jsx
<TrialCard
  title="Type 2 Diabetes Study"
  sponsor="Pfizer"
  phase="Phase 3"
  location="Toshkent, O'zbekiston"
  matchScore={87}          // 0-100, ranglar: 70+ yashil, 40-70 sariq, 0-40 qizil
  compensation="$1,200"
  status="Recruiting"
  onSave={handleSave}
  onApply={handleApply}
/>
```

### Deployment (Vercel)
```bash
# Vercel ga deploy — mavjud vercel.json dan foydalanish
npx vercel --prod
# Backend Render.com ga — bepul tier ishlaydi
```

---

## 📱 3-QISM: MOBILE (Expo + React Native)

> **Bu qismni SIZ qilasiz** — Blink mobile arxitekturasi asosida

### Texnologiyalar (Blinkdan olingan)
- `expo` ~52.0.0
- `expo-router` ~4.0.0 (fayl asosidagi navigatsiya)
- `zustand` (state management)
- `@tanstack/react-query` (server state)
- `react-native-mmkv` (tez local storage)
- `expo-notifications` (push bildirishnomalar)
- `@gorhom/bottom-sheet` (bottom sheet UI)

### Papka tuzilmasi (Blinkdagi kabi)
```
mobile/
├── app/
│   ├── _layout.tsx          # Root layout + auth tekshiruvi
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (tabs)/
│       ├── _layout.tsx      # Bottom tab bar
│       ├── index.tsx        # Home — tez qidiruv + tavsiyalar
│       ├── search.tsx       # Qidiruv + filtrlar
│       ├── matches.tsx      # AI matches
│       └── profile.tsx     # Profil + sozlamalar
├── src/
│   ├── components/
│   │   ├── ui/              # Button, Input, Card, Badge
│   │   └── trial/
│   │       ├── TrialCard.tsx       # Tadqiqot kartasi
│   │       └── EligibilityBar.tsx  # Match % ko'rsatgich
│   ├── stores/
│   │   ├── useAuthStore.ts    # Token, user
│   │   └── usePatientStore.ts # Profil, matchlar
│   ├── services/
│   │   └── api.ts            # Axios instance → backend URL
│   ├── hooks/
│   │   ├── useTrials.ts      # React Query hooks
│   │   └── useMatch.ts
│   └── theme.ts              # Ranglar, font o'lchamlari
├── app.json
├── package.json
└── tsconfig.json
```

### Ekranlar
```
1. SplashScreen         → Token tekshiradi, yo'naltiradi
2. OnboardingScreen     → 3 slayd (platforma tushuntirishi)
3. LoginScreen          → Email + parol
4. RegisterScreen       → Email, parol, ism, rol tanlash

5. HomeScreen           → Salom, tez qidiruv, oxirgi matchlar
6. AIMatchWizardScreen  → 5 qadam: diagnoz → natijalar
7. SearchScreen         → Kalit so'z + filtrlar
8. TrialDetailScreen    → To'liq tadqiqot ma'lumoti
9. ApplicationScreen    → Ariza berish formasi
10. ApplicationsScreen  → Mening arizalarim (holatlari bilan)
11. SavedScreen         → Saqlangan tadqiqotlar
12. ProfileScreen       → Shaxsiy + tibbiy profil
13. SettingsScreen      → Til, bildirishnomalar, chiqish
```

### app.json (GlobalTrialMatch uchun)
```json
{
  "expo": {
    "name": "GlobalTrialMatch",
    "slug": "globaltrialmatch",
    "version": "1.0.0",
    "scheme": "gtm",
    "userInterfaceStyle": "light",
    "platforms": ["ios", "android"],
    "ios": { "bundleIdentifier": "com.globaltrialmatch.app" },
    "android": { "package": "com.globaltrialmatch.app" },
    "extra": {
      "apiUrl": "https://your-backend.render.com/api/v1"
    }
  }
}
```

### Rang palitrasі (GlobalTrialMatch dizayn)
```typescript
export const colors = {
  primary:   '#2563EB',   // Ko'k — asosiy
  success:   '#10B981',   // Yashil — yuqori moslik (70%+)
  warning:   '#F59E0B',   // Sariq — o'rta moslik (40-70%)
  danger:    '#EF4444',   // Qizil — past moslik (<40%)
  bg:        '#F8FAFC',
  card:      '#FFFFFF',
  text:      '#1E293B',
  textLight: '#64748B',
}
```

---

## 📅 Bajarish Tartibi (Prioritet)

### Bosqich 1 — Backend migratsiya (1-2 hafta)
- [ ] Backend papkasini TypeScript + Fastify ga ko'chirish
- [ ] `.env` faylni Blink tokenlar bilan to'ldirish
- [ ] Neon da `globaltrialmatch` database yaratish
- [ ] Drizzle schema yozib push qilish
- [ ] Auth routes (register/login/refresh/logout)
- [ ] Trials routes (ClinicalTrials.gov API)
- [ ] Match route (Claude AI)
- [ ] Profile, Applications, Saved routes
- [ ] Render.com ga deploy

### Bosqich 2 — Web yangilash (1 hafta)
- [ ] React Query + Zustand qo'shish
- [ ] AI Match Wizard sahifasi (5 qadam)
- [ ] TrialDetail sahifasi
- [ ] Tibbiy profil sahifasi
- [ ] Saqlangan tadqiqotlar UI
- [ ] Admin panel (asosiy)
- [ ] Vercel ga deploy

### Bosqich 3 — Mobile (2-3 hafta) — SIZ
- [ ] `mobile/` papkasini yaratish
- [ ] Expo loyihasini sozlash (Blink mobile dan nusxa)
- [ ] Auth oqimi (login/register)
- [ ] Home + AI Match wizard
- [ ] Search + Filters
- [ ] Trial Detail + Application
- [ ] Profile ekrani
- [ ] Push bildirishnomalar (Expo)
- [ ] TestFlight / Play Console ga yuklash

---

## 🔄 API Integration (Muhim)

### ClinicalTrials.gov v2 API
```typescript
// Bepul, API key shart emas
const BASE = 'https://clinicaltrials.gov/api/v2'

// Qidirish
GET /studies?query.cond={diagnosis}&query.locn={country}&pageSize=20

// Tafsilot
GET /studies/{nctId}
```

### Claude AI Matching
```typescript
// match.service.ts
const prompt = `
Patient profile:
- Diagnosis: ${diagnoses.join(', ')}
- Age: ${age}, Country: ${country}
- Health status: ${healthStatus}

Clinical trial:
- Title: ${trial.title}
- Criteria: ${trial.eligibilityCriteria}

Calculate eligibility score (0-100) and explain why in 1-2 sentences.
Return JSON: { score: number, reason: string }
`
```

---

## 🚀 Deploy Infra

| Servis | Platforma | Narx |
|--------|-----------|------|
| Backend | Render.com (bepul tier) | $0 |
| Frontend | Vercel (bepul) | $0 |
| Database | Neon (bepul 0.5GB) | $0 |
| Redis | Upstash (bepul 10k req/kun) | $0 |
| AI | Anthropic Claude API | Pay-per-use |

---

## ✅ Jami Holat

| Qism | Holat | Bajaruvchi |
|------|-------|-----------|
| Backend (Express+SQLite) | ✅ Ishlaydi | — |
| Backend (Fastify+Neon) | 🔄 Qayta yozish | Backend dev |
| Web frontend | ✅ Ishlaydi (yangilash kerak) | Frontend dev |
| Mobile app | 🆕 Boshlanmagan | **SIZ** |
