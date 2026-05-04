# Backend — Texnik Reja

**Stack:** TypeScript · Fastify · Drizzle ORM · Neon PostgreSQL · Upstash Redis

---

## Papka tuzilmasi

```
backend/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── db/
│   │   ├── index.ts
│   │   └── schema/
│   │       ├── index.ts
│   │       ├── users.ts
│   │       ├── patients.ts
│   │       ├── applications.ts
│   │       ├── saved-trials.ts
│   │       └── refresh-tokens.ts
│   ├── modules/
│   │   ├── auth/          (routes · schema · service)
│   │   ├── trials/        (routes · schema · service)
│   │   ├── match/         (routes · service)
│   │   ├── profile/       (routes · service)
│   │   ├── applications/  (routes · service)
│   │   └── saved/         (routes · service)
│   ├── plugins/
│   │   ├── db.ts
│   │   ├── jwt.ts
│   │   ├── redis.ts
│   │   └── cors.ts
│   └── utils/
│       ├── clinical-trials.ts
│       ├── ai-match.ts
│       └── errors.ts
├── drizzle/
├── drizzle.config.ts
├── package.json
├── tsconfig.json
└── .env
```

---

## .env

```env
DATABASE_URL=postgresql://neondb_owner:npg_L3Nl5rCcSxMu@ep-proud-smoke-aoqqw1lu-pooler.c-2.ap-southeast-1.aws.neon.tech/globaltrialmatch?sslmode=require&channel_binding=require

JWT_SECRET=TRVzJBeAcUgTYL16vNblAZlSfG5d2ymEjzoZeMKhW9ueljeloB-L68py66Rq-VS5
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

UPSTASH_REDIS_URL=https://cosmic-griffon-106903.upstash.io
UPSTASH_REDIS_TOKEN=gQAAAAAAAaGXAAIgcDJmZWVjNDc4MTAwYTQ0NTA0YjVlNGM2ZDEyMjcwM2I3MQ

ANTHROPIC_API_KEY=your_key_here
EXPO_ACCESS_TOKEN=your_expo_token_here

NODE_ENV=development
PORT=3000
ALLOWED_ORIGIN=http://localhost:5173
```

> Neon consoleda `globaltrialmatch` nomli yangi DB yarating: https://console.neon.tech

---

## Database Schema

### users
| Ustun | Tip | Izoh |
|-------|-----|------|
| id | uuid PK | |
| email | varchar(255) unique | |
| password_hash | text | |
| name | varchar(255) | |
| role | varchar(50) | `patient` \| `clinic` \| `admin` |
| created_at | timestamp | |

### patients (tibbiy profil)
| Ustun | Tip | Izoh |
|-------|-----|------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| date_of_birth | date | |
| country | varchar(100) | |
| diagnoses | text[] | `['Diabet', 'Gipertenziya']` |
| medications | text[] | |
| allergies | text[] | |
| blood_group | varchar(10) | |
| health_status | varchar(50) | `good \| fair \| poor` |

### applications (arizalar)
| Ustun | Tip | Izoh |
|-------|-----|------|
| id | uuid PK | |
| user_id | uuid FK | |
| trial_id | varchar(100) | ClinicalTrials.gov NCT ID |
| trial_title | text | |
| status | varchar(50) | `pending \| accepted \| rejected` |
| match_score | integer | 0-100 |
| created_at | timestamp | |

### saved_trials
| Ustun | Tip | Izoh |
|-------|-----|------|
| id | uuid PK | |
| user_id | uuid FK | |
| trial_id | varchar(100) | |
| trial_title | text | |
| saved_at | timestamp | |

### refresh_tokens
| Ustun | Tip | Izoh |
|-------|-----|------|
| id | uuid PK | |
| user_id | uuid FK | |
| token | text unique | |
| expires_at | timestamp | |

---

## API Endpoints

```
Auth
  POST  /api/v1/auth/register
  POST  /api/v1/auth/login
  POST  /api/v1/auth/refresh
  POST  /api/v1/auth/logout

Profile
  GET   /api/v1/profile
  PUT   /api/v1/profile
  PUT   /api/v1/profile/medical

Trials (ClinicalTrials.gov)
  GET   /api/v1/trials/search?q=diabetes&country=UZ&phase=3
  GET   /api/v1/trials/:id

AI Match
  POST  /api/v1/match          { diagnoses, age, country, healthStatus }

Applications
  GET   /api/v1/applications
  POST  /api/v1/applications
  PATCH /api/v1/applications/:id/status    (admin only)

Saved
  GET   /api/v1/saved
  POST  /api/v1/saved/:trialId
  DELETE /api/v1/saved/:trialId

Admin
  GET   /api/v1/admin/users
  GET   /api/v1/admin/applications
  GET   /api/v1/admin/stats
```

---

## O'rnatish

```bash
npm install fastify @fastify/jwt @fastify/cors @fastify/rate-limit
npm install drizzle-orm pg @upstash/redis axios bcryptjs dotenv zod
npm install @anthropic-ai/sdk
npm install -D typescript tsx drizzle-kit @types/pg @types/bcryptjs

npx drizzle-kit push   # DB da tablolar yaratadi
npm run dev
```

---

## Deploy

- **Render.com** — bepul tier, web service sifatida
- `npm run build` → `npm start`
- Environment variables ni Render dashboard ga kiritish
