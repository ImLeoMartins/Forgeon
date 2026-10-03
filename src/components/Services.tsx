import { useRef, useEffect } from "react";
import { useScrollReveal, useCardSpotlight } from "@/hooks/useAnimations";
import { Globe, Box, Zap, Bot } from "lucide-react";

interface Service {
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

const services: Service[] = [
  {
    tag: "Websites",
    title: "Presença digital que trabalha pelo seu negócio.",
    description:
      "Sites institucionais e de venda, rápidos, no celular primeiro e prontos para converter visitas em conversas.",
    icon: <Globe size={28} />,
    accent: "#454DFC",
  },
  {
    tag: "Produtos digitais",
    title: "Transformamos ideias em produtos.",
    description:
      "Aplicativos, plataformas e painéis sob medida, do protótipo ao produto em uso.",
    icon: <Box size={28} />,
    accent: "#9070F7",
  },
  {
    tag: "Automação",
    title: "Menos operação manual.",
    description:
      "Conectamos pedidos, mensagens, planilhas e sistemas para que tarefas repetidas rodem sozinhas.",
    icon: <Zap size={28} />,
    accent: "#85A9FA",
  },
  {
    tag: "Agentes de IA",
    title: "Tecnologia que trabalha enquanto você trabalha.",
    description:
      "Assistentes que atendem, qualificam e resolvem tarefas dentro da sua rotina, com limites que você define.",
    icon: <Bot size={28} />,
    accent: "#6F41FA",
  },
];

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const observe = useScrollReveal("-60px");
  const handleMouseMove = useCardSpotlight();

  useEffect(() => {
    observe(cardRef.current);
  }, [observe]);

  return (
    <div
      ref={cardRef}
      className="fade-up"
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
      onMouseMove={handleMouseMove}
    >
      <article
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          minHeight: 280,
          padding: 32,
          background: "rgba(16,17,24,0.8)",
          border: "1px solid #292B38",
          borderRadius: 24,
          overflow: "hidden",
          cursor: "default",
          transition: "transform 280ms cubic-bezier(.16,1,.3,1), border-color 280ms ease, box-shadow 280ms ease",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className="service-card group"
      >
        {/* Spotlight glow */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), ${service.accent}33, transparent 60%)`,
            opacity: 0,
            transition: "opacity 280ms ease",
            pointerEvents: "none",
          }}
          className="card-spotlight"
        />

        {/* Glass shimmer top edge */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(133,169,250,0.3), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `${service.accent}1A`,
            border: `1px solid ${service.accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: service.accent,
            position: "relative",
          }}
        >
          {service.icon}
        </div>

        <span
          style={{ color: service.accent, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}
        >
          {service.tag}
        </span>

        <h3
          style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", position: "relative" }}
        >
          {service.title}
        </h3>

        <p style={{ color: "#A3A6B5", fontSize: 16, flex: 1, position: "relative" }}>
          {service.description}
        </p>

        <a
          href="#contato"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            color: service.accent,
            fontSize: 14,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
            position: "relative",
            transition: "gap 200ms ease",
          }}
        >
          Ver como funciona
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </article>

      <style>{`
        .service-card:hover {
          transform: translateY(-8px) !important;
          border-color: ${service.accent}66 !important;
          box-shadow: 0 0 0 1px ${service.accent}40, 0 20px 60px -12px ${service.accent}40 !important;
        }
        .service-card:hover .card-spotlight {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}

export function Services() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const observe = useScrollReveal("-60px");

  useEffect(() => {
    observe(titleRef.current);
    observe(leadRef.current);
  }, [observe]);

  return (
    <section id="servicos" style={{ padding: "96px 0" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        <div ref={titleRef} className="rv">
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 700, maxWidth: "18ch" }}>
            Quatro frentes, um mesmo padrão de entrega.
          </h2>
        </div>
        <p
          ref={leadRef}
          className="fade-up"
          style={{
            marginTop: 16,
            maxWidth: "56ch",
            color: "#A3A6B5",
            fontSize: 19,
            "--delay": "150ms",
          } as React.CSSProperties}
        >
          Cada projeto começa pelo problema do seu negócio, não pela ferramenta.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 48,
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.tag} service={service} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
