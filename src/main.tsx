import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LangProvider, langFromPath } from './i18n'
import { messages } from './i18n/messages'

// O script em index.html já mandou quem chegou sem idioma para /pt/, /es/ ou /en/.
const lang = langFromPath(window.location.pathname) ?? 'en'
document.documentElement.lang = { pt: 'pt-BR', es: 'es-ES', en: 'en' }[lang]
document.title = messages[lang].meta.title

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider lang={lang}>
      <App />
    </LangProvider>
  </StrictMode>,
)
