import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

const COUNTRIES = [
  'Uzbekistan', 'Russia', 'Kazakhstan', 'Ukraine',
  'United States', 'Germany', 'United Kingdom', 'Turkey', 'China', 'India',
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const navigate = useNavigate()
  const [form, setForm] = useState({ diagnosis: '', age: '', gender: 'ALL', country: 'Uzbekistan' })
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    navigate(`/results?${new URLSearchParams(form).toString()}`)
  }

  return (
    <div className="dash-wrap">
      <header className="dash-header">
        <div className="dash-header-inner">
          <Link to="/" className="lh-logo">
            <span className="lh-logo-icon">⚕</span>
            GlobalTrialMatch
          </Link>
          <nav className="dash-nav">
            <Link to="/dashboard" className="dash-nav-link active">{lang.nav_search}</Link>
            <Link to="/applications" className="dash-nav-link">{lang.nav_apps}</Link>
          </nav>
          <div className="dash-user">
            <LangSwitcher />
            <div className="dash-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            <span className="dash-username">{user?.name}</span>
            <button onClick={logout} className="dash-logout">{lang.logout}</button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-hero">
          <h1>{lang.hero_title}</h1>
          <p dangerouslySetInnerHTML={{ __html: lang.hero_sub.replace('300,000+', '<strong>300,000+</strong>').replace('бесплатно', '<strong>бесплатно</strong>').replace('free', '<strong>free</strong>') }} />
        </div>

        <div className="search-card">
          <form onSubmit={handleSearch}>
            <div className="sc-field sc-field-wide">
              <label>{lang.search_label}</label>
              <input
                type="text"
                placeholder={lang.search_placeholder}
                value={form.diagnosis}
                onChange={e => setForm({ ...form, diagnosis: e.target.value })}
                required
              />
            </div>
            <div className="sc-row">
              <div className="sc-field">
                <label>{lang.age_label}</label>
                <input
                  type="number"
                  placeholder="45"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                  min={1} max={120} required
                />
              </div>
              <div className="sc-field">
                <label>{lang.gender_label}</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option value="ALL">{lang.gender_all}</option>
                  <option value="MALE">{lang.gender_male}</option>
                  <option value="FEMALE">{lang.gender_female}</option>
                </select>
              </div>
              <div className="sc-field">
                <label>{lang.country_label}</label>
                <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="sc-submit" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> {lang.searching}</> : lang.search_btn}
            </button>
          </form>
        </div>

        <div className="dash-stats">
          {[
            { icon: '🔬', num: '300K+', lbl: 'Aktiv tadqiqotlar' },
            { icon: '💰', num: '$500–5K', lbl: 'Kompensatsiya' },
            { icon: '🌍', num: '50+', lbl: 'Mamlakat' },
            { icon: '⚡', num: '2 min', lbl: 'Natija olish' },
          ].map(s => (
            <div key={s.lbl} className="ds-card">
              <span className="ds-icon">{s.icon}</span>
              <div>
                <span className="ds-num">{s.num}</span>
                <span className="ds-lbl">{s.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
