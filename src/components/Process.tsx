import { useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useAnimations";

const steps = [
  {
    num: "01",
    title: "Conversa",
    description: "Entendemos seu negócio, seus clientes e o que precisa mudar.",
  },
  {
    num: "02",
    title: "Proposta",
    description: "Escopo, prazo e preço claros antes de qualquer trabalho começar.",
  },
  {
    num: "03",
    title: "Construção",
    description: "Você acompanha a evolução em versões navegáveis, no desktop e no celular.",
  },
  {
    num: "04",
    title: "Lançamento",
    description: "Publicamos, medimos e seguimos ajustando com você.",
  },
];

function StepItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const observe = useScrollReveal("-40px");

  useEffect(() => {
    observe(ref.current);
  }, [observe]);

  return (
    <li
      ref={ref}
      className="step fade-up"
      style={{ "--delay": `${index * 120}ms`, cursor: "default" } as React.CSSProperties}
    >
      {/* Linha de progresso: hover no desktop, preenche ao aparecer no celular (ver index.css) */}
      <div aria-hidden className="step-line" />

      <span
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: "#85A9FA",
          letterSpacing: "0.1em",
        }}
      >
        {step.num}
      </span>

      <h3 style={{ fontSize: 20, fontWeight: 600, margin: "8px 0", letterSpacing: "-0.01em", color: "#F4F4F7" }}>
        {step.title}
      </h3>

      <p style={{ color: "#A3A6B5", fontSize: 16 }}>{step.description}</p>
    </li>
  );
}

export function Process() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const observe = useScrollReveal("-60px");

  useEffect(() => {
    observe(titleRef.current);
  }, [observe]);

  return (
    <section id="processo" style={{ paddingTop: 0, paddingBottom: "var(--section-y)" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        <div ref={titleRef} className="rv">
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 700, maxWidth: "18ch" }}>
            Do primeiro contato ao site no ar.
          </h2>
        </div>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: 20,
            counterReset: "s",
          }}
        >
          {steps.map((step, i) => (
            <StepItem key={step.num} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
