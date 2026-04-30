import { createContext, useContext, useState } from 'react'

const LANGS = {
  uz: {
    code: 'uz', label: "O'zbekcha",
    nav_search: 'Qidiruv',
    nav_apps: 'Arizalarim',
    logout: 'Chiqish',
    hero_title: 'Mos klinik tadqiqotni toping',
    hero_sub: 'Dunyo bo\'yicha 300,000+ tadqiqot ichidan AI sizga mosini topadi',
    search_label: 'Kasalligingiz / Diagnozing',
    search_placeholder: 'Masalan: diabet, gipertenziya, o\'pka saratoni...',
    age_label: 'Yoshingiz',
    gender_label: 'Jins',
    country_label: 'Mamlakat',
    gender_all: 'Ahamiyatsiz',
    gender_male: 'Erkak',
    gender_female: 'Ayol',
    search_btn: '🔍 Tadqiqot qidirish',
    searching: 'Qidirilmoqda...',
    login: 'Kirish',
    register: 'Ro\'yxatdan o\'tish',
    start_free: 'Bepul boshlash',
    my_apps: 'Mening Arizalarim',
    new_search: '+ Yangi qidiruv',
    apply: 'Ariza berish',
    cancel: 'Bekor qilish',
    pending: 'Kutilmoqda',
    accepted: 'Qabul qilindi',
    rejected: 'Rad etildi',
    back: '← Orqaga',
    no_apps: 'Hali ariza bermagansiz',
    no_trials: 'Mos tadqiqot topilmadi',
  },
  en: {
    code: 'en', label: 'English',
    nav_search: 'Search',
    nav_apps: 'My Applications',
    logout: 'Logout',
    hero_title: 'Find Your Clinical Trial',
    hero_sub: 'AI matches you to 300,000+ trials worldwide — free and fast.',
    search_label: 'Your Diagnosis',
    search_placeholder: 'E.g. diabetes, hypertension, lung cancer...',
    age_label: 'Your Age',
    gender_label: 'Gender',
    country_label: 'Country',
    gender_all: 'Any',
    gender_male: 'Male',
    gender_female: 'Female',
    search_btn: '🔍 Search Trials',
    searching: 'Searching...',
    login: 'Login',
    register: 'Sign Up',
    start_free: 'Get Started Free',
    my_apps: 'My Applications',
    new_search: '+ New Search',
    apply: 'Apply',
    cancel: 'Cancel',
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    back: '← Back',
    no_apps: 'No applications yet',
    no_trials: 'No matching trials found',
  },
  ru: {
    code: 'ru', label: 'Русский',
    nav_search: 'Поиск',
    nav_apps: 'Мои заявки',
    logout: 'Выйти',
    hero_title: 'Найдите подходящее клиническое исследование',
    hero_sub: 'ИИ подберёт вам из 300 000+ исследований по всему миру — бесплатно.',
    search_label: 'Ваш диагноз',
    search_placeholder: 'Например: диабет, гипертония, рак лёгких...',
    age_label: 'Ваш возраст',
    gender_label: 'Пол',
    country_label: 'Страна',
    gender_all: 'Не важно',
    gender_male: 'Мужской',
    gender_female: 'Женский',
    search_btn: '🔍 Найти исследования',
    searching: 'Поиск...',
    login: 'Войти',
    register: 'Зарегистрироваться',
    start_free: 'Начать бесплатно',
    my_apps: 'Мои заявки',
    new_search: '+ Новый поиск',
    apply: 'Подать заявку',
    cancel: 'Отменить',
    pending: 'Ожидает',
    accepted: 'Принято',
    rejected: 'Отклонено',
    back: '← Назад',
    no_apps: 'Заявок пока нет',
    no_trials: 'Подходящих исследований не найдено',
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const saved = localStorage.getItem('lang') || 'uz'
  const [lang, setLangCode] = useState(saved)

  const setLang = (code) => {
    localStorage.setItem('lang', code)
    setLangCode(code)
  }

  return (
    <LangContext.Provider value={{ lang: LANGS[lang], setLang, langs: Object.values(LANGS) }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
