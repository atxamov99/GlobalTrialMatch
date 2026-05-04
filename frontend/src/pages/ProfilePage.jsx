import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import UserMenu from '../components/UserMenu.jsx'
import { profileAPI } from '../api/index.js'

const COUNTRIES = [
  'Uzbekistan', 'Russia', 'Kazakhstan', 'Ukraine',
  'United States', 'Germany', 'United Kingdom', 'Turkey', 'China', 'India',
]

const COMORBIDITIES = [
  'Diabet', 'Gipertenziya', 'Yurak kasalligi', 'Astma', 'Buyrak kasalligi',
  'Jigar kasalligi', 'Onkologiya', 'Suyak kasalligi', 'Qalqonsimon bez', 'Boshqa',
]

export default function ProfilePage() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    age: '', gender: 'ALL', country: 'Uzbekistan',
    diagnosis: '', comorbidities: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    profileAPI.get()
      .then(res => {
        if (res.data) setForm({
          age: res.data.age || '',
          gender: res.data.gender || 'ALL',
          country: res.data.country || 'Uzbekistan',
          diagnosis: res.data.diagnosis || '',
          comorbidities: res.data.comorbidities || [],
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const toggleComorbidity = (item) => {
    setForm(f => ({
      ...f,
      comorbidities: f.comorbidities.includes(item)
        ? f.comorbidities.filter(c => c !== item)
        : [...f.comorbidities, item],
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await profileAPI.save(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Saqlashda xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
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
            <Link to="/dashboard" className="dash-nav-link">{lang.nav_search}</Link>
            <Link to="/applications" className="dash-nav-link">{lang.nav_apps}</Link>
            <Link to="/saved" className="dash-nav-link">Saqlangan</Link>
            <Link to="/profile" className="dash-nav-link active">Profil</Link>
          </nav>
          <div className="dash-user">
            <LangSwitcher />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="results-main">
        <div className="profile-header">
          <div>
            <h2>Tibbiy profilim</h2>
            <p>Ma'lumotlaringizni to'ldiring — AI aniqroq tavsiyalar beradi</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <div className="pf-section">
              <h3 className="pf-section-title">👤 Asosiy ma'lumotlar</h3>
              <div className="pf-grid">
                <div className="sc-field">
                  <label>Yoshingiz</label>
                  <input
                    type="number" min={1} max={120}
                    placeholder="45"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    required
                  />
                </div>
                <div className="sc-field">
                  <label>Jins</label>
                  <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                    <option value="ALL">Ahamiyatsiz</option>
                    <option value="MALE">Erkak</option>
                    <option value="FEMALE">Ayol</option>
                  </select>
                </div>
                <div className="sc-field">
                  <label>Mamlakat</label>
                  <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="pf-section">
              <h3 className="pf-section-title">🏥 Tibbiy ma'lumotlar</h3>
              <div className="sc-field" style={{ marginBottom: 20 }}>
                <label>Asosiy diagnozing</label>
                <input
                  type="text"
                  placeholder="Masalan: 2-toifa diabet, o'pka saratoni..."
                  value={form.diagnosis}
                  onChange={e => setForm({ ...form, diagnosis: e.target.value })}
                  required
                />
              </div>

              <div className="sc-field">
                <label>Qo'shimcha kasalliklar (bir nechta tanlash mumkin)</label>
                <div className="comorbidities-grid">
                  {COMORBIDITIES.map(item => (
                    <button
                      key={item}
                      type="button"
                      className={`comorbidity-btn ${form.comorbidities.includes(item) ? 'selected' : ''}`}
                      onClick={() => toggleComorbidity(item)}
                    >
                      {form.comorbidities.includes(item) ? '✓ ' : ''}{item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className="alert-error">{error}</div>}

            <div className="pf-actions">
              {saved && <span className="pf-saved">✅ Profil saqlandi!</span>}
              <button type="submit" className="btn-apply" disabled={saving}>
                {saving ? <><span className="btn-spinner" /> Saqlanmoqda...</> : '💾 Profilni saqlash'}
              </button>
              <button
                type="button"
                className="sc-submit"
                style={{ marginTop: 0 }}
                onClick={() => navigate('/dashboard')}
              >
                🤖 AI Matching boshlash
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
