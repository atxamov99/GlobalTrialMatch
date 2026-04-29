# 💰 Daromad Modeli va Texnik Arxitektura

---

## 💰 Daromad Modeli

### 1. 🏥 Pay-per-match (Tadqiqotchilardan komissiya)
- Har bir **muvaffaqiyatli** ro'yxatdan o'tgan ishtirokchi uchun: **$500 — $2,000**
- To'lovchi: Pfizer, Roche, Novartis, AstraZeneca va boshqa farmatsevtika kompaniyalar
- Xavf yo'q: faqat natija bo'lganda pul olinadi

### 2. 📊 SaaS — Klinikalar va Kasalxonalar uchun
| Tarif | Narx | Nima kiradi |
|---|---|---|
| **Starter** | $500/oy | 50 ta yo'naltirish/oy, asosiy dashboard |
| **Pro** | $2,000/oy | Cheksiz yo'naltirish, CRM integratsiya, hisobotlar |
| **Enterprise** | $5,000+/oy | White-label, API kirish, maxsus support |

### 3. 🔬 Premium API (B2B)
- Boshqa tibbiy platformalar, EHR tizimlari APIni ulaydi
- Litsenziya: **$10,000 — $100,000/yil**
- Misollar: Epic, Cerner, Meditech kabi tizimlar bilan integratsiya

### 4. 💊 Farmatsevtika reklama (kelajak)
- Tadqiqot egasi o'z tadqiqotini mos bemorlar oldida "featured" qilib ko'rsatishi
- CPM model: **$50–200 per 1,000 mos bemor**

### Daromad Prognozi

| Yil | Foydalanuvchilar | ARR |
|---|---|---|
| **Yil 1** | 1,000 | $120K |
| **Yil 2** | 15,000 | $1.5M |
| **Yil 3** | 100,000 | $10M |

---

## 🏗️ Texnik Arxitektura

```
┌─────────────────────────────────────────┐
│         FOYDALANUVCHI QATLAMI           │
│   React Native App  |  Web (React.js)   │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│              API GATEWAY                │
│        (Node.js / Express.js)           │
│   Auth | Rate Limit | Logging           │
└──────┬──────────────────────┬───────────┘
       │                      │
┌──────▼──────┐      ┌────────▼────────┐
│  AI ENGINE  │      │  BIZNES LOGIKA  │
│ Claude API  │      │  Match scoring  │
│ GPT-4 API   │      │  Eligibility    │
│ NLP Parser  │      │  Notification   │
└──────┬──────┘      └────────┬────────┘
       │                      │
┌──────▼──────────────────────▼───────────┐
│           MA'LUMOT MANBALARI            │
│  ClinicalTrials.gov API                 │
│  WHO International Clinical Trials API  │
│  EudraCT (Evropa)                       │
│  ANZCTR (Avstraliya/Yangi Zelandiya)    │
└──────────────────────────────────────   ┘
                   │
┌──────────────────▼──────────────────────┐
│           MA'LUMOTLAR BAZASI            │
│  PostgreSQL (bemorlar, matchlar)        │
│  Redis (kesh, session)                  │
│  S3 (fayllar, hujjatlar)               │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Qatlam | Texnologiya | Sabab |
|---|---|---|
| Server | Node.js + Express | Tez, keng ekotizim |
| Ma'lumotlar bazasi | PostgreSQL | Murakkab so'rovlar, HIPAA mos |
| Kesh | Redis | Tez matching natijalari |
| AI | Claude API (Anthropic) | Tibbiy tushunish, xavfsiz |
| Fayl saqlash | AWS S3 | HIPAA compliant |
| Auth | JWT + OAuth2 (Google, Apple) | Xavfsiz, qulay |
| Deploy | AWS / Railway | Ishonchli, HIPAA |

### Frontend / Mobile
| Qatlam | Texnologiya | Sabab |
|---|---|---|
| Mobile | React Native (Expo) | iOS + Android birga |
| Web | React.js + Vite | Tez, komponent bazali |
| State | Zustand | Yengil, oddiy |
| UI Kit | NativeWind + Tailwind | Tez dizayn |
| Navigator | React Navigation v6 | Standart |
| HTTP | Axios | Interceptor, retry |
| Notify | Expo Notifications | Push, local |

---

## 🗄️ Ma'lumotlar Bazasi Sxemasi (asosiy jadvallar)

```sql
-- Foydalanuvchilar
users (id, email, password_hash, role, created_at)

-- Bemor profili
patient_profiles (id, user_id, age, gender, country, city, diagnoses[], health_status)

-- Tadqiqotlar (ClinicalTrials.gov dan sinxronlangan)
trials (id, nct_id, title, sponsor, status, phase, conditions[], eligibility_criteria, locations[])

-- Matching natijalari
matches (id, patient_id, trial_id, score, matched_at, status)

-- Arizalar
applications (id, patient_id, trial_id, status, submitted_at, notes)

-- Klinikalar
clinics (id, name, country, subscription_plan, api_key)
```

---

## 🔄 API Endpointlari (asosiy)

```
POST   /api/auth/register          → Ro'yxatdan o'tish
POST   /api/auth/login             → Kirish
GET    /api/trials/search          → Tadqiqot qidirish
POST   /api/match                  → AI matching (bemor + tadqiqotlar)
GET    /api/match/:patientId       → Bemor uchun matchlar
POST   /api/applications           → Tadqiqotga ariza berish
GET    /api/clinics/dashboard      → Klinika statistikasi
POST   /api/clinics/refer          → Bemorni yo'naltirish
```

---

## 🗓️ Yo'l Xaritasi (yangilangan)

| Davr | Maqsad | KPI |
|---|---|---|
| **0-1 oy** | ClinicalTrials.gov API + AI matching prototip | Ishlaydi |
| **1-3 oy** | MVP: to'liq oqim, iOS + Android | 50 beta user |
| **3-6 oy** | 5 klinika SaaS, 1 farmatsevtika pilot | $10K MRR |
| **6-12 oy** | 10,000 foydalanuvchi, Evropa bozori | $100K ARR |
| **1-2 yil** | Series A, AQSh litsenziyasi | $5M ARR |
| **2-3 yil** | 100,000+ foydalanuvchi, 20 mamlakat | $20M ARR |
