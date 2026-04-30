import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'

const COUNTRIES = [
  'Uzbekistan', 'Russia', 'Kazakhstan', 'Ukraine', 'United States',
  'Germany', 'United Kingdom', 'Turkey', 'China', 'India',
]

export default function HomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    diagnosis: '',
    age: '',
    gender: 'ALL',
    country: 'Uzbekistan',
  })
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    const params = new URLSearchParams(form)
    navigate(`/results?${params.toString()}`)
  }

  return (
    <div className="home-page">
      <nav className="navbar">
        <span className="logo">🔬 GlobalTrialMatch</span>
        <div className="nav-links">
          <a href="/applications">Arizalarim</a>
          <span className="nav-user">Salom, {user?.name}</span>
          <button onClick={logout} className="btn-logout">Chiqish</button>
        </div>
      </nav>

      <div className="hero-section">
        <h1>Mos klinik tadqiqotni toping</h1>
        <p>Dunyo bo'yicha 300,000+ tadqiqot ichidan sizga mosini AI topadi</p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label>Kasalligingiz</label>
            <input
              type="text"
              placeholder="Masalan: diabet, gipertenziya, saratoni..."
              value={form.diagnosis}
              onChange={e => setForm({ ...form, diagnosis: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Yoshingiz</label>
              <input
                type="number"
                placeholder="Masalan: 45"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
                min={1}
                max={120}
                required
              />
            </div>

            <div className="form-group">
              <label>Jinsингиз</label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="ALL">Ahamiyatsiz</option>
                <option value="MALE">Erkak</option>
                <option value="FEMALE">Ayol</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mamlakatingiz</label>
              <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-search" disabled={loading}>
            {loading ? 'Qidirilmoqda...' : '🔍 Tadqiqot qidirish'}
          </button>
        </form>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-num">300K+</span>
          <span className="stat-label">Aktiv tadqiqotlar</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">$500-5000</span>
          <span className="stat-label">Ishtirokchi kompensatsiyasi</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">50+</span>
          <span className="stat-label">Mamlakat</span>
        </div>
      </div>
    </div>
  )
}
