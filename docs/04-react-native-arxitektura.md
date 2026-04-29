# 📱 React Native — Ilova Arxitekturasi

---

## 📁 Loyiha Tuzilmasi

```
src/
├── app/                    # Root layout, navigation
├── screens/                # Barcha ekranlar
│   ├── auth/               # Kirish, ro'yxatdan o'tish
│   ├── onboarding/         # Birinchi ishga tushirish
│   ├── patient/            # Bemor oqimi
│   ├── results/            # Match natijalari
│   ├── trial/              # Tadqiqot tafsiloti
│   └── clinic/             # Klinika dashboard
├── components/             # Qayta ishlatiladigan komponentlar
│   ├── ui/                 # Tugma, Input, Card, Modal
│   ├── trial/              # TrialCard, EligibilityBar
│   └── shared/             # Header, Loader, EmptyState
├── navigation/             # Stack, Tab, Drawer navigatsiya
├── store/                  # Zustand state management
├── api/                    # Axios instance, API chaqiruvlari
├── hooks/                  # Custom hooklar
├── utils/                  # Yordamchi funksiyalar
├── constants/              # Ranglar, o'lchamlar, matnlar
└── types/                  # TypeScript interfeyslari
```

---

## 🗺️ Navigatsiya Tuzilmasi

```
RootNavigator
├── AuthStack (kirish bo'lmasa)
│   ├── SplashScreen
│   ├── OnboardingScreen (1-2-3 slayd)
│   ├── LoginScreen
│   └── RegisterScreen
│
└── MainStack (kirgan bo'lsa)
    ├── BottomTabNavigator
    │   ├── HomeTab
    │   │   └── HomeScreen (qidiruv + tavsiyalar)
    │   ├── SearchTab
    │   │   └── SearchScreen (filtr + qidirish)
    │   ├── MatchesTab
    │   │   └── MatchesScreen (saqlangan matchlar)
    │   └── ProfileTab
    │       └── ProfileScreen
    │
    └── ModalStack (ustiga chiqadigan)
        ├── TrialDetailScreen
        ├── EligibilityCheckScreen
        ├── ApplicationScreen
        └── ClinicDashboardScreen
```

---

## 📱 Ekranlar (Screens) — Batafsil

### 🔐 Auth oqimi
| Ekran | Nima qiladi |
|---|---|
| `SplashScreen` | Logo + loading, token tekshiradi |
| `OnboardingScreen` | 3 ta slayd: platforma nima, qanday ishlaydi, boshlash |
| `LoginScreen` | Email/parol, Google, Apple login |
| `RegisterScreen` | Email, parol, ism — bemor yoki klinika tanlash |

### 🏠 Asosiy oqim (Bemor)
| Ekran | Nima qiladi |
|---|---|
| `HomeScreen` | Salom xabari, tez qidiruv, oxirgi matchlar, yangiliklar |
| `PatientInputScreen` | Diagnoz, yosh, mamlakat, sog'liq holati kiritish (step-by-step) |
| `SearchScreen` | Kalit so'z + filtr (mamlakat, faza, holat) bo'yicha qidirish |
| `MatchesScreen` | AI topgan eng mos tadqiqotlar ro'yxati (score bo'yicha) |
| `TrialDetailScreen` | Tadqiqot to'liq ma'lumoti: maqsad, talablar, joy, kontakt |
| `EligibilityCheckScreen` | "Siz mos kelasizmi?" — savol-javob oqimi |
| `ApplicationScreen` | Ariza berish: ma'lumotlar, rozi bo'lish, yuborish |
| `ApplicationStatusScreen` | Ariza holati: kutilmoqda / qabul / rad |
| `ProfileScreen` | Shaxsiy ma'lumotlar, tibbiy tarix, sozlamalar |
| `NotificationsScreen` | Yangi matchlar, ariza yangilanishlari |

### 🏥 Klinika oqimi
| Ekran | Nima qiladi |
|---|---|
| `ClinicDashboardScreen` | Statistika: yo'naltirilgan bemorlar, muvaffaqiyat foizi |
| `ClinicPatientsScreen` | Bemorlar ro'yxati + holati |
| `ClinicReferScreen` | Bemorni tadqiqotga yo'naltirish |
| `ClinicTrialsScreen` | Klinika bilan bog'liq tadqiqotlar |

