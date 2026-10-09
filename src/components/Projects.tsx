import { useRef, useEffect } from "react";
import { useScrollReveal, use3DTilt } from "@/hooks/useAnimations";
import { useParallax } from "@/hooks/useParallax";
import { ArrowRight } from "lucide-react";

function CaseStudy3D() {
  const tiltRef = use3DTilt(8);
  const phoneRef = useParallax<HTMLDivElement>(0.15, "up");

  return (
    <div
      ref={tiltRef}
      className="case-grid"
      style={{
        background: "linear-gradient(135deg, #1B1252, #151E6E 55%, #0D2257)",
        border: "1px solid #292B38",
        borderRadius: 24,
        overflow: "hidden",
        marginTop: 48,
        transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
        willChange: "transform",
        boxShadow: "0 0 0 1px rgba(69,77,252,.2), 0 40px 80px -20px rgba(8,9,13,.8)",
      }}
    >
      {/* Info */}
      <div
        style={{
          padding: "clamp(24px, 4vw, 56px)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#6C6F82", fontSize: 14, fontWeight: 600 }}>
          Los Rombos · Valladolid, Espanha
        </span>

        <h3
          style={{
            fontSize: "clamp(22px, 2.8vw, 34px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Site, pedidos e WhatsApp em uma só experiência móvel.
        </h3>

        <dl style={{ display: "grid", gap: 12, marginTop: 8 }}>
          <div>
            <dt style={{ fontWeight: 600, fontSize: 15, color: "#F4F4F7" }}>O desafio</dt>
            <dd style={{ color: "#A3A6B5", fontSize: 15, marginTop: 2 }}>
              Clientes pediam por mensagem solta, e a equipe perdia tempo anotando.
            </dd>
          </div>
          <div>
            <dt style={{ fontWeight: 600, fontSize: 15, color: "#F4F4F7" }}>A solução</dt>
            <dd style={{ color: "#A3A6B5", fontSize: 15, marginTop: 2 }}>
              Cardápio online, pedido direto e confirmação por WhatsApp.
            </dd>
          </div>
        </dl>

        {/* Metrics */}
        <div style={{ display: "flex", gap: 20, marginTop: 8, flexWrap: "wrap" }}>
          {[
            { value: "3×", label: "mais pedidos" },
            { value: "-70%", label: "erros de pedido" },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                padding: "12px 20px",
                background: "rgba(69,77,252,0.15)",
                border: "1px solid rgba(69,77,252,0.25)",
                borderRadius: 12,
              }}
            >
              <div style={{
                fontSize: 24,
                fontWeight: 800,
                fontFamily: "Montserrat, sans-serif",
                color: "#85A9FA",
              }}>
                {value}
              </div>
              <div style={{ fontSize: 12, color: "#A3A6B5", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        <a
          href="#contato"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            color: "#85A9FA",
            fontSize: 14,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
          }}
        >
          Ver o projeto completo <ArrowRight size={14} />
        </a>
      </div>

      {/* Screenshot placeholder with glass effect */}
      <div
        className="case-visual"
        style={{
          background: "#101118",
          display: "grid",
          placeItems: "center",
          padding: "clamp(20px, 5vw, 32px)",
          position: "relative",
          overflow: "hidden",
          minHeight: 300,
        }}
      >
        {/* Decorative background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(60% 60% at 50% 50%, rgba(69,77,252,0.15), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Mock phone UI com parallax */}
        <div
          ref={phoneRef}
          style={{
            width: "100%",
            maxWidth: 260,
            background: "rgba(23,25,35,0.9)",
            border: "1px solid rgba(133,169,250,0.2)",
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 60px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
            willChange: "transform",
          }}
        >
          {/* Phone status bar */}
          <div style={{
            height: 44,
            background: "rgba(16,17,24,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid rgba(133,169,250,0.1)",
          }}>
            <span style={{ color: "#85A9FA", fontSize: 12, fontWeight: 700 }}>Los Rombos</span>
            <div style={{ display: "flex", gap: 4 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  width: 3, height: 3,
                  background: "#454DFC",
                  borderRadius: "50%",
                  opacity: 0.4 + i * 0.2,
                }} />
              ))}
            </div>
          </div>

          {/* Mock menu items */}
          {["🍕 Margherita — 12€", "🍝 Carbonara — 14€", "🥗 Caesar — 11€"].map((item) => (
            <div
              key={item}
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                color: "#F4F4F7",
                fontSize: 13,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item}
              <div style={{
                width: 24, height: 24,
                background: "rgba(69,77,252,0.3)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#85A9FA",
                fontSize: 14,
              }}>
                +
              </div>
            </div>
          ))}

          {/* WhatsApp CTA */}
          <div style={{
            padding: 16,
            background: "rgba(37,211,102,0.1)",
            borderTop: "1px solid rgba(37,211,102,0.2)",
            color: "#25D366",
            fontSize: 13,
            fontWeight: 600,
            textAlign: "center",
          }}>
            📱 Pedir via WhatsApp
          </div>
        </div>
      </div>

    </div>
  );
}

export function Projects() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const observe = useScrollReveal("-60px");

  useEffect(() => {
    observe(titleRef.current);
  }, [observe]);

  return (
    <section id="projetos" style={{ paddingTop: 0, paddingBottom: "var(--section-y)" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        <div ref={titleRef} className="rv">
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 700, maxWidth: "18ch" }}>
            Resultado real em um restaurante real.
          </h2>
        </div>

        <CaseStudy3D />
      </div>
    </section>
  );
}
