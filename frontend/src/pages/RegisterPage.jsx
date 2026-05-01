import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useLang } from '../store/lang.jsx'
import LangSwitcher from '../components/LangSwitcher.jsx'
import GoogleBtn from '../components/GoogleBtn.jsx'

const TITLES = {
  uz: { heading: 'Hisob yaratish', submit: 'Ro\'yxatdan o\'tish', loading: 'Yaratilmoqda...', has_acc: 'Hisobingiz bormi?', login: 'Kirish', name: 'Ismingiz', pass: 'Parol', pass_hint: 'Kamida 6 ta belgi' },
  en: { heading: 'Create your account', submit: 'Sign Up Free', loading: 'Creating...', has_acc: 'Already have an account?', login: 'Sign in', name: 'Your Name', pass: 'Password', pass_hint: 'At least 6 characters' },
  ru: { heading: 'Создать аккаунт', submit: 'Зарегистрироваться', loading: 'Создание...', has_acc: 'Уже есть аккаунт?', login: 'Войти', name: 'Ваше имя', pass: 'Пароль', pass_hint: 'Минимум 6 символов' },
}

export default function RegisterPage() {
  const { register } = useAuth()
  const { lang } = useLang()
  const navigate = useNavigate()
  const t = TITLES[lang.code] || TITLES.uz
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
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
            <label>{t.name}</label>
            <input
              type="text"
              placeholder={lang.code === 'ru' ? 'Иван Иванов' : lang.code === 'en' ? 'John Smith' : 'Asilbek Xolmatov'}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              autoComplete="name"
            />
          </div>
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
            <label>{t.pass}</label>
            <input
              type="password"
              placeholder={t.pass_hint}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              minLength={6}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? t.loading : t.submit}
          </button>
        </form>

        <div className="auth-divider"><span>yoki</span></div>
        <GoogleBtn label={lang.code === 'en' ? 'Sign up with Google' : lang.code === 'ru' ? 'Регистрация через Google' : 'Google bilan ro\'yxatdan o\'tish'} />

        <p className="auth-footer">
          {t.has_acc} <Link to="/login">{t.login}</Link>
        </p>
      </div>
    </div>
  )
}
