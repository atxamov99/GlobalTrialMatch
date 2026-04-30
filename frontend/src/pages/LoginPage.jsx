import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'

const TITLES = {
  uz: { heading: 'Xush kelibsiz!', sub: 'Hisobingizga kiring', submit: 'Kirish', loading: 'Kirilmoqda...', no_acc: 'Hisobingiz yo\'qmi?', register: 'Ro\'yxatdan o\'ting' },
  en: { heading: 'Welcome back!', sub: 'Sign in to your account', submit: 'Sign In', loading: 'Signing in...', no_acc: 'Don\'t have an account?', register: 'Sign up' },
  ru: { heading: 'С возвращением!', sub: 'Войдите в свой аккаунт', submit: 'Войти', loading: 'Вход...', no_acc: 'Нет аккаунта?', register: 'Зарегистрироваться' },
}

export default function LoginPage() {
  const { login } = useAuth()
  const { lang } = useLang()
  const navigate = useNavigate()
  const t = TITLES[lang.code] || TITLES.uz
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Link to="/" className="auth-card-logo">
            <span className="lh-logo-icon">⚕</span>
            GlobalTrialMatch
          </Link>
          <LangSwitcher />
        </div>

        <h2>{t.heading}</h2>

        {error && <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label>{lang.code === 'ru' ? 'Пароль' : lang.code === 'en' ? 'Password' : 'Parol'}</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? t.loading : t.submit}
          </button>
        </form>

        <p className="auth-footer">
          {t.no_acc} <Link to="/register">{t.register}</Link>
        </p>
      </div>
    </div>
  )
}
