import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import UserMenu from '../components/UserMenu.jsx'

const FEATURES = [
  { icon: '🤖', title_uz: 'AI Matching', title_en: 'AI Matching', title_ru: 'ИИ Подбор', desc_uz: 'Sun\'iy intellekt siz uchun 300,000+ tadqiqot ichidan eng mos variantlarni tanlaydi.', desc_en: 'Our AI engine finds the best trials from 300,000+ studies matched to your profile.', desc_ru: 'ИИ подбирает лучшие исследования из 300 000+ по вашему профилю.' },
  { icon: '🌍', title_uz: 'Global Qamrov', title_en: 'Global Reach', title_ru: 'Глобальный охват', desc_uz: '50+ mamlakat bo\'yicha ClinicalTrials.gov ma\'lumotlar bazasiga to\'liq kirish.', desc_en: 'Full access to ClinicalTrials.gov database across 50+ countries.', desc_ru: 'Полный доступ к базе ClinicalTrials.gov по 50+ странам.' },
  { icon: '💰', title_uz: 'Kompensatsiya', title_en: 'Compensation', title_ru: 'Компенсация', desc_uz: 'Ko\'pgina tadqiqotlar ishtirokchilarga $500 dan $5,000 gacha to\'laydi.', desc_en: 'Many trials pay participants $500–$5,000 for their participation.', desc_ru: 'Многие исследования платят участникам от $500 до $5 000.' },
  { icon: '🔒', title_uz: 'Xavfsizlik', title_en: 'Privacy First', title_ru: 'Конфиденциальность', desc_uz: 'Tibbiy ma\'lumotlaringiz shifrlangan, uchinchi shaxslarga berilmaydi.', desc_en: 'Your medical data is encrypted and never shared with third parties.', desc_ru: 'Ваши медданные зашифрованы и никому не передаются.' },
]

const STEPS_UZ = [
  { num: '01', title: 'Profilingizni yarating', desc: 'Kasalligingiz, yoshingiz va joylashuvingizni kiriting.' },
  { num: '02', title: 'AI qidiradi', desc: 'Tizim 300K+ tadqiqot ichidan sizga moslarini topadi.' },
  { num: '03', title: 'Ariza bering', desc: 'Mos tadqiqotga to\'g\'ridan to\'g\'ri ariza yuboring.' },
]
const STEPS_EN = [
  { num: '01', title: 'Create your profile', desc: 'Enter your diagnosis, age, and location.' },
  { num: '02', title: 'AI searches for you', desc: 'The system finds matching trials from 300K+ studies.' },
  { num: '03', title: 'Apply directly', desc: 'Submit your application to matching trials instantly.' },
]
const STEPS_RU = [
  { num: '01', title: 'Создайте профиль', desc: 'Укажите диагноз, возраст и местоположение.' },
  { num: '02', title: 'ИИ ищет за вас', desc: 'Система находит совпадения из 300K+ исследований.' },
  { num: '03', title: 'Подайте заявку', desc: 'Отправьте заявку напрямую в исследование.' },
]

const STEPS_MAP = { uz: STEPS_UZ, en: STEPS_EN, ru: STEPS_RU }

