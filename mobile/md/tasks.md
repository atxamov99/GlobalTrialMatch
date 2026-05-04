# Mobile — Vazifalar

## Boshlash
- [ ] `npx create-expo-app mobile --template blank-typescript`
- [ ] Kerakli paketlarni o'rnatish (plan.md dagi ro'yxat)
- [ ] `app.json` to'ldirish (bundleIdentifier, scheme, apiUrl)
- [ ] `src/theme.ts` — rang palitrasі
- [ ] `babel.config.js` — reanimated plugin

## Papkalar yaratish
- [ ] `app/(auth)/` — login, register
- [ ] `app/(tabs)/` — home, search, matches, profile
- [ ] `src/components/ui/` — Button, Input, Card, Badge
- [ ] `src/components/trial/` — TrialCard, EligibilityBar
- [ ] `src/stores/` — useAuthStore, usePatientStore
- [ ] `src/services/api.ts` — Axios instance
- [ ] `src/hooks/` — useTrials, useMatch

## Auth oqimi
- [ ] `app/_layout.tsx` — token tekshiruv, redirect
- [ ] `app/(auth)/login.tsx`
- [ ] `app/(auth)/register.tsx`
- [ ] Token MMKV ga saqlash
- [ ] Auto-refresh (401 → token yangilash)

## Bottom Tab
- [ ] `app/(tabs)/_layout.tsx` — 4 ta tab (Home, Search, Matches, Profile)
- [ ] Tab ikonlar (lucide-react-native yoki @expo/vector-icons)

## Home ekrani
- [ ] Salom xabari (user nomi bilan)
- [ ] Tez qidiruv input
- [ ] Oxirgi matchlar ro'yxati (horizontal scroll)
- [ ] "AI Match boshlash" tugmasi

## AI Match Wizard
- [ ] Qadam 1: Diagnoz input (autocomplete)
- [ ] Qadam 2: Yosh + mamlakat
- [ ] Qadam 3: Sog'liq holati (3 karta)
- [ ] Qadam 4: Dorilar/allergiyalar (optional)
- [ ] Qadam 5: Natijalar (TrialCard ro'yxati)
- [ ] StepIndicator komponenti

## Search ekrani
- [ ] Kalit so'z qidiruv
- [ ] Filtrlar: faza, mamlakat, status, kompensatsiya
- [ ] TrialCard ro'yxati
- [ ] Infinite scroll (pagination)

## Trial Detail
- [ ] Modal yoki alohida ekran
- [ ] To'liq ma'lumot: maqsad, talablar, joy, kontakt
- [ ] "Ariza berish" tugmasi
- [ ] "Saqlash" tugmasi

## Profile ekrani
- [ ] Shaxsiy ma'lumotlar (ism, email)
- [ ] Tibbiy profil (diagnoz, dori, allergiya)
- [ ] Sozlamalar (til, bildirishnomalar)
- [ ] Chiqish tugmasi

## Push bildirishnomalar
- [ ] `expo-notifications` sozlash
- [ ] Push token ni backendga yuborish
- [ ] Foreground + background handler

## Komponentlar
- [ ] `TrialCard.tsx` — match score ranglar bilan
- [ ] `EligibilityBar.tsx` — animatsiyali progress bar
- [ ] `Button.tsx` — primary, secondary, outline variantlar
- [ ] `Input.tsx` — label, error state
- [ ] `Badge.tsx` — status, phase ko'rsatish

## Test va Deploy
- [ ] iOS simulator da test
- [ ] Android emulator da test
- [ ] `expo build` / EAS Build
- [ ] TestFlight (iOS) yoki Play Console (Android)
