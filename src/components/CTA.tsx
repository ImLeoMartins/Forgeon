import { useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { MessageCircle, Mail } from "lucide-react";
import { useT } from "@/i18n";
import { useWhatsApp } from "@/lib/whatsapp";
import { whatsappEvent } from "@/lib/analytics";

type CTAProps = { title?: string; lead?: string; whatsappMessage?: string };

/** Seção de contato. Nas páginas de case, recebe título, texto e mensagem do WhatsApp próprios. */
export function CTA({ title, lead, whatsappMessage }: CTAProps = {}) {
  const t = useT().cta;
  const whatsapp = useWhatsApp(whatsappMessage);
  const ref = useRef<HTMLDivElement>(null);
  const observe = useScrollReveal("-60px");

  useEffect(() => {
    observe(ref.current);
  }, [observe]);

  return (
    <section id="contato" style={{ paddingTop: 0, paddingBottom: "var(--section-y)" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        <div
          ref={ref}
          className="fade-up"
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #4128FB, #454DFC)",
            borderRadius: 24,
            padding: "clamp(32px, 6vw, 80px)",
            display: "grid",
            gap: 20,
            justifyItems: "start",
            overflow: "hidden",
          }}
        >
          {/* Background decorative mesh */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(80% 60% at 100% 0%, rgba(133,169,250,0.25), transparent 60%), radial-gradient(50% 80% at 0% 100%, rgba(144,112,247,0.3), transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Grid pattern overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
          />

          <span
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 999,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 0 8px rgba(255,255,255,0.8)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }} />
            {t.badge}
          </span>

          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 48px)",
              fontWeight: 800,
              maxWidth: "18ch",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              position: "relative",
            }}
          >
            {title ?? t.title}
          </h2>

          <p
            style={{
              maxWidth: "46ch",
              color: "rgba(244,244,247,0.85)",
              fontSize: "clamp(16px, 1.2vw + 12px, 18px)",
              position: "relative",
            }}
          >
            {lead ?? t.lead}
          </p>

          <div
            className="cta-actions"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              position: "relative",
              width: "100%",
            }}
          >
            {/* WhatsApp button */}
            <a
              href={whatsapp}
              {...whatsappEvent(whatsapp, "contact")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 48,
                padding: "0 24px",
                background: "rgba(8,9,13,0.9)",
                color: "#F4F4F7",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "transform 180ms ease, box-shadow 280ms ease, background 280ms ease",
                textDecoration: "none",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              <MessageCircle size={18} color="#25D366" />
              {t.whatsapp}
            </a>

            {/* Email button */}
            <a
              href="mailto:contato@forgeon.dev"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 48,
                padding: "0 24px",
                background: "transparent",
                color: "#fff",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                border: "1px solid rgba(255,255,255,0.5)",
                cursor: "pointer",
                transition: "transform 180ms ease, background 280ms ease, border-color 280ms ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.8)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              <Mail size={18} />
              {t.email}
            </a>
          </div>

          <style>{`
            @keyframes pulse-dot {
              0%, 100% { box-shadow: 0 0 6px rgba(255,255,255,0.8); }
              50% { box-shadow: 0 0 14px rgba(255,255,255,1); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