const TEXT = {
  uz: {
    badge: '🚀 AI-powered klinik tadqiqot tizimi',
    hero_title_1: 'Kasalligingizga mos',
    hero_title_2: 'klinik tadqiqot',
    hero_title_3: 'toping',
    hero_sub: 'Dunyo bo\'yicha <strong>300,000+</strong> tadqiqot ichidan sun\'iy intellekt sizga <strong>bepul</strong> eng mos variantni topadi. Kompensatsiya imkoniyatlari bilan.',
    cta_main: 'Bepul boshlash →',
    cta_sec: 'Hisobga kirish',
    dashboard: 'Qidirishni boshlash →',
    pill1: '✅ Ro\'yxatdan o\'tish bepul',
    pill2: '✅ Kredit karta kerak emas',
    pill3: '✅ 2 daqiqada natija',
    feat_tag: 'Imkoniyatlar',
    feat_title: 'Nega GlobalTrialMatch?',
    feat_sub: 'Boshqa platformalardan farqli o\'laroq, biz bemorlarni birinchi o\'ringa qo\'yamiz.',
    steps_tag: 'Jarayon',
    steps_title: '3 oddiy qadam',
    steps_sub: 'Klinik tadqiqot topish hech qachon bu qadar oson bo\'lmagan.',
    cta_title: 'Bugun boshlang — bepul',
    cta_sub: 'Sizga mos tadqiqot bir necha daqiqada topiladi.',
    cta_reg: 'Hoziroq ro\'yxatdan o\'ting',
    cta_login: 'Allaqachon hisob bormi? Kirish',
    footer_tagline: 'Bemorlarni dunyo bo\'yicha klinik tadqiqotlar bilan bog\'laymiz.',
    footer_services: 'Xizmatlar',
    footer_account: 'Hisob',
    footer_copy: '© 2026 GlobalTrialMatch. Barcha huquqlar himoyalangan.',
    footer_source: 'Ma\'lumotlar ClinicalTrials.gov dan olinadi',
  },
  en: {
    badge: '🚀 AI-powered clinical trial matching',
    hero_title_1: 'Find the perfect',
    hero_title_2: 'clinical trial',
    hero_title_3: 'for you',
    hero_sub: 'AI matches you to <strong>300,000+</strong> trials worldwide — completely <strong>free</strong>. With compensation opportunities.',
    cta_main: 'Get Started Free →',
    cta_sec: 'Log in',
    dashboard: 'Start searching →',
    pill1: '✅ No credit card needed',
    pill2: '✅ Sign up is free',
    pill3: '✅ Results in 2 minutes',
    feat_tag: 'Features',
    feat_title: 'Why GlobalTrialMatch?',
    feat_sub: 'Unlike other platforms, we put patients first.',
    steps_tag: 'Process',
    steps_title: '3 simple steps',
    steps_sub: 'Finding a clinical trial has never been this easy.',
    cta_title: 'Start today — it\'s free',
    cta_sub: 'Your matched trials are just minutes away.',
    cta_reg: 'Sign up now',
    cta_login: 'Already have an account? Log in',
    footer_tagline: 'Connecting patients to clinical trials worldwide.',
    footer_services: 'Services',
    footer_account: 'Account',
    footer_copy: '© 2026 GlobalTrialMatch. All rights reserved.',
    footer_source: 'Data sourced from ClinicalTrials.gov',
  },
  ru: {
    badge: '🚀 Подбор клинических исследований с помощью ИИ',
    hero_title_1: 'Найдите подходящее',
    hero_title_2: 'клиническое исследование',
    hero_title_3: 'для вас',
    hero_sub: 'ИИ подберёт вам из <strong>300 000+</strong> исследований по всему миру — <strong>бесплатно</strong>. С возможностью компенсации.',
    cta_main: 'Начать бесплатно →',
    cta_sec: 'Войти',
    dashboard: 'Начать поиск →',
    pill1: '✅ Регистрация бесплатна',
    pill2: '✅ Карта не нужна',
    pill3: '✅ Результат за 2 минуты',
    feat_tag: 'Возможности',
    feat_title: 'Почему GlobalTrialMatch?',
    feat_sub: 'В отличие от других платформ, мы ставим пациентов на первое место.',
    steps_tag: 'Процесс',
    steps_title: '3 простых шага',
    steps_sub: 'Найти клиническое исследование ещё никогда не было так просто.',
    cta_title: 'Начните сегодня — бесплатно',
    cta_sub: 'Ваши подходящие исследования — в нескольких минутах.',
    cta_reg: 'Зарегистрироваться сейчас',
    cta_login: 'Уже есть аккаунт? Войти',
    footer_tagline: 'Связываем пациентов с клиническими исследованиями по всему миру.',
    footer_services: 'Услуги',
    footer_account: 'Аккаунт',
    footer_copy: '© 2026 GlobalTrialMatch. Все права защищены.',
    footer_source: 'Данные из ClinicalTrials.gov',
  },
}

