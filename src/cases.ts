// Parte visual dos cases. Os textos ficam em i18n/messages.ts (projects.items),
// na mesma ordem e com o mesmo slug.
import losRombosDesktop from "@/assets/cases/los-rombos-desktop.webp";
import losRombosMobile from "@/assets/cases/los-rombos-mobile.webp";
import losRombosD1 from "@/assets/cases/los-rombos-d1.webp";
import losRombosD2 from "@/assets/cases/los-rombos-d2.webp";
import losRombosM1 from "@/assets/cases/los-rombos-m1.webp";
import losRombosM2 from "@/assets/cases/los-rombos-m2.webp";
import ditalyDesktop from "@/assets/cases/ditaly-desktop.webp";
import ditalyMobile from "@/assets/cases/ditaly-mobile.webp";
import ditalyD1 from "@/assets/cases/ditaly-d1.webp";
import ditalyD2 from "@/assets/cases/ditaly-d2.webp";
import ditalyM1 from "@/assets/cases/ditaly-m1.webp";
import ditalyM2 from "@/assets/cases/ditaly-m2.webp";
import rota94Desktop from "@/assets/cases/rota-94-desktop.webp";
import rota94Mobile from "@/assets/cases/rota-94-mobile.webp";
import rota94D1 from "@/assets/cases/rota-94-d1.webp";
import rota94D2 from "@/assets/cases/rota-94-d2.webp";
import rota94M1 from "@/assets/cases/rota-94-m1.webp";
import rota94M2 from "@/assets/cases/rota-94-m2.webp";

export type CaseVisual = {
  slug: string;
  status: "live" | "concept";
  accent: string;
  desktop: string;
  mobile: string;
  /** Duas telas de computador e duas de celular, na ordem das legendas em messages.ts. */
  gallery: [string, string, string, string];
  liveUrl?: string;
};

export const CASES: CaseVisual[] = [
  {
    slug: "los-rombos",
    status: "live",
    accent: "#F07F13",
    desktop: losRombosDesktop,
    mobile: losRombosMobile,
    gallery: [losRombosD1, losRombosD2, losRombosM1, losRombosM2],
    liveUrl: "https://www.losrombos.es",
  },
  {
    slug: "ditaly",
    status: "concept",
    accent: "#F5A524",
    desktop: ditalyDesktop,
    mobile: ditalyMobile,
    gallery: [ditalyD1, ditalyD2, ditalyM1, ditalyM2],
  },
  {
    slug: "rota-94",
    status: "concept",
    accent: "#FFB003",
    desktop: rota94Desktop,
    mobile: rota94Mobile,
    gallery: [rota94D1, rota94D2, rota94M1, rota94M2],
  },
];