---

## 🧩 Asosiy Komponentlar

```tsx
// TrialCard — qidiruv natijasida ko'rsatiladi
<TrialCard
  title="Type 2 Diabetes AI Treatment Study"
  sponsor="Pfizer"
  location="Toshkent, O'zbekiston"
  phase="Phase 3"
  matchScore={87}          // AI moslik foizi
  compensation="$1,200"
  onPress={() => navigate('TrialDetail', { id })}
/>

// EligibilityBar — moslik foizini ko'rsatadi
<EligibilityBar score={87} />
// 0-40: Qizil | 40-70: Sariq | 70-100: Yashil

// DiagnosisInput — diagnoz kiritish (autocomplete)
<DiagnosisInput
  value={diagnosis}
  onSelect={(d) => setDiagnosis(d)}
  placeholder="Masalan: Diabet, Gipertenziya..."
/>

// StepIndicator — ko'p qadamli formalar uchun
<StepIndicator current={2} total={5} />
```

---

## 🗃️ State Management (Zustand)

```ts
// store/usePatientStore.ts
interface PatientStore {
  profile: PatientProfile | null
  matches: Trial[]
  savedTrials: Trial[]
  setProfile: (p: PatientProfile) => void
  fetchMatches: () => Promise<void>
  saveТrial: (id: string) => void
}

// store/useAuthStore.ts
interface AuthStore {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}
```

---

## 🎨 Dizayn Tizimi

### Rang Palitrasі
```ts
colors = {
  primary:    '#2563EB',   // Ko'k — asosiy tugmalar
  secondary:  '#10B981',   // Yashil — muvaffaqiyat, yuqori moslik
  warning:    '#F59E0B',   // Sariq — o'rta moslik
  danger:     '#EF4444',   // Qizil — past moslik, xato
  bg:         '#F8FAFC',   // Fon
  card:       '#FFFFFF',   // Karta foni
  text:       '#1E293B',   // Asosiy matn
  textLight:  '#64748B',   // Ikkinchi darajali matn
}
```

### Tipografiya
```ts
fonts = {
  heading1: { size: 28, weight: '700' },
  heading2: { size: 22, weight: '600' },
  body:     { size: 16, weight: '400' },
  caption:  { size: 12, weight: '400' },
}
```

---

## 🔔 Push Bildirishnomalar

| Holat | Bildirishnoma |
|---|---|
| Yangi match topildi | "Sizga mos 3 ta yangi tadqiqot topildi!" |
| Ariza holati o'zgardi | "Pfizer tadqiqotiga arizangiz qabul qilindi ✅" |
| Tadqiqot muddati yaqinlashdi | "E'tibor: ariza muddati 3 kun qoldi!" |
| Yangi tadqiqot qo'shildi | "Sizning diagnostingiz bo'yicha yangi tadqiqot boshlandi" |

---

## ♿ Accessibility (Maxsus Ehtiyojlar)

- Har bir element `accessibilityLabel` bilan
- Shrift o'lchami kattalashtirish qo'llab-quvvatlanadi
- Rang ko'r bemorlar uchun: ranglarga qo'shimcha ikonka + matn
- Screen reader (VoiceOver / TalkBack) uchun optimallashtirilgan

---

## 📦 Kerakli Paketlar (package.json)

```json
{
  "dependencies": {
    "expo": "~51.0.0",
    "react-native": "0.74.0",
    "expo-router": "^3.5.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@react-navigation/stack": "^6.3.0",
    "zustand": "^4.5.0",
    "axios": "^1.7.0",
    "nativewind": "^4.0.0",
    "expo-notifications": "~0.28.0",
    "expo-secure-store": "~13.0.0",
    "expo-location": "~17.0.0",
    "@gorhom/bottom-sheet": "^4.6.0",
    "react-native-reanimated": "~3.10.0",
    "react-native-gesture-handler": "~2.16.0",
    "@tanstack/react-query": "^5.40.0"
  }
}
```
