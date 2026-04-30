import { useEffect, useState } from 'react'

export default function InstallBanner() {
  const [prompt, setPrompt] = useState(null)
  const [show, setShow] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // Check if already running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return

    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setInstalled(true)
      setShow(false)
    })
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      setShow(false)
      setInstalled(true)
    }
  }

  if (!show || installed) return null

  return (
    <div className="install-banner">
      <div className="install-banner-left">
        <div className="install-icon">⚕</div>
        <div>
          <p className="install-title">GlobalTrialMatch ilovasini o'rnating</p>
          <p className="install-sub">Telefonga yuklab oling — bepul, App Store kerak emas</p>
        </div>
      </div>
      <div className="install-actions">
        <button className="install-btn" onClick={handleInstall}>O'rnatish</button>
        <button className="install-close" onClick={() => setShow(false)}>✕</button>
      </div>
    </div>
  )
}
