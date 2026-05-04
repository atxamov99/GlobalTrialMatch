import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api/index.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.me()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
  }

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
  }

  const loginWithGoogle = async (_credential, userInfo) => {
    const res = await authAPI.google(userInfo)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
  }

  const updateAccount = async (data) => {
    const res = await authAPI.updateMe(data)
    if (res.data.token) localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
  }

  const changePassword = (currentPassword, newPassword) =>
    authAPI.changePassword({ currentPassword, newPassword })

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, updateAccount, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
