import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { trialsAPI, applicationsAPI } from '../api/index.js'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

function ScoreBadge({ score }) {
  const cls = score >= 70 ? 'badge-green' : score >= 50 ? 'badge-yellow' : 'badge-gray'
  return <span className={`score-badge ${cls}`}>{score}% mos</span>
}

function TrialCard({ trial, onApply, applyLabel }) {
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [err, setErr] = useState('')

  const handleApply = async () => {
    setApplying(true)
    setErr('')
    try {
      await onApply(trial)
      setApplied(true)
    } catch (e) {
      setErr(e.response?.data?.error || 'Xatolik')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="tc">
      <div className="tc-head">
        <div className="tc-head-left">
          <span className="tc-id">{trial.id}</span>
          {trial.score != null && <ScoreBadge score={trial.score} />}
        </div>
        <span className={`tc-status status-${trial.status?.toLowerCase()}`}>{trial.status}</span>
      </div>
      <h3 className="tc-title">{trial.title}</h3>
      <div className="tc-meta">
        {trial.sponsor && <span>🏢 {trial.sponsor}</span>}
        {trial.phase && <span>📊 {trial.phase}</span>}
        {trial.locations?.length > 0 && (
          <span>📍 {trial.locations.slice(0, 2).map(l => l.country).join(', ')}</span>
        )}
      </div>
      {trial.explanation && <div className="tc-explanation">💡 {trial.explanation}</div>}
      {err && <div className="tc-err">{err}</div>}
      <div className="tc-actions">
        <a href={trial.url} target="_blank" rel="noreferrer" className="btn-outline-sm">
          {trial.id ? 'Batafsil ↗' : '↗'}
        </a>
        {applied ? (
          <span className="applied-ok">✅ Yuborildi</span>
        ) : (
          <button onClick={handleApply} disabled={applying} className="btn-apply">
            {applying ? <><span className="btn-spinner" /></> : applyLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const [trials, setTrials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const diagnosis = searchParams.get('diagnosis')
  const country = searchParams.get('country')

  useEffect(() => {
    const fetchTrials = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await trialsAPI.search({ condition: diagnosis, country, pageSize: 20 })
        setTrials(res.data.trials || [])
      } catch {
        setError('Tadqiqotlarni yuklashda xatolik.')
      } finally {
        setLoading(false)
      }
    }
    if (diagnosis) fetchTrials()
  }, [diagnosis, country])

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
          </nav>
          <div className="dash-user">
            <LangSwitcher />
            <div className="dash-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
            <span className="dash-username">{user?.name}</span>
            <button onClick={logout} className="dash-logout">{lang.logout}</button>
          </div>
        </div>
      </header>

      <main className="results-main">
        <div className="results-topbar">
          <button onClick={() => navigate('/dashboard')} className="btn-back-new">
            {lang.back}
          </button>
          <div>
            <h2 className="results-title">
              "{diagnosis}"
              {country && <span className="results-country"> · {country}</span>}
            </h2>
            <p className="results-count">
              {loading ? (lang.searching) : `${trials.length} ${lang.code === 'ru' ? 'исследований найдено' : lang.code === 'en' ? 'trials found' : 'ta tadqiqot topildi'}`}
            </p>
          </div>
        </div>

        {error && <div className="alert-error">{error}</div>}

        {loading ? (
          <div className="loading-center">
            <div className="spinner" />
            <p>ClinicalTrials.gov {lang.code === 'ru' ? 'загружается...' : lang.code === 'en' ? 'loading data...' : 'dan ma\'lumot olinmoqda...'}</p>
          </div>
        ) : trials.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">😕</div>
            <h3>{lang.no_trials}</h3>
            <p>{lang.code === 'uz' ? 'Boshqa diagnoz yoki mamlakat bilan urinib ko\'ring' : lang.code === 'en' ? 'Try a different diagnosis or country' : 'Попробуйте другой диагноз или страну'}</p>
            <button onClick={() => navigate('/dashboard')} className="btn-apply">
              {lang.code === 'uz' ? 'Qayta qidirish' : lang.code === 'en' ? 'Search again' : 'Искать снова'}
            </button>
          </div>
        ) : (
          <div className="trials-grid">
            {trials.map(trial => (
              <TrialCard
                key={trial.id}
                trial={trial}
                onApply={t => applicationsAPI.apply({ trial_id: t.id, trial_title: t.title })}
                applyLabel={lang.apply}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
