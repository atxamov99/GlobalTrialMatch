import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import AccountModal from './AccountModal.jsx'

export default function UserMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(null) // 'account' | 'password' | null
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) return null

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <>
      <div className="user-menu" ref={ref}>
        <button className="um-trigger" onClick={() => setOpen(!open)}>
          <div className="dash-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
          <span className="dash-username">{user.name}</span>
          <span className="um-chevron">{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className="um-dropdown">
            <div className="um-header">
              <div className="dash-avatar um-avatar-lg">{user.name?.[0]?.toUpperCase()}</div>
              <div>
                <p className="um-name">{user.name}</p>
                <p className="um-email">{user.email}</p>
              </div>
            </div>

            <div className="um-divider" />

            <Link to="/profile" className="um-item" onClick={() => setOpen(false)}>
              <span>👤</span> Tibbiy profilim
            </Link>
            <button className="um-item" onClick={() => { setModal('account'); setOpen(false) }}>
              <span>✏️</span> Ism va emailni o'zgartirish
            </button>
            <button className="um-item" onClick={() => { setModal('password'); setOpen(false) }}>
              <span>🔑</span> Parolni o'zgartirish
            </button>

            <div className="um-divider" />

            <button className="um-item um-logout" onClick={handleLogout}>
              <span>🚪</span> Chiqish
            </button>
          </div>
        )}
      </div>

      {modal && <AccountModal type={modal} onClose={() => setModal(null)} />}
    </>
  )
}
