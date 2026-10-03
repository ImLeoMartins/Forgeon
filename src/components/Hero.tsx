import { useEffect, useRef } from "react";
import SpinningBorderButton from "@/components/ui/spinning-border-button";
import { useParallax } from "@/hooks/useParallax";
import { ParticlesBackground } from "./ParticlesBackground";

// Import do símbolo real da Forgeon
import ForgeonSimbolo from "@/assets/ForgeonSimbolo.svg";

export function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useParallax(0.3, "down");
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger entrance animations
    const els = [h1Ref.current, pRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity 600ms cubic-bezier(.16,1,.3,1), transform 600ms cubic-bezier(.16,1,.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  }, []);

  const handleContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      id="top"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "140px 0 64px",
        overflow: "hidden",
        background:
          "radial-gradient(60% 50% at 78% 45%, rgba(65,40,251,.3), transparent 70%), radial-gradient(40% 40% at 90% 70%, rgba(133,169,250,.22), transparent 70%)",
      }}
    >
      {/* Particle background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <ParticlesBackground />

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 50% at 78% 45%, rgba(65,40,251,.3), transparent 70%), radial-gradient(40% 40% at 90% 70%, rgba(133,169,250,.22), transparent 70%), radial-gradient(30% 50% at 30% 20%, rgba(144,112,247,.15), transparent 80%)",
          }}
        />
      </div>

      <div
        className="wrap"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48,
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          {/* Eyebrow label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "rgba(69,77,252,0.12)",
              border: "1px solid rgba(69,77,252,0.25)",
              borderRadius: 999,
              marginBottom: 24,
              opacity: 0,
              animation: "pagein 500ms cubic-bezier(.16,1,.3,1) 100ms both",
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#85A9FA",
              boxShadow: "0 0 8px #85A9FA",
            }} />
            <span style={{ color: "#85A9FA", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>
              Tecnologia que trabalha pelo seu negócio
            </span>
          </div>

          <h1
            ref={h1Ref}
            style={{
              fontSize: "clamp(40px, 6.4vw, 84px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Seu negócio.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6F41FA, #454DFC 55%, #85A9FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nossa tecnologia.
            </span>
          </h1>

          <p
            ref={pRef}
            style={{
              margin: "24px 0 32px",
              maxWidth: "52ch",
              color: "#A3A6B5",
              fontSize: 19,
              lineHeight: 1.6,
            }}
          >
            Criamos sites, produtos digitais, automações e agentes de IA para empresas que querem{" "}
            <strong style={{ color: "#F4F4F7", fontWeight: 600 }}>vender mais</strong> e operar com{" "}
            <strong style={{ color: "#F4F4F7", fontWeight: 600 }}>menos trabalho manual</strong>.
          </p>

          <div
            ref={ctaRef}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
          >
            <SpinningBorderButton variant="primary" onClick={handleContact}>
              Falar com a Forgeon
            </SpinningBorderButton>
            <SpinningBorderButton onClick={handleContact}>
              Ver nosso trabalho
            </SpinningBorderButton>
          </div>

          {/* Stats com animação de float */}
          <div
            ref={statsRef}
            style={{
              display: "flex",
              gap: 32,
              marginTop: 48,
              opacity: 0,
              animation: "pagein 600ms cubic-bezier(.16,1,.3,1) 700ms both, float-stats 3s ease-in-out infinite",
            }}
          >
            {[
              { num: "50+", label: "projetos entregues" },
              { num: "98%", label: "satisfação de clientes" },
              { num: "3×", label: "conversão média" },
            ].map(({ num, label }) => (
              <div key={label} style={{ position: "relative" }}>
                <div style={{
                  fontSize: "clamp(22px, 2.5vw, 32px)",
                  fontWeight: 800,
                  fontFamily: "Montserrat, sans-serif",
                  background: "linear-gradient(135deg, #9070F7, #85A9FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {num}
                </div>
                <div style={{ color: "#A3A6B5", fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero logo - símbolo real da Forgeon com parallax */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          opacity: 0,
          animation: "pagein 800ms cubic-bezier(.16,1,.3,1) 300ms both",
          width: "100%",
          maxWidth: 520,
          height: "auto",
          position: "relative",
        }}>
          <img
            ref={logoRef}
            src={ForgeonSimbolo}
            alt="Símbolo da Forgeon"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 520,
              filter: "drop-shadow(0 0 60px rgba(65,40,251,0.6))",
              opacity: 0,
              transform: "translate(-120px, 80px)",
              animation: "build 900ms cubic-bezier(.16,1,.3,1) 300ms both",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0,
          animation: "pagein 600ms ease 1200ms both",
        }}
      >
        <span style={{ color: "#6C6F82", fontSize: 12, letterSpacing: "0.12em" }}>
          ROLAR
        </span>
        <div style={{
          width: 1,
          height: 32,
          background: "linear-gradient(to bottom, #454DFC, transparent)",
          animation: "pulse-line 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-logo { order: -1; justify-content: flex-start !important; }
          .hero-logo svg { max-width: 200px !important; }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </header>
  );
}
