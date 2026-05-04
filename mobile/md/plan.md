# Mobile — Texnik Reja

**Stack:** Expo ~52 · React Native · expo-router · Zustand · React Query · MMKV  
**Asos:** Blink mobile arxitekturasi

---

## Papka tuzilmasi

```
mobile/
├── app/
│   ├── _layout.tsx          # Root layout — auth tekshiruv
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (tabs)/
│       ├── _layout.tsx      # Bottom tab bar
│       ├── index.tsx        # Home
│       ├── search.tsx       # Qidiruv
│       ├── matches.tsx      # AI matchlar
│       └── profile.tsx      # Profil
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   └── trial/
│   │       ├── TrialCard.tsx
│   │       └── EligibilityBar.tsx
│   ├── stores/
│   │   ├── useAuthStore.ts
│   │   └── usePatientStore.ts
│   ├── services/
│   │   └── api.ts           # Axios → backend URL
│   ├── hooks/
│   │   ├── useTrials.ts
│   │   └── useMatch.ts
│   └── theme.ts
├── assets/
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── app.json
├── package.json
├── babel.config.js
└── tsconfig.json
```

---

## app.json

```json
{
  "expo": {
    "name": "GlobalTrialMatch",
    "slug": "globaltrialmatch",
    "version": "1.0.0",
    "scheme": "gtm",
    "userInterfaceStyle": "light",
    "platforms": ["ios", "android"],
    "plugins": [
      "expo-router",
      ["expo-notifications", { "color": "#2563EB" }]
    ],
    "ios": {
      "bundleIdentifier": "com.globaltrialmatch.app",
      "supportsTablet": false
    },
    "android": {
      "package": "com.globaltrialmatch.app",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#2563EB"
      }
    },
    "extra": {
      "apiUrl": "https://your-backend.render.com/api/v1"
    }
  }
}
```

---

## Ekranlar

### Auth oqimi
| Ekran | Tavsif |
|-------|--------|
| `SplashScreen` | Token tekshiradi, yo'naltiradi |
| `OnboardingScreen` | 3 slayd — platforma tushuntirishi |
| `LoginScreen` | Email + parol |
| `RegisterScreen` | Email, parol, ism, rol (patient/clinic) |

### Bemor oqimi
| Ekran | Tavsif |
|-------|--------|
| `HomeScreen` | Salom, tez qidiruv, oxirgi matchlar |
| `AIMatchWizardScreen` | 5 qadam: diagnoz → natijalar |
| `SearchScreen` | Kalit so'z + filtrlar |
| `TrialDetailScreen` | To'liq tadqiqot ma'lumoti |
| `EligibilityCheckScreen` | "Siz mos kelasizmi?" |
| `ApplicationScreen` | Ariza berish formasi |
| `ApplicationsScreen` | Arizalarim + holatlari |
| `SavedScreen` | Saqlangan tadqiqotlar |
| `ProfileScreen` | Shaxsiy + tibbiy profil |
| `NotificationsScreen` | Yangi matchlar, ariza yangilanishlari |

### Klinika oqimi
| Ekran | Tavsif |
|-------|--------|
| `ClinicDashboardScreen` | Statistika |
| `ClinicPatientsScreen` | Bemorlar ro'yxati |
| `ClinicReferScreen` | Bemorni tadqiqotga yo'naltirish |

---

## Paketlar

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "expo-router": "~4.0.0",
    "react-native": "0.76.0",
    "@tanstack/react-query": "^5.60.0",
    "zustand": "^5.0.0",
    "axios": "^1.7.0",
    "react-native-mmkv": "^3.0.0",
    "expo-notifications": "~0.29.0",
    "expo-secure-store": "~14.0.0",
    "@gorhom/bottom-sheet": "^5.0.0",
    "react-native-reanimated": "~3.16.0",
    "react-native-gesture-handler": "~2.20.0",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.0.0"
  }
}
```

---

## Rang palitrasі (theme.ts)

```typescript
export const colors = {
  primary:    '#2563EB',   // Ko'k — asosiy tugmalar
  success:    '#10B981',   // Yashil — 70%+ moslik
  warning:    '#F59E0B',   // Sariq — 40-70% moslik
  danger:     '#EF4444',   // Qizil — <40% moslik
  bg:         '#F8FAFC',
  card:       '#FFFFFF',
  text:       '#1E293B',
  textLight:  '#64748B',
  border:     '#E2E8F0',
}
```

---

## EligibilityBar komponenti

```tsx
// 0-40: Qizil | 40-70: Sariq | 70-100: Yashil
<EligibilityBar score={87} />
// Ko'rsatadi: ████████░░ 87% — Yuqori moslik
```

---

## Push bildirishnomalar

| Holat | Bildirishnoma |
|-------|---------------|
| Yangi match | "Sizga mos 3 ta yangi tadqiqot topildi!" |
| Ariza qabul | "Pfizer tadqiqotiga arizangiz qabul qilindi ✅" |
| Ariza rad | "Afsuski, arizangiz rad etildi" |
| Muddat yaqin | "E'tibor: ariza muddati 3 kun qoldi!" |

---

## O'rnatish

```bash
npx create-expo-app mobile --template blank-typescript
cd mobile
npx expo install expo-router expo-notifications expo-secure-store
npm install @tanstack/react-query zustand axios react-native-mmkv
npm install @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler
```
