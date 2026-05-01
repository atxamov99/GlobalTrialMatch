# GlobalTrialMatch — Keyingi qadamlar (Roadmap)

## Hozir mavjud ✅
- Landing page (Header + Hero + Features + Footer)
- Ro'yxatdan o'tish / Kirish (email + parol)
- Google OAuth (kirish)
- Klinik tadqiqot qidirish (ClinicalTrials.gov API)
- Ariza berish va arizalarni kuzatish
- 3 til: O'zbekcha / English / Русский
- PWA — telefonga o'rnatish imkoni
- Oq-yashil dizayn, responsive

---

## 🔴 Muhim (birinchi navbatda)

### 1. AI Matching (aqlli moslashtirish)
- Hozir oddiy qidiruv ishlayapti
- Anthropic Claude API orqali bemorning ma'lumotlarini tahlil qilib, **mos % ball** berish
- "Bu tadqiqot sizga 87% mos, chunki..." degan izoh
- **Fayl:** `backend/src/routes/match.js` (allaqachon bor, to'ldirish kerak)

### 2. Bemor profili
- Kasallik tarixi, dorilar, allergiyalar, qon guruhi
- Bir marta to'ldiriladi → qidiruv avtomatik shaxsiylashadi
- **Fayl:** `backend/src/routes/profile.js` (allaqachon bor)

### 3. Email bildirishnomalar
- Ariza holati o'zgarganda email yuborish
- "Arizangiz qabul qilindi" / "Rad etildi"
- **Paket:** `nodemailer` + Gmail SMTP yoki Resend.com (bepul 3000 email/oy)

### 4. Saqlangan tadqiqotlar
- Yoqtirgan tadqiqotlarni "Saqlash" tugmasi
- **Fayl:** `backend/src/routes/saved.js` (allaqachon bor, UI kerak)

---

## 🟡 Muhim (ikkinchi navbatda)

### 5. Admin panel
- Barcha arizalarni ko'rish
- Ariza holatini o'zgartirish: `pending → accepted / rejected`
- Foydalanuvchilar ro'yxati
- Statistika: nechta ariza, qaysi kasalliklar ko'p
- **Route:** `/admin` (faqat `role=admin` uchun)

### 6. Qidiruv tarixi
- Oxirgi 10 ta qidiruv saqlanadi
- Bir bosishda qaytadan qidirish
- localStorage yoki ma'lumotlar bazasida

### 7. Tadqiqot tafsilotlari sahifasi
- `/trials/:id` — alohida sahifa
- To'liq ma'lumot: maqsad, talablar, muddatlar, kontaktlar
- "Ariza berish" tugmasi

### 8. Filtrlar (qidiruv sahifasida)
- Faza (Phase 1, 2, 3)
- Status (Recruiting, Active)
- Masofa (yaqin joylar)
- Kompensatsiya bor/yo'q

---

## 🟢 Qo'shimcha (kelajak)

### 9. Push bildirishnomalar
- Yangi mos tadqiqot chiqqanda xabar berish
- PWA push notification (service worker orqali)
- **Xizmat:** Firebase Cloud Messaging (bepul)

### 10. Ko'p tilli tadqiqot mazmuni
- Tadqiqot nomini tarjima qilish (DeepL API yoki Claude)
- Hozir inglizcha keladi — O'zbek/Rus tilida ko'rsatish

### 11. Shifokor / Klinika panel
- Shifokorlar o'z bemorlarini platforma orqali tadqiqotlarga yo'naltiradi
- `role=doctor` profil turi

### 12. Chat / Konsultatsiya
- Bemorlar savollarini yozadi
- AI (Claude) dastlabki javob beradi
- Keyinchalik tibbiy mutaxassis javoblaydi

### 13. Statistika va hisobotlar
- Foydalanuvchi o'z arizalari grafigini ko'radi
- Oylik hisobot PDF sifatida yuklab olish

### 14. Referral tizimi
- "Do'stingizni taklif qiling → $10 bonus"
- Har bir muvaffaqiyatli ro'yxatdan o'tish uchun ball

### 15. Mobil ilova (ixtiyoriy)
- PWA yetarli, lekin App Store ga chiqarish kerak bo'lsa
- React Native / Expo bilan qayta yozish

---

## 🔧 Texnik yaxshilashlar

| Narsa | Hozirgi holat | Yaxshilash |
|---|---|---|
| Ma'lumotlar bazasi | SQLite (fayl) | PostgreSQL (Render bepul tier) |
| Autentifikatsiya | JWT | + Refresh token |
| API rate limiting | Yo'q | `express-rate-limit` |
| Xatolik kuzatuvi | Yo'q | Sentry.io (bepul) |
| Testlar | Yo'q | Jest + Supertest |
| API docs | Yo'q | Swagger UI |

---

## 📊 Biznes imkoniyatlari

| Model | Qanday ishlaydi |
|---|---|
| **Bepul** | Qidiruv bepul, ariza berish bepul |
| **Premium ($9/oy)** | AI matching, email bildirishnoma, ariza tarixi |
| **Klinikalar uchun** | Klinika o'z tadqiqotlarini joylashtiradi ($99/oy) |
| **Affiliate** | Muvaffaqiyatli ishtirokchi uchun klinikadan komissiya |

---

## Prioritet tartib

```
1. Bemor profili (hoziroq)
2. AI matching to'liq ishlashi
3. Email bildirishnomalar
4. Admin panel
5. Saqlangan tadqiqotlar UI
6. Push bildirishnomalar
7. Shifokor panel
```
