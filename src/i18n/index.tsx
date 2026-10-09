import { createContext, useContext } from "react";
import { messages, type Messages } from "./messages";

export const LANGS = ["pt", "es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = { pt: "PT", es: "ES", en: "EN" };

// Chave usada também pelo script de redirecionamento em index.html.
const PREF_KEY = "forgeon-lang";

/** Idioma pelo primeiro segmento do endereço: /pt/, /es/, /en/. */
export function langFromPath(pathname: string): Lang | null {
  const seg = pathname.split("/")[1];
  return (LANGS as readonly string[]).includes(seg) ? (seg as Lang) : null;
}

export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(PREF_KEY, lang);
  } catch {
    // modo privado ou armazenamento bloqueado: segue sem lembrar
  }
}

const LangContext = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useT(): Messages {
  return messages[useLang()];
}
