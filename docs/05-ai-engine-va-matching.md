# 🤖 AI Engine va Matching Algoritmi

---

## Qanday Ishlaydi?

    Bemor ma'lumot kiritadi
          ↓
    NLP: Diagnozni ICD-10 kodga aylantiradi
          ↓
    API: ClinicalTrials.gov + WHO + EudraCT dan tadqiqotlar olinadi
          ↓
    Eligibility Filter: Yosh, jins, mamlakat, diagnoz bo'yicha filtrlash
          ↓
    AI Scoring: Har bir tadqiqot uchun moslik foizi hisoblanadi (0-100)
          ↓
    Ranking: Eng mos tadqiqotlar yuqorida ko'rsatiladi
          ↓
    Explanation: "Nima uchun mos?" bemorning tilida tushuntiriladi

---

## 🧠 AI Scoring Algoritmi

Har bir match uchun **100 ballik tizim:**

| Mezon | Og'irlik | Izoh |
|---|---|---|
| Diagnoz mosligi | **40 ball** | ICD-10 kod bo'yicha to'liq / qisman moslik |
| Yosh diapazoni | **20 ball** | Tadqiqot yosh chegarasiga kiradi/kirmaydi |
| Geografik yaqinlik | **15 ball** | Bir mamlakat=15, qo'shni=10, boshqa=5 |
| Qo'shimcha kasalliklar | **15 ball** | Exclusion criteria ga mos kelmaslik |
| Tadqiqot holati | **10 ball** | Recruiting=10, Not yet recruiting=5 |

### Foiz talqini:
- **85-100%** → Kuchli mos — darhol ariza berish tavsiya etiladi
- **60-84%** → O'rtacha mos — qo'shimcha tekshiruv kerak
- **40-59%** → Qisman mos — doktor maslahati kerak
- **0-39%** → Mos emas — foydalanuvchiga ko'rsatilmaydi

---

## 📝 Claude API Prompt Dizayni

### Prompt 1 — Diagnozni ICD-10 ga aylantirish

**System:** Sen tibbiy AI bo'lib, bemorning og'zaki tilida yozilgan diagnozni rasmiy ICD-10 kodga aylantirib berasan. Faqat JSON qaytarasan.

**Misol:**
- Kirish: `"2-toifa diabet"`
- Chiqish: `{ "icd10": "E11", "name": "Type 2 diabetes mellitus", "confidence": 0.97 }`

**Qo'llab-quvvatlanadigan tillar:** O'zbek, Rus, Ingliz, Turk, Arab, Hind

---

### Prompt 2 — Eligibility tekshiruvi

**System:** Sen klinik tadqiqot eligibility mutaxassisisan. Bemorning ma'lumotlari va tadqiqot kriteriyalarini tahlil qilib, moslik foizini va sababini bemor tushunadigan oddiy tilda tushuntirib ber.

**Kirish:**
- Bemor: `{ yosh: 45, diagnoz: ["E11"], mamlakat: "UZ" }`
- Tadqiqot: `{ min_yosh: 18, max_yosh: 65, kasalliklar: ["diabetes"], joylar: ["Uzbekistan"] }`

**Chiqish:**
- score: 88
- mos: true
- sabab: "Siz 45 yoshddasiz — tadqiqot 18-65 yosh uchun. Diagnostingiz (2-toifa diabet) to'liq mos keladi. O'zbekistonda o'tkaziladi — siz ham O'zbekistondansiz."

---

### Prompt 3 — Bemorga tushuntirish (sodda til)

**System:** Tibbiy atamalarni bemor tushunadigan oddiy, samimiy tilda tushuntir. Qo'rqitma, rag'batlantirib yoz.

**Misol:**
- Asl: "Phase III randomized double-blind placebo-controlled trial for glycemic control"
- Sodda: "Bu tadqiqotda yangi dori qanchalik yaxshi qon shakarini boshqarishini tekshirishadi. Siz dori guruhiga yoki placebo guruhiga tasodifiy tanlansiz."

---

## 🔄 ClinicalTrials.gov API Integratsiyasi

### Asosiy endpoint:
    GET https://clinicaltrials.gov/api/v2/studies
    ?query.cond=diabetes
    &filter.geo=UZ
    &filter.overallStatus=RECRUITING
    &fields=NCTId,BriefTitle,EligibilityModule,LocationsModule
    &pageSize=50

### Olinadigan ma'lumotlar:
| Maydon | Nima uchun |
|---|---|
| `NCTId` | Tadqiqot unikal ID si |
| `BriefTitle` | Qisqa nom |
| `EligibilityModule` | Yosh, jins, inclusion/exclusion |
| `LocationsModule` | Qayerda o'tkazilishi |
| `StatusModule` | Recruiting / Completed / Terminated |
| `ConditionsModule` | Qaysi kasalliklar uchun |
| `SponsorModule` | Kim moliyalashtiradi |
| `ContactsLocationsModule` | Bog'lanish ma'lumotlari |

---

## ⚡ Tezlik Optimizatsiyasi

| Muammo | Yechim |
|---|---|
| API sekin javob beradi | Redis kesh — 24 soat saqlanadi |
| Ko'p bemor bir vaqtda qidiradi | Queue tizimi (Bull.js) |
| AI javob kechikadi | Streaming response — natijalar birin-ketin chiqadi |
| Tadqiqotlar eskirib qoladi | Har 6 soatda avtomatik yangilanadi (cron job) |

---

## 🔮 Kelajak: ML Model (6+ oy)

Etarli data to'planganidan keyin:
- **Feedback loop** — "Ariza berdim / bermdim" ma'lumotidan o'rganish
- **Muvaffaqiyat bashorati** — qaysi bemorlar tadqiqotdan o'tadigan ehtimoli
- **Personalizatsiya** — har bir bemor uchun individual scoring
- **Fine-tuned model** — tibbiy domein uchun maxsus LLM
