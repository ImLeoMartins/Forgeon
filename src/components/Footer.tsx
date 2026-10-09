import { NAV_SYMBOL_PATHS, WORDMARK_PATH } from "@/lib/svgAssets";
import { MessageCircle } from "lucide-react";
import { goToSection, useLang, useT } from "@/i18n";
import { useWhatsApp } from "@/lib/whatsapp";

export function Footer() {
  const t = useT();
  const lang = useLang();
  const whatsapp = useWhatsApp();
  const footerLinks = [
    { href: "#servicos", label: t.nav.services },
    { href: "#projetos", label: t.nav.projects },
    { href: "#processo", label: t.nav.process },
    { href: "#contato", label: t.nav.contact },
  ];
  return (
    <footer
      style={{
        borderTop: "1px solid #292B38",
        padding: "48px 0 calc(48px + env(safe-area-inset-bottom, 0px))",
        color: "#A3A6B5",
        fontSize: 15,
      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 60px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Logo */}
        <a
          href={`/${lang}/`}
          onClick={(e) => {
            // Na home, só volta ao topo; numa página de case, o link leva à home.
            if (document.getElementById("servicos")) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          aria-label={t.nav.home}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <svg
            viewBox="431 322 623 603"
            fill="#fff"
            aria-hidden="true"
            style={{ width: 20, height: "auto", opacity: 0.6 }}
          >
            {NAV_SYMBOL_PATHS.map((d, i) => (
              <path key={i} fill="#ffffff" d={d} fillOpacity="1" fillRule="evenodd" />
            ))}
          </svg>
          <svg
            viewBox="206.0 1076.0 1060.9 97.1"
            fill="#fff"
            aria-hidden="true"
            style={{ width: 72, height: "auto", opacity: 0.6 }}
          >
            <path fill="#ffffff" d={WORDMARK_PATH} fillOpacity="1" fillRule="nonzero" />
          </svg>
        </a>

        {/* Links */}
        <nav aria-label={t.nav.footer} style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {footerLinks.map(({ href, label }) => (
            <a
              key={href}
              href={`/${lang}/${href}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(lang, href);
              }}
              style={{
                color: "#6C6F82",
                transition: "color 180ms ease",
                fontSize: 14,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F4F4F7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6C6F82")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright & WhatsApp */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: "#6C6F82", fontSize: 13 }}>
            © {new Date().getFullYear()} Forgeon. {t.footer.rights}
          </span>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#25D366",
              fontSize: 13,
              fontWeight: 600,
              transition: "opacity 180ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
