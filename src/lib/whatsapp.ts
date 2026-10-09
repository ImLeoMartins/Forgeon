import { useEffect, useState } from "react";
import { useLang, useT } from "@/i18n";

// Dois números: o do Leo atende as Américas; o do Vinicius, Europa e o resto do mundo.
const NUMBERS = {
  americas: "5515996825326",
  europe: "34643496470",
} as const;
type Region = keyof typeof NUMBERS;

// Países das Américas (ISO 3166-1 alfa-2), incluindo Caribe.
const AMERICAS = new Set(
  ("AG AI AR AW BB BL BM BO BQ BR BS BZ CA CL CO CR CU CW DM DO EC FK GD GF GL GP GT GY HN HT " +
    "JM KN KY LC MF MQ MS MX NI PA PE PM PR PY SR SV SX TC TT US UY VC VE VG VI").split(" "),
);

const regionOf = (country: string): Region => (AMERICAS.has(country.toUpperCase()) ? "americas" : "europe");

/** País que o próprio usuário configurou no navegador, como "BR" em pt-BR. */
function countryFromBrowser(): string | null {
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of prefs) {
    const region = tag?.split("-")[1];
    if (region && /^[A-Za-z]{2}$/.test(region)) return region;
  }
  return null;
}

/** Sem país no idioma do navegador: usa o fuso horário do aparelho. */
function regionFromTimeZone(): Region | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz.startsWith("America/")) return "americas";
    if (/^(Europe|Africa|Asia|Australia|Pacific|Indian|Atlantic)\//.test(tz)) return "europe";
  } catch {
    // Intl indisponível
  }
  return null;
}

const CC_KEY = "forgeon-cc";

/** País do visitante segundo o Cloudflare (só funciona com o site atrás do Cloudflare). */
async function countryFromCloudflare(): Promise<string | null> {
  try {
    const cached = sessionStorage.getItem(CC_KEY);
    if (cached) return cached;
  } catch {
    // armazenamento bloqueado
  }
  try {
    const res = await fetch("/cdn-cgi/trace", { signal: AbortSignal.timeout(2500) });
    const loc = (await res.text()).match(/^loc=([A-Z]{2})$/m)?.[1];
    if (!loc || loc === "XX" || loc === "T1") return null;
    try {
      sessionStorage.setItem(CC_KEY, loc);
    } catch {
      // segue sem guardar
    }
    return loc;
  } catch {
    return null;
  }
}

/**
 * Link do WhatsApp com o número certo para o visitante e a mensagem já escrita
 * no idioma da página. Ordem: país do idioma do navegador (preferência do
 * usuário) > país do Cloudflare > fuso horário > idioma da página.
 * `message` troca a mensagem padrão (por exemplo, citando o case que a pessoa viu).
 */
export function useWhatsApp(message?: string): string {
  const lang = useLang();
  const t = useT();
  const browserCountry = countryFromBrowser();
  const [region, setRegion] = useState<Region>(() =>
    browserCountry
      ? regionOf(browserCountry)
      : regionFromTimeZone() ?? (lang === "es" ? "europe" : "americas"),
  );

  useEffect(() => {
    if (browserCountry) return;
    let alive = true;
    countryFromCloudflare().then((cc) => {
      if (alive && cc) setRegion(regionOf(cc));
    });
    return () => {
      alive = false;
    };
  }, [browserCountry]);

  return `https://wa.me/${NUMBERS[region]}?text=${encodeURIComponent(message ?? t.whatsapp.message)}`;
}
