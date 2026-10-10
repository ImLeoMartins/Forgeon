// Parte visual dos cases. Os textos ficam em i18n/messages.ts (projects.items),
// na mesma ordem e com o mesmo slug.
import losRombosDesktop from "@/assets/cases/los-rombos-desktop.webp";
import losRombosMobile from "@/assets/cases/los-rombos-mobile.webp";
import losRombosD1 from "@/assets/cases/los-rombos-d1.webp";
import losRombosD2 from "@/assets/cases/los-rombos-d2.webp";
import losRombosM1 from "@/assets/cases/los-rombos-m1.webp";
import losRombosM2 from "@/assets/cases/los-rombos-m2.webp";

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
];
