import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import UserMenu from '../components/UserMenu.jsx'
import { profileAPI } from '../api/index.js'

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
  const [profile, setProfile] = useState(null)
  const [mode, setMode] = useState('search') // 'search' | 'ai'

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        if (res.data) {
          setProfile(res.data)
          setForm({
            diagnosis: res.data.diagnosis || '',
            age: res.data.age || '',
            gender: res.data.gender || 'ALL',
            country: res.data.country || 'Uzbekistan',
          })
        }
      })
      .catch(() => {})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    const params = new URLSearchParams({ ...form, useAI: mode === 'ai' })
    navigate(`/results?${params.toString()}`)
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
            <Link to="/saved" className="dash-nav-link">Saqlangan</Link>
            <Link to="/profile" className="dash-nav-link">Profil</Link>
          </nav>
          <div className="dash-user">
            <LangSwitcher />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-hero">
          <h1>{lang.hero_title}</h1>
          <p dangerouslySetInnerHTML={{ __html: lang.hero_sub.replace('300,000+', '<strong>300,000+</strong>') }} />
        </div>

        {/* Mode tanlash */}
        <div className="mode-tabs">
          <button
            className={`mode-tab ${mode === 'search' ? 'active' : ''}`}
            onClick={() => setMode('search')}
          >
            🔍 Oddiy qidiruv
          </button>
          <button
            className={`mode-tab ${mode === 'ai' ? 'active' : ''}`}
            onClick={() => setMode('ai')}
          >
            🤖 AI Matching
            {profile && <span className="mode-tab-badge">Profil ulandi</span>}
          </button>
        </div>

        {mode === 'ai' && !profile && (
          <div className="ai-hint">
            <span>⚠️</span>
            <div>
              <p>AI Matching uchun avval profilingizni to'ldiring</p>
              <Link to="/profile" className="btn-apply" style={{ display: 'inline-block', marginTop: 8, textDecoration: 'none' }}>
                Profilni to'ldirish →
              </Link>
            </div>
          </div>
        )}

        {mode === 'ai' && profile && (
          <div className="ai-profile-card">
            <div className="apc-left">
              <span className="apc-icon">🤖</span>
              <div>
                <p className="apc-title">Profilingiz asosida qidiriladi</p>
                <p className="apc-sub">
                  {profile.diagnosis} · {profile.age} yosh · {profile.country}
                  {profile.comorbidities?.length > 0 && ` · ${profile.comorbidities.length} ta qo'shimcha kasallik`}
                </p>
              </div>
            </div>
            <Link to="/profile" className="apc-edit">Tahrirlash</Link>
          </div>
        )}

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
                  type="number" placeholder="45"
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
              {loading
                ? <><span className="btn-spinner" /> {lang.searching}</>
                : mode === 'ai' ? '🤖 AI bilan qidirish' : lang.search_btn
              }
            </button>
          </form>
        </div>

        <div className="dash-stats">
          {[
            { icon: '🔬', num: '300K+', lbl: 'Aktiv tadqiqotlar' },
            { icon: '🤖', num: 'AI', lbl: 'Aqlli moslashtirish' },
            { icon: '🌍', num: '50+', lbl: 'Mamlakat' },
            { icon: '💰', num: '$5K', lbl: 'Max kompensatsiya' },
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
