import { useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { useT } from "@/i18n";

type Step = { num: string; title: string; description: string };

function StepItem({ step, index }: { step: Step; index: number }) {
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
  const t = useT().process;
  const steps = t.steps.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, "0") }));
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
            {t.title}
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
