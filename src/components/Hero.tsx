import SpinningBorderButton from "@/components/ui/spinning-border-button";
import Velaris from "@/components/ui/velaris";
import { ForgeonF } from "@/components/ForgeonF";
import { Check } from "lucide-react";
import { useT } from "@/i18n";

// Paleta do Design System V2 da Forgeon (ver :root em index.css)
//   --void #08090D | --blue #454DFC | --violet #9070F7 | --ultra #4128FB | --g-deep #1B1252
// Ordem importa no shader: [0] domina, [1] também gera o brilho central, [3] escurece.
const HERO_BG = "#08090D";
const HERO_COLORS = ["#454DFC", "#9070F7", "#4128FB", "#1B1252"];

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

const scrollTo = (id: string) => () => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const t = useT().hero;
  const [lead1, strong1, lead2, strong2, lead3] = t.lead;

  return (
    <header id="top" className="hero">
      {/* Fundo WebGL */}
      <div className="hero-bg" aria-hidden="true">
        <Velaris
          height="100%"
          bg={HERO_BG}
          colors={HERO_COLORS}
          speed={1.4}
          grain={0.25}
        />
        {/* Gradientes da marca (--ultra, --peri, --violet, --g-deep) sobre o Velaris */}
        <div className="hero-brand-glow" />
        {/* Garante contraste do texto e emenda o fim do hero com a próxima seção */}
        <div className="hero-scrim" />
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-in hero-eyebrow" style={delay(0)}>
            <span className="hero-eyebrow-dot" />
            <span>{t.eyebrow}</span>
          </div>

          <h1 className="hero-in hero-title" style={delay(1)}>
            {t.title1}
            <br />
            <span className="hero-title-grad">{t.title2}</span>
          </h1>

          <p className="hero-in hero-lead" style={delay(2)}>
            {lead1}
            <strong>{strong1}</strong>
            {lead2}
            <strong>{strong2}</strong>
            {lead3}
          </p>

          <div className="hero-in hero-cta" style={delay(3)}>
            <SpinningBorderButton variant="primary" onClick={scrollTo("#contato")}>
              {t.primary}
            </SpinningBorderButton>
            <SpinningBorderButton onClick={scrollTo("#projetos")}>
              {t.secondary}
            </SpinningBorderButton>
          </div>

          <ul className="hero-in hero-offers" style={delay(5)}>
            {t.offers.map((offer) => (
              <li key={offer}>
                <Check size={16} aria-hidden="true" />
                {offer}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <ForgeonF />
        </div>
      </div>

      <div aria-hidden="true" className="hero-cue">
        <span>{t.scroll}</span>
        <div className="hero-cue-line" />
      </div>
    </header>
  );
}
