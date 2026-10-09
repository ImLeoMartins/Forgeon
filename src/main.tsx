import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LangProvider, caseSlugFromPath, langFromPath } from './i18n'
import { messages } from './i18n/messages'

// O script em index.html já mandou quem chegou sem idioma para /pt/, /es/ ou /en/.
const lang = langFromPath(window.location.pathname) ?? 'en'
document.documentElement.lang = { pt: 'pt-BR', es: 'es-ES', en: 'en' }[lang]
document.title = messages[lang].meta.title

// /xx/cases/<slug>/ abre a página do case; slug desconhecido volta para a home.
const caseSlug = caseSlugFromPath(window.location.pathname)
const item = caseSlug ? messages[lang].projects.items.find((i) => i.slug === caseSlug) : undefined
if (caseSlug && !item) window.location.replace(`/${lang}/`)
if (item) document.title = `${item.name} — ${item.headline.replace(/\.$/, '')} | Forgeon`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider lang={lang}>
      <App caseSlug={item ? caseSlug : null} />
    </LangProvider>
  </StrictMode>,
)