export default function LandingPage() {
  const { user } = useAuth()
  const { lang, setLang, langs } = useLang()
  const t = TEXT[lang.code] || TEXT.uz
  const steps = STEPS_MAP[lang.code] || STEPS_MAP.uz

  return (
    <div className="landing">
      {/* ── Header ── */}
      <header className="landing-header">
        <div className="lh-inner">
          <Link to="/" className="lh-logo">
            <span className="lh-logo-icon">⚕</span>
            GlobalTrialMatch
          </Link>
          <nav className="lh-nav">
            <a href="#features">
              {lang.code === 'uz' ? 'Imkoniyatlar' : lang.code === 'en' ? 'Features' : 'Возможности'}
            </a>
            <a href="#how-it-works">
              {lang.code === 'uz' ? 'Qanday ishlaydi' : lang.code === 'en' ? 'How it works' : 'Как работает'}
            </a>
            <a href="#stats">
              {lang.code === 'uz' ? 'Natijalar' : lang.code === 'en' ? 'Stats' : 'Статистика'}
            </a>
          </nav>
          <div className="lh-actions">
            <div className="lang-switcher">
              {langs.map(l => (
                <button
                  key={l.code}
                  className={`lang-btn ${lang.code === l.code ? 'lang-btn-active' : ''}`}
                  onClick={() => setLang(l.code)}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
            {user ? (
              <>
                <Link to="/dashboard" className="lh-btn-primary">{t.dashboard}</Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Link to="/login" className="lh-btn-ghost">{lang.login}</Link>
                <Link to="/register" className="lh-btn-primary">{t.cta_main}</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero-wrap">
        <div className="hero-inner">
          <div className="hero-badge">{t.badge}</div>
          <h1 className="hero-title">
            {t.hero_title_1}<br />
            <span className="hero-gradient">{t.hero_title_2}</span><br />
            {t.hero_title_3}
          </h1>
          <p className="hero-sub" dangerouslySetInnerHTML={{ __html: t.hero_sub }} />
          <div className="hero-btns">
            {user ? (
              <Link to="/dashboard" className="hero-btn-main">{t.dashboard}</Link>
            ) : (
              <>
                <Link to="/register" className="hero-btn-main">{t.cta_main}</Link>
                <Link to="/login" className="hero-btn-sec">{t.cta_sec}</Link>
              </>
            )}
          </div>
          <div className="hero-pills">
            <span className="pill">{t.pill1}</span>
            <span className="pill">{t.pill2}</span>
            <span className="pill">{t.pill3}</span>
          </div>
        </div>

        <div className="hero-cards">
          <div className="hc hc-1">
            <span className="hc-icon">💊</span>
            <div><p className="hc-title">Diabetes Trial</p><p className="hc-sub">95% match · $1,200</p></div>
          </div>
          <div className="hc hc-2">
            <span className="hc-icon">❤️</span>
            <div><p className="hc-title">Cardiology Study</p><p className="hc-sub">88% match · $2,400</p></div>
          </div>
          <div className="hc hc-3">
            <span className="hc-icon">🧬</span>
            <div><p className="hc-title">Oncology Research</p><p className="hc-sub">72% match · $4,000</p></div>
          </div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <section id="stats" className="stats-band">
        <div className="stats-band-inner">
          {[
            { num: '300K+', lbl: lang.code === 'uz' ? 'Aktiv tadqiqotlar' : lang.code === 'en' ? 'Active trials' : 'Активных исследований' },
            { num: '50+', lbl: lang.code === 'uz' ? 'Mamlakat' : lang.code === 'en' ? 'Countries' : 'Стран' },
            { num: '$5K', lbl: lang.code === 'uz' ? 'Max kompensatsiya' : lang.code === 'en' ? 'Max compensation' : 'Макс. компенсация' },
            { num: '2 min', lbl: lang.code === 'uz' ? 'Natija olish' : lang.code === 'en' ? 'Results time' : 'Время результата' },
          ].map((s, i) => (
            <div key={s.lbl} style={{ display: 'contents' }}>
              {i > 0 && <div className="sb-div" />}
              <div className="sb-item">
                <span className="sb-num">{s.num}</span>
                <span className="sb-lbl">{s.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="section features-section">
        <div className="section-inner">
          <div className="section-tag">{t.feat_tag}</div>
          <h2 className="section-title">{t.feat_title}</h2>
          <p className="section-sub">{t.feat_sub}</p>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.icon} className="feature-card">
                <div className="fc-icon">{f.icon}</div>
                <h3>{f[`title_${lang.code}`]}</h3>
                <p>{f[`desc_${lang.code}`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="section steps-section">
        <div className="section-inner">
          <div className="section-tag">{t.steps_tag}</div>
          <h2 className="section-title">{t.steps_title}</h2>
          <p className="section-sub">{t.steps_sub}</p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.num} className="step-card">
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>{t.cta_title}</h2>
          <p>{t.cta_sub}</p>
          <div className="cta-btns">
            {user ? (
              <Link to="/dashboard" className="hero-btn-main">{t.dashboard}</Link>
            ) : (
              <>
                <Link to="/register" className="hero-btn-main">{t.cta_reg}</Link>
                <Link to="/login" className="cta-login">{t.cta_login}</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="lh-logo footer-logo">
              <span className="lh-logo-icon">⚕</span>
              GlobalTrialMatch
            </div>
            <p>{t.footer_tagline}</p>
          </div>
          <div className="footer-links">
            <div className="fl-col">
              <h4>{t.footer_services}</h4>
              <a href="#features">{lang.code === 'uz' ? 'Imkoniyatlar' : lang.code === 'en' ? 'Features' : 'Возможности'}</a>
              <a href="#how-it-works">{lang.code === 'uz' ? 'Qanday ishlaydi' : lang.code === 'en' ? 'How it works' : 'Как работает'}</a>
              <Link to="/register">{lang.register}</Link>
            </div>
            <div className="fl-col">
              <h4>{t.footer_account}</h4>
              <Link to="/login">{lang.login}</Link>
              <Link to="/register">{lang.register}</Link>
              {user && <Link to="/applications">{lang.nav_apps}</Link>}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer_copy}</p>
          <p>{t.footer_source}</p>
        </div>
      </footer>
    </div>
  )
}
