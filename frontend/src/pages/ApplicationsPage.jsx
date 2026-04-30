import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { applicationsAPI } from '../api/index.js'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

export default function ApplicationsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { lang } = useLang()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  const STATUS_MAP = {
    pending:  { label: lang.pending,  cls: 'status-pending' },
    accepted: { label: lang.accepted, cls: 'status-accepted' },
    rejected: { label: lang.rejected, cls: 'status-rejected' },
  }

  useEffect(() => {
    applicationsAPI.getAll()
      .then(res => setApps(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async (id) => {
    const msg = lang.code === 'ru' ? 'Отменить заявку?' : lang.code === 'en' ? 'Cancel this application?' : 'Arizani bekor qilmoqchimisiz?'
    if (!confirm(msg)) return
    await applicationsAPI.cancel(id)
    setApps(prev => prev.filter(a => a.id !== id))
  }

  const counts = {
    total: apps.length,
    pending: apps.filter(a => a.status === 'pending').length,
    accepted: apps.filter(a => a.status === 'accepted').length,
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
            <Link to="/applications" className="dash-nav-link active">{lang.nav_apps}</Link>
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
        <div className="apps-page-header">
          <div>
            <h2>{lang.my_apps}</h2>
            <p>
              {lang.code === 'uz' ? 'Yuborgan arizalaringizni kuzating' :
               lang.code === 'en' ? 'Track your submitted applications' :
               'Отслеживайте поданные заявки'}
            </p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn-apply">
            {lang.new_search}
          </button>
        </div>

        {apps.length > 0 && (
          <div className="apps-summary">
            <div className="as-card">
              <span className="as-num">{counts.total}</span>
              <span className="as-lbl">{lang.code === 'uz' ? 'Jami' : lang.code === 'en' ? 'Total' : 'Всего'}</span>
            </div>
            <div className="as-card">
              <span className="as-num" style={{ color: '#f59e0b' }}>{counts.pending}</span>
              <span className="as-lbl">{lang.pending}</span>
            </div>
            <div className="as-card">
              <span className="as-num" style={{ color: '#16a34a' }}>{counts.accepted}</span>
              <span className="as-lbl">{lang.accepted}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : apps.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">📋</div>
            <h3>{lang.no_apps}</h3>
            <p>
              {lang.code === 'uz' ? 'Tadqiqot topib, ariza bering — bepul!' :
               lang.code === 'en' ? 'Find a trial and apply — it\'s free!' :
               'Найдите исследование и подайте заявку — бесплатно!'}
            </p>
            <button onClick={() => navigate('/dashboard')} className="btn-apply">
              {lang.nav_search}
            </button>
          </div>
        ) : (
          <div className="apps-grid">
            {apps.map(app => {
              const st = STATUS_MAP[app.status] || STATUS_MAP.pending
              return (
                <div key={app.id} className="app-card-new">
                  <div className="acn-head">
                    <span className="tc-id">{app.trial_id}</span>
                    <span className={`acn-status ${st.cls}`}>{st.label}</span>
                  </div>
                  <h3 className="acn-title">{app.trial_title || '—'}</h3>
                  <p className="acn-date">
                    📅 {new Date(app.applied_at).toLocaleDateString(
                      lang.code === 'ru' ? 'ru-RU' : lang.code === 'en' ? 'en-US' : 'uz-UZ',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </p>
                  {app.note && <p className="acn-note">💬 {app.note}</p>}
                  {app.status === 'pending' && (
                    <button onClick={() => handleCancel(app.id)} className="btn-cancel">
                      {lang.cancel}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
