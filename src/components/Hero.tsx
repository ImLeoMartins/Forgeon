import SpinningBorderButton from "@/components/ui/spinning-border-button";
import Velaris from "@/components/ui/velaris";
import { ForgeonF } from "@/components/ForgeonF";

// Paleta do Design System V2 da Forgeon (ver :root em index.css)
//   --void #08090D | --blue #454DFC | --violet #9070F7 | --ultra #4128FB | --g-deep #1B1252
// Ordem importa no shader: [0] domina, [1] também gera o brilho central, [3] escurece.
const HERO_BG = "#08090D";
const HERO_COLORS = ["#454DFC", "#9070F7", "#4128FB", "#1B1252"];

const stats = [
  { num: "50+", label: "projetos entregues" },
  { num: "98%", label: "satisfação de clientes" },
  { num: "3×", label: "conversão média" },
];

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  const handleContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

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
            <span>Tecnologia que trabalha pelo seu negócio</span>
          </div>

          <h1 className="hero-in hero-title" style={delay(1)}>
            Seu negócio.
            <br />
            <span className="hero-title-grad">Nossa tecnologia.</span>
          </h1>

          <p className="hero-in hero-lead" style={delay(2)}>
            Criamos sites, produtos digitais, automações e agentes de IA para empresas que querem{" "}
            <strong>vender mais</strong> e operar com <strong>menos trabalho manual</strong>.
          </p>

          <div className="hero-in hero-cta" style={delay(3)}>
            <SpinningBorderButton variant="primary" onClick={handleContact}>
              Falar com a Forgeon
            </SpinningBorderButton>
            <SpinningBorderButton onClick={handleContact}>
              Ver nosso trabalho
            </SpinningBorderButton>
          </div>

          <div className="hero-in hero-stats" style={delay(5)}>
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div className="hero-stat-num">{num}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <ForgeonF />
        </div>
      </div>

      <div aria-hidden="true" className="hero-cue">
        <span>ROLAR</span>
        <div className="hero-cue-line" />
      </div>
    </header>
  );
}
