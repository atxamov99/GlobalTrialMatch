# GlobalTrialMatch — Global Reja

> "To'g'ri bemor + To'g'ri tadqiqot = Hayot saqlanadi"

---

## Loyiha nima?

AI yordamida bemorlarni dunyo bo'ylab klinik tadqiqotlarga ulash platformasi.

**Bemor:** Diagnozini kiritadi → AI mos tadqiqotlarni topadi → Ariza beradi → Bepul davolanadi + $500-5000 oladi  
**Tadqiqotchi:** Tez ishtirokchi topadi  
**Platforma:** Komissiya oladi

---

## Tech Stack

| Qism | Texnologiyalar |
|------|----------------|
| **Backend** | TypeScript · Fastify · Drizzle ORM · Neon PostgreSQL · Upstash Redis |
| **Web** | React 19 · Vite · React Query · Zustand · PWA |
| **Mobile** | Expo 52 · React Native · expo-router · Zustand · React Query |
| **AI** | Anthropic Claude API (matching + izoh) |
| **External API** | ClinicalTrials.gov v2 (bepul, API key shart emas) |

---

## Loyiha tuzilmasi

```
GlobalTrialMatch/
├── backend/        TypeScript + Fastify + Neon
│   └── md/         plan · tasks · done
├── frontend/       React + Vite + PWA
│   └── md/         plan · tasks · done
├── mobile/         Expo + React Native  ← SIZ qilasiz
│   └── md/         plan · tasks · done
├── docs/           Biznes hujjatlar
├── tasks/          Eski vazifalar
├── md/             ← Bu papka (global reja)
│   ├── plan.md
│   ├── tasks.md
│   └── done.md
├── PLAN.md         Texnik detallar (tokenlar, schema)
└── ROADMAP.md      Biznes yo'l xaritasi
```

---

## Muhim Tokenlar (Blinkdan olingan)

```env
# Neon PostgreSQL
DATABASE_URL=postgresql://neondb_owner:npg_L3Nl5rCcSxMu@ep-proud-smoke-aoqqw1lu-pooler.c-2.ap-southeast-1.aws.neon.tech/globaltrialmatch?sslmode=require&channel_binding=require

# JWT
JWT_SECRET=TRVzJBeAcUgTYL16vNblAZlSfG5d2ymEjzoZeMKhW9ueljeloB-L68py66Rq-VS5

# Upstash Redis
UPSTASH_REDIS_URL=https://cosmic-griffon-106903.upstash.io
UPSTASH_REDIS_TOKEN=gQAAAAAAAaGXAAIgcDJmZWVjNDc4MTAwYTQ0NTA0YjVlNGM2ZDEyMjcwM2I3MQ
```

> Neon da yangi database: https://console.neon.tech → New Database → `globaltrialmatch`

---

## Deploy infra (hammasi bepul)

| Servis | Platforma | URL |
|--------|-----------|-----|
| Backend | Render.com | `https://gtm-backend.render.com` |
| Web | Vercel | `https://globaltrialmatch.vercel.app` |
| Database | Neon | `console.neon.tech` |
| Redis | Upstash | `console.upstash.io` |
| Mobile | EAS Build / Expo Go | `expo.dev` |

---

## Bajarish bosqichlari

### Bosqich 1 — Backend qayta yozish (1-2 hafta)
Express.js + SQLite → TypeScript + Fastify + Neon

```
backend/md/tasks.md dagi vazifalarni bajaring
```

Natija: `https://gtm-backend.render.com` ishlaydi

---

### Bosqich 2 — Web yangilash (1 hafta)
AI Match Wizard + TrialDetail + Tibbiy profil + Admin panel

```
frontend/md/tasks.md dagi vazifalarni bajaring
```

Natija: `https://globaltrialmatch.vercel.app` yangi featurelar bilan

---

### Bosqich 3 — Mobile (2-3 hafta) — SIZ
Expo + React Native ilovasi (Blink arxitekturasi asosida)

```
mobile/md/tasks.md dagi vazifalarni bajaring
```

Natija: TestFlight / Play Console ga yuklangan ilova

---

## API arxitekturasi

```
Mobile / Web
     ↓
Backend (Fastify + TypeScript)
     ↓               ↓
ClinicalTrials.gov   Claude AI
     ↓               ↓
   Neon DB      Matching natijasi
     ↓
  Upstash Redis (cache)
```

---

## Asosiy featurelar

### MVP (hozir)
- [x] Foydalanuvchi ro'yxatdan o'tishi / kirishi
- [x] ClinicalTrials.gov qidiruv
- [x] Ariza berish
- [ ] AI matching (Claude) — to'liq ishlash
- [ ] Tibbiy profil
- [ ] Admin panel

### V2 (keyingi)
- [ ] Email bildirishnomalar
- [ ] Push bildirishnomalar (mobile)
- [ ] Klinika paneli
- [ ] Qidiruv tarixi
- [ ] Referral tizim

### V3 (kelajak)
- [ ] Shifokor paneli
- [ ] Chat / AI konsultatsiya
- [ ] PDF hisobotlar
- [ ] Premium obuna ($9/oy)

---

## Daromad modeli

| Model | Narx | Kim to'laydi |
|-------|------|--------------|
| Muvaffaqiyatli ishtirokchi | $500-2000/kishi | Farmatsevtika kompaniya |
| Klinika SaaS | $500-5000/oy | Klinikalar |
| Premium API | $10K-100K/yil | Tibbiy platformalar |
| Premium bemor | $9/oy | Bemorlar (erta qabul) |
