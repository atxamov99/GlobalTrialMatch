import { useState } from 'react'
import { useAuth } from '../store/auth.jsx'

export default function AccountModal({ type, onClose }) {
  const { user, updateAccount, changePassword } = useAuth()

  const [account, setAccount] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const isAccount = type === 'account'

  const handleAccount = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const data = {}
      if (account.name !== user.name) data.name = account.name
      if (account.email !== user.email) data.email = account.email
      if (Object.keys(data).length === 0) {
        setMsg('Hech narsa o\'zgarmadi')
      } else {
        await updateAccount(data)
        setMsg('✅ Saqlandi!')
        setTimeout(onClose, 1200)
      }
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.error || 'Xatolik'))
    } finally {
      setSaving(false)
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    setMsg('')
    if (pw.newPassword !== pw.confirmPassword) {
      setMsg('❌ Yangi parollar mos kelmadi')
      return
    }
    if (pw.newPassword.length < 6) {
      setMsg('❌ Parol kamida 6 ta belgi')
      return
    }
    setSaving(true)
    try {
      await changePassword(pw.currentPassword, pw.newPassword)
      setMsg('✅ Parol o\'zgartirildi!')
      setTimeout(onClose, 1200)
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.error || 'Xatolik'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isAccount ? '✏️ Ism va Email' : '🔑 Parolni o\'zgartirish'}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {isAccount ? (
          <form onSubmit={handleAccount} className="modal-form">
            <div className="sc-field">
              <label>Ismingiz</label>
              <input
                type="text" value={account.name}
                onChange={e => setAccount({ ...account, name: e.target.value })}
                required
              />
            </div>
            <div className="sc-field">
              <label>Email</label>
              <input
                type="email" value={account.email}
                onChange={e => setAccount({ ...account, email: e.target.value })}
                required
              />
            </div>
            {msg && <div className={msg.startsWith('✅') ? 'modal-msg-ok' : 'modal-msg-err'}>{msg}</div>}
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-back-new">Bekor qilish</button>
              <button type="submit" className="btn-apply" disabled={saving}>
                {saving ? '...' : '💾 Saqlash'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePassword} className="modal-form">
            <div className="sc-field">
              <label>Joriy parol</label>
              <input
                type="password" value={pw.currentPassword}
                onChange={e => setPw({ ...pw, currentPassword: e.target.value })}
                required autoComplete="current-password"
              />
            </div>
            <div className="sc-field">
              <label>Yangi parol</label>
              <input
                type="password" placeholder="kamida 6 ta belgi"
                value={pw.newPassword}
                onChange={e => setPw({ ...pw, newPassword: e.target.value })}
                required minLength={6} autoComplete="new-password"
              />
            </div>
            <div className="sc-field">
              <label>Tasdiqlash</label>
              <input
                type="password" placeholder="parolni qayta yozing"
                value={pw.confirmPassword}
                onChange={e => setPw({ ...pw, confirmPassword: e.target.value })}
                required autoComplete="new-password"
              />
            </div>
            {msg && <div className={msg.startsWith('✅') ? 'modal-msg-ok' : 'modal-msg-err'}>{msg}</div>}
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-back-new">Bekor qilish</button>
              <button type="submit" className="btn-apply" disabled={saving}>
                {saving ? '...' : '🔑 O\'zgartirish'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
