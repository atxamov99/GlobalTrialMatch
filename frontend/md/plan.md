# Frontend (Web) — Texnik Reja

**Stack:** React 19 · Vite · React Query · Zustand · React Hook Form · PWA

---

## Mavjud sahifalar (ishlaydi)
| Sahifa | Fayl | Holat |
|--------|------|-------|
| Landing | `LandingPage.jsx` | ✅ |
| Login | `LoginPage.jsx` | ✅ |
| Register | `RegisterPage.jsx` | ✅ |
| Dashboard | `DashboardPage.jsx` | ✅ |
| Qidiruv natijalari | `ResultsPage.jsx` | ✅ |
| Arizalar | `ApplicationsPage.jsx` | ✅ |
| Saqlangan | `SavedPage.jsx` | ✅ (UI yaxshilash) |
| Profil | `ProfilePage.jsx` | ✅ (tibbiy ma'lumot yo'q) |

---

## Qo'shilishi kerak bo'lgan sahifalar
| Sahifa | Fayl | Tavsif |
|--------|------|--------|
| AI Match Wizard | `AIMatchPage.jsx` | 5 qadam: diagnoz → natijalar |
| Tadqiqot tafsiloti | `TrialDetailPage.jsx` | NCT ID bo'yicha to'liq ma'lumot |
| Tibbiy profil | `MedicalProfilePage.jsx` | Diagnoz, dori, allergiya, qon guruhi |
| Admin dashboard | `admin/DashboardPage.jsx` | Statistika, grafiklar |
| Admin foydalanuvchilar | `admin/UsersPage.jsx` | Ro'yxat + rolni o'zgartirish |
| Admin arizalar | `admin/ApplicationsPage.jsx` | Holat o'zgartirish |

---

## Qo'shilishi kerak bo'lgan paketlar

```bash
npm install @tanstack/react-query zustand
npm install react-hot-toast
npm install lucide-react
npm install react-hook-form zod @hookform/resolvers
```

---

## AI Match Wizard — 5 qadam

```
Qadam 1: Diagnoz kiriting
  → Autocomplete ro'yxat (Diabet, Gipertenziya, Onkologiya...)

Qadam 2: Yosh va Mamlakat
  → Tug'ilgan sana + mamlakat select

Qadam 3: Sog'liq holati
  → Yaxshi / O'rtacha / Yomon — 3 ta karta tanlash

Qadam 4: Dorilar va allergiyalar (ixtiyoriy)
  → Tag input (har bir dori/allergiyani qo'shish)

Qadam 5: Natijalar
  → Match score bo'yicha tartiblangan tadqiqotlar ro'yxati
  → Har bir tadqiqot: foiz + sababi (Claude izohi)
```

---

## TrialCard komponenti

```jsx
<TrialCard
  nctId="NCT04567890"
  title="Type 2 Diabetes AI Treatment Study"
  sponsor="Pfizer"
  phase="Phase 3"
  location="Toshkent, O'zbekiston"
  matchScore={87}        // 70+ yashil | 40-70 sariq | <40 qizil
  compensation="$1,200"
  status="Recruiting"
  onSave={handleSave}
  onApply={() => navigate(`/trials/${nctId}`)}
/>
```

---

## Rang palitrasі
```js
primary:   '#2563EB'   // Ko'k
success:   '#10B981'   // Yashil (yuqori moslik)
warning:   '#F59E0B'   // Sariq (o'rta moslik)
danger:    '#EF4444'   // Qizil (past moslik)
bg:        '#F8FAFC'
```

---

## Routing tuzilmasi

```
/                    → LandingPage
/login               → LoginPage
/register            → RegisterPage
/dashboard           → DashboardPage (protected)
/match               → AIMatchPage (protected)
/results             → ResultsPage
/trials/:id          → TrialDetailPage
/profile             → ProfilePage (protected)
/profile/medical     → MedicalProfilePage (protected)
/applications        → ApplicationsPage (protected)
/saved               → SavedPage (protected)
/admin               → AdminDashboard (admin only)
/admin/users         → AdminUsersPage
/admin/applications  → AdminApplicationsPage
```

---

## Deploy

- **Vercel** — `vercel.json` mavjud, `npx vercel --prod`
- API URL ni `VITE_API_URL` env ga qo'yish
