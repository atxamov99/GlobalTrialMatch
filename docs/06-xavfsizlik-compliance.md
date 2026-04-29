# 🔒 Xavfsizlik va Compliance

---

## Nima Uchun Bu Muhim?

Tibbiy ma'lumotlar — eng maxfiy ma'lumot turi. Bir xatolik:
- **Huquqiy jazo:** HIPAA buzilishi uchun $100K – $1.9M jarima
- **Obro' yo'qotish:** bemorlar platformani tark etadi
- **Litsenziya bekor:** davlat ruxsatnomasiz faoliyat mumkin emas

---

## 📋 Asosiy Standartlar

| Standart | Qo'llaniladi | Nima talab qiladi |
|---|---|---|
| **HIPAA** | AQSh bozori | Tibbiy ma'lumotlarni shifrlash, audit log, access control |
| **GDPR** | Evropa bozori | Foydalanuvchi roziligi, ma'lumot o'chirish huquqi, DPA |
| **ISO 27001** | Global | Axborot xavfsizligi boshqaruvi tizimi |
| **SOC 2 Type II** | B2B mijozlar uchun | Xavfsizlik, mavjudlik, maxfiylik auditi |

---

## 🛡️ Texnik Xavfsizlik Choralari

### Ma'lumotlarni Saqlash
- Barcha tibbiy ma'lumotlar **AES-256** bilan shifrlangan (at rest)
- Ma'lumotlar bazasi alohida VPC ichida (internet bilan to'g'ridan-to'g'ri aloqa yo'q)
- Backup: har kuni, 30 kun saqlanadi, shifrlangan
- Bemorning ismi/email → **hashed** saqlanadi (de-identification)

### Uzatish Xavfsizligi
- Barcha API so'rovlari **TLS 1.3** (HTTPS) orqali
- API kalitlar **Secrets Manager** da (kodda yo'q)
- CORS faqat ruxsat etilgan domenlar uchun

### Autentifikatsiya
- Parol: **bcrypt** (12 round) bilan hashing
- Session: **JWT** (15 daqiqa) + Refresh token (30 kun)
- 2FA: ixtiyoriy (SMS yoki TOTP — Google Authenticator)
- OAuth: Google, Apple (uchinchi tomon parol saqlamaymiz)

### Access Control (Kim nimaga kira oladi?)
| Rol | Huquq |
|---|---|
| **Bemor** | Faqat o'z ma'lumotlariga kirish |
| **Klinika** | Faqat o'z yo'naltirgan bemorlar |
| **Admin** | Barchaga kirish (audit log bilan) |
| **API mijoz** | Faqat ruxsat etilgan endpointlar |

---

## 📜 Foydalanuvchi Huquqlari (GDPR)

Har bir foydalanuvchiga quyidagi huquqlar beriladi:

- **Ko'rish huquqi** — o'z barcha ma'lumotlarini yuklab olish (JSON)
- **O'chirish huquqi** — hisob va barcha ma'lumotlarni to'liq o'chirish (30 kun ichida)
- **Tuzatish huquqi** — noto'g'ri ma'lumotlarni yangilash
- **Ko'chirish huquqi** — ma'lumotlarni boshqa platformaga o'tkazish
- **E'tiroz huquqi** — marketing xabarlardan voz kechish

### Rozilik formasi (Consent) — majburiy elementlar:
- Qanday ma'lumotlar to'planadi
- Kim bilan ulashiladi (AI engine, farmatsevtika)
- Qancha muddat saqlanadi
- Qanday o'chirish mumkin

---

## 🔍 Audit va Monitoring

### Har bir amal logga yoziladi:
- Kim kirdi (user_id, IP, vaqt)
- Qaysi ma'lumotga kirdi
- Nima o'zgardi (before / after)

### Real-time monitoring:
- Shubhali faoliyat (bir minutda 100+ so'rov) → avtomatik bloklash
- Noma'lum joylashuvdan kirish → 2FA talab qilish
- Ma'lumotlar bazasiga to'g'ridan-to'g'ri kirish urinishi → alert

---

## 🏥 HIPAA Compliance Nazorat Ro'yxati

- [ ] Business Associate Agreement (BAA) barcha cloud provayderlar bilan
- [ ] Tibbiy ma'lumotlar faqat HIPAA-compliant serverlarda (AWS GovCloud)
- [ ] Xodimlar HIPAA treningidan o'tgan
- [ ] Yillik xavfsizlik auditi o'tkazilgan
- [ ] Buzilish (breach) holatida 60 kun ichida FDA ga xabar berish rejasi bor
- [ ] Minimum necessary principle — faqat kerakli ma'lumot olinadi

---

## 🌍 Ma'lumotlar Joylashuvi (Data Residency)

| Mintaqa | Server joyi | Sabab |
|---|---|---|
| O'rta Osiyo / MDH | AWS Frankfurt | GDPR + yaqin |
| AQSh | AWS us-east-1 | HIPAA compliant |
| Evropa | AWS eu-west-1 | GDPR talab |
| Osiyo | AWS ap-southeast-1 | Kam kechikish |

---

## 🚨 Favqulodda Holat Rejasi (Incident Response)

1. **Aniqlash** (0-1 soat) — monitoring alert, xodim xabar beradi
2. **Izolyatsiya** (1-4 soat) — ta'sirlangan tizim o'chiriladi
3. **Tergov** (4-24 soat) — qanday ma'lumot ta'sirlangani aniqlanadi
4. **Xabar berish** (24-72 soat) — ta'sirlangan foydalanuvchilarga email
5. **Tuzatish** (1-7 kun) — zaiflik bartaraf etiladi, patch chiqariladi
6. **Hisobot** (30 kun) — to'liq post-mortem, regulyatorga xabar
