import { useState, useEffect } from "react";
import SpinningBorderButton from "@/components/ui/spinning-border-button";
import { NAV_SYMBOL_PATHS, WORDMARK_PATH } from "@/lib/svgAssets";
import { Menu, X } from "lucide-react";
import { LangSwitcher } from "@/components/LangSwitcher";
import { useT } from "@/i18n";

const sectionIds = ["servicos", "projetos", "processo"] as const;

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useT().nav;
  const navLinks = [
    { href: "#servicos", label: t.services },
    { href: "#projetos", label: t.projects },
    { href: "#processo", label: t.process },
  ];

  // Menu mobile: trava o scroll da página e fecha com Esc
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = sectionIds;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        aria-label={t.main}
        style={{
          position: "fixed",
          top: "calc(16px + env(safe-area-inset-top, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
          width: "min(960px, calc(100% - 32px))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 8px 8px 20px",
          background: scrolled
            ? "rgba(8,9,13,0.85)"
            : "rgba(16,17,24,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: scrolled ? "rgba(133,169,250,0.15)" : "#292B38",
          borderRadius: "999px",
          transition: "background 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(69,77,252,0.15), 0 8px 32px -8px rgba(8,9,13,0.8)"
            : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          aria-label={t.home}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            font: "700 15px 'Space Grotesk'",
            letterSpacing: "0.14em",
          }}
        >
          <svg
            viewBox="431 322 623 603"
            fill="#fff"
            aria-hidden="true"
            style={{ width: 24, height: "auto" }}
          >
            {NAV_SYMBOL_PATHS.map((d, i) => (
              <path key={i} fill="#ffffff" d={d} fillOpacity="1" fillRule="evenodd" />
            ))}
          </svg>
          <svg
            viewBox="206.0 1076.0 1060.9 97.1"
            fill="#fff"
            aria-hidden="true"
            style={{ width: 88, height: "auto" }}
          >
            <path fill="#ffffff" d={WORDMARK_PATH} fillOpacity="1" fillRule="nonzero" />
          </svg>
        </a>

        {/* Desktop nav links */}
        <ul
          style={{
            gap: 20,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
          className="hidden lg:flex"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  style={{
                    position: "relative",
                    color: isActive ? "#F4F4F7" : "#A3A6B5",
                    fontWeight: 500,
                    fontSize: 15,
                    padding: "10px 4px",
                    transition: "color 180ms ease",
                    display: "block",
                  }}
                >
                  {label}
                  {/* Underline */}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 4,
                      height: 2,
                      background: "linear-gradient(135deg, #9070F7, #454DFC 55%, #85A9FA)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "0 50%",
                      transition: "transform 280ms cubic-bezier(.16,1,.3,1)",
                      borderRadius: 2,
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Idioma + CTA */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 14 }}>
          <LangSwitcher />
          <SpinningBorderButton
            variant="primary"
            onClick={() => handleNavClick("#contato")}
            style={{ fontSize: 13 }}
          >
            {t.whatsapp}
          </SpinningBorderButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? t.closeMenu : t.openMenu}
          aria-expanded={mobileOpen}
          style={{
            background: "none",
            border: "none",
            color: "#F4F4F7",
            cursor: "pointer",
            minWidth: 44,
            minHeight: 44,
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(8,9,13,0.96)",
            backdropFilter: "blur(24px)",
            zIndex: 35,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            padding: "env(safe-area-inset-top, 0px) 24px env(safe-area-inset-bottom, 0px)",
            overflowY: "auto",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(href);
              }}
              style={{
                color: "#F4F4F7",
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {label}
            </a>
          ))}
          <SpinningBorderButton
            variant="primary"
            onClick={() => handleNavClick("#contato")}
          >
            {t.whatsapp}
          </SpinningBorderButton>
          <LangSwitcher size={16} />
        </div>
      )}
    </>
  );
}
