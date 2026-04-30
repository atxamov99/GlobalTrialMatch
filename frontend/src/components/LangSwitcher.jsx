import { useLang } from '../store/lang.jsx'

export default function LangSwitcher() {
  const { lang, setLang, langs } = useLang()

  return (
    <div className="lang-switcher">
      {langs.map(l => (
        <button
          key={l.code}
          className={`lang-btn ${lang.code === l.code ? 'lang-btn-active' : ''}`}
          onClick={() => setLang(l.code)}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
