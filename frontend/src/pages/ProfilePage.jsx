import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
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
  const { user, logout, updateAccount, changePassword } = useAuth()
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

  // Account settings
  const [account, setAccount] = useState({ name: '', email: '' })
  const [accountSaving, setAccountSaving] = useState(false)
  const [accountMsg, setAccountMsg] = useState('')

  // Password
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState('')

  useEffect(() => {
    if (user) setAccount({ name: user.name || '', email: user.email || '' })
  }, [user])

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

  const handleAccountSave = async (e) => {
    e.preventDefault()
    setAccountSaving(true)
    setAccountMsg('')
    try {
      const data = {}
      if (account.name !== user.name) data.name = account.name
      if (account.email !== user.email) data.email = account.email
      if (Object.keys(data).length === 0) {
        setAccountMsg('Hech narsa o\'zgarmadi')
      } else {
        await updateAccount(data)
        setAccountMsg('✅ Saqlandi!')
      }
    } catch (err) {
      setAccountMsg('❌ ' + (err.response?.data?.error || 'Xatolik'))
    } finally {
      setAccountSaving(false)
      setTimeout(() => setAccountMsg(''), 4000)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPwSaving(true)
    setPwMsg('')

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg('❌ Yangi parollar mos kelmadi')
      setPwSaving(false)
      return
    }
    if (pwForm.newPassword.length < 6) {
      setPwMsg('❌ Parol kamida 6 ta belgi bo\'lishi kerak')
      setPwSaving(false)
      return
    }

    try {
      await changePassword(pwForm.currentPassword, pwForm.newPassword)
      setPwMsg('✅ Parol o\'zgartirildi!')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPwMsg('❌ ' + (err.response?.data?.error || 'Xatolik'))
    } finally {
      setPwSaving(false)
      setTimeout(() => setPwMsg(''), 4000)
    }
  }

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
            <div className="dash-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <span className="dash-username">{user?.name}</span>
            <button onClick={logout} className="dash-logout">{lang.logout}</button>
          </div>
        </div>
      </header>

      <main className="results-main">
        <div className="profile-header">
          <div>
            <h2>Mening Profilim</h2>
            <p>Ma'lumotlaringizni to'ldiring — AI aniqroq tavsiyalar beradi</p>
          </div>
        </div>

        {/* Account settings (har doim ko'rsatiladi) */}
        <div className="pf-section" style={{ marginBottom: 24 }}>
          <h3 className="pf-section-title">🔐 Hisob sozlamalari</h3>
          <form onSubmit={handleAccountSave}>
            <div className="pf-grid pf-grid-2">
              <div className="sc-field">
                <label>Ismingiz</label>
                <input
                  type="text"
                  value={account.name}
                  onChange={e => setAccount({ ...account, name: e.target.value })}
                  required
                />
              </div>
              <div className="sc-field">
                <label>Email</label>
                <input
                  type="email"
                  value={account.email}
                  onChange={e => setAccount({ ...account, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="pf-actions" style={{ marginTop: 16 }}>
              {accountMsg && <span className={accountMsg.startsWith('✅') ? 'pf-saved' : 'pf-error'}>{accountMsg}</span>}
              <button type="submit" className="btn-apply" disabled={accountSaving}>
                {accountSaving ? <><span className="btn-spinner" /> Saqlanmoqda...</> : '💾 Saqlash'}
              </button>
            </div>
          </form>
        </div>

        {/* Password change */}
        <div className="pf-section" style={{ marginBottom: 24 }}>
          <h3 className="pf-section-title">🔑 Parolni o'zgartirish</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="pf-grid pf-grid-3">
              <div className="sc-field">
                <label>Joriy parol</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={pwForm.currentPassword}
                  onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="sc-field">
                <label>Yangi parol</label>
                <input
                  type="password"
                  placeholder="kamida 6 ta belgi"
                  value={pwForm.newPassword}
                  onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>
              <div className="sc-field">
                <label>Yangi parolni tasdiqlash</label>
                <input
                  type="password"
                  placeholder="parolni qayta yozing"
                  value={pwForm.confirmPassword}
                  onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="pf-actions" style={{ marginTop: 16 }}>
              {pwMsg && <span className={pwMsg.startsWith('✅') ? 'pf-saved' : 'pf-error'}>{pwMsg}</span>}
              <button type="submit" className="btn-apply" disabled={pwSaving}>
                {pwSaving ? <><span className="btn-spinner" /> Saqlanmoqda...</> : '🔑 Parolni o\'zgartirish'}
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : (
          <form onSubmit={handleSave} className="profile-form">

            {/* Asosiy ma'lumotlar */}
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

            {/* Tibbiy ma'lumotlar */}
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
