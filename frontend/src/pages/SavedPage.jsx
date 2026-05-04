import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import UserMenu from '../components/UserMenu.jsx'
import { savedAPI, applicationsAPI } from '../api/index.js'

export default function SavedPage() {
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const navigate = useNavigate()
  const [trials, setTrials] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState({})
  const [applied, setApplied] = useState({})

  useEffect(() => {
    savedAPI.getAll()
      .then(res => setTrials(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleRemove = async (trialId) => {
    await savedAPI.remove(trialId)
    setTrials(prev => prev.filter(t => t.id !== trialId))
  }

  const handleApply = async (trial) => {
    setApplying(prev => ({ ...prev, [trial.id]: true }))
    try {
      await applicationsAPI.apply({ trial_id: trial.id, trial_title: trial.title })
      setApplied(prev => ({ ...prev, [trial.id]: true }))
    } catch (e) {
      alert(e.response?.data?.error || 'Xatolik')
    } finally {
      setApplying(prev => ({ ...prev, [trial.id]: false }))
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
            <Link to="/saved" className="dash-nav-link active">Saqlangan</Link>
            <Link to="/profile" className="dash-nav-link">Profil</Link>
          </nav>
          <div className="dash-user">
            <LangSwitcher />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="results-main">
        <div className="apps-page-header">
          <div>
            <h2>🔖 Saqlangan tadqiqotlar</h2>
            <p>Keyinroq ko'rish uchun saqlagan tadqiqotlaringiz</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn-apply">
            + Yangi qidiruv
          </button>
        </div>

        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : trials.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">🔖</div>
            <h3>Hali saqlangan tadqiqot yo'q</h3>
            <p>Tadqiqot kartasidagi "Saqlash" tugmasini bosing</p>
            <button onClick={() => navigate('/dashboard')} className="btn-apply">
              Tadqiqot qidirish
            </button>
          </div>
        ) : (
          <div className="trials-grid">
            {trials.map(trial => (
              <div key={trial.id} className="tc">
                <div className="tc-head">
                  <span className="tc-id">{trial.id}</span>
                  <span className={`tc-status status-${trial.status?.toLowerCase()}`}>
                    {trial.status}
                  </span>
                </div>
                <h3 className="tc-title">{trial.title}</h3>
                <div className="tc-meta">
                  {trial.sponsor && <span>🏢 {trial.sponsor}</span>}
                  {trial.phase && <span>📊 {trial.phase}</span>}
                </div>
                <div className="tc-actions">
                  <a href={trial.url} target="_blank" rel="noreferrer" className="btn-outline-sm">
                    Batafsil ↗
                  </a>
                  {applied[trial.id] ? (
                    <span className="applied-ok">✅ Ariza berildi</span>
                  ) : (
                    <button
                      className="btn-apply"
                      disabled={applying[trial.id]}
                      onClick={() => handleApply(trial)}
                    >
                      {applying[trial.id] ? <span className="btn-spinner" /> : 'Ariza berish'}
                    </button>
                  )}
                  <button
                    className="btn-cancel"
                    onClick={() => handleRemove(trial.id)}
                  >
                    🗑 O'chirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
