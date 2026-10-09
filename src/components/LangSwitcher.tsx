import { LANGS, LANG_LABELS, rememberLang, useLang, useT } from "@/i18n";

/** Troca de idioma: PT · ES · EN. Cada idioma tem o próprio endereço. */
export function LangSwitcher({ size = 13 }: { size?: number }) {
  const current = useLang();
  const t = useT();

  return (
    <nav aria-label={t.nav.language} className="lang-switch" style={{ fontSize: size }}>
      {LANGS.map((lang) => (
        <a
          key={lang}
          href={`/${lang}/`}
          hrefLang={lang}
          lang={lang}
          aria-current={lang === current ? "page" : undefined}
          onClick={() => rememberLang(lang)}
        >
          {LANG_LABELS[lang]}
        </a>
      ))}
    </nav>
  );
}
