import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, useAuth } from './store/auth.jsx'
import { LangProvider } from './store/lang.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import ApplicationsPage from './pages/ApplicationsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SavedPage from './pages/SavedPage.jsx'
import InstallBanner from './components/InstallBanner.jsx'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="full-loader"><div className="spinner" /></div>
  return user ? children : <Navigate to="/login" />
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="full-loader"><div className="spinner" /></div>
  return user ? <Navigate to="/dashboard" /> : children
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || '68793402087-dpbe83k7kdbuq6hhq53geq6j2ml3m5p5.apps.googleusercontent.com'}>
      <LangProvider>
        <AuthProvider>
          <BrowserRouter>
            <InstallBanner />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
              <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/results" element={<PrivateRoute><ResultsPage /></PrivateRoute>} />
              <Route path="/applications" element={<PrivateRoute><ApplicationsPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/saved" element={<PrivateRoute><SavedPage /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LangProvider>
    </GoogleOAuthProvider>
  )
}
