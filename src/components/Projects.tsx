import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang, useT } from "@/i18n";
import { CASES } from "@/cases";

const AUTOPLAY_MS = 7000;

export function Projects() {
  const t = useT().projects;
  const lang = useLang();
  const n = CASES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Depois de trocar pelo hover, só troca de novo quando o mouse passar pelo card da frente.
  // Sem isso, o card que assume a posição sob o mouse dispara outra troca em cascata.
  const armed = useRef(true);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const observe = useScrollReveal("-60px");

  useEffect(() => {
    observe(titleRef.current);
  }, [observe]);

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  // Gira sozinho, devagar; para com o mouse ou o foco no carrossel e com movimento reduzido.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const onBackEnter = (i: number) => {
    if (!armed.current || !window.matchMedia("(hover: hover)").matches) return;
    armed.current = false;
    go(i);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="projetos" style={{ paddingTop: 0, paddingBottom: "var(--section-y)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div ref={titleRef} className="rv">
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 48px)", fontWeight: 700, maxWidth: "20ch" }}>{t.title}</h2>
          <p className="cases-hint">{t.hint}</p>
        </div>

        <div
          className="cases"
          aria-roledescription="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            armed.current = true;
          }}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="cases-stage">
            {CASES.map((c, i) => {
              const item = t.items[i];
              const k = (i - active + n) % n; // 0 = frente, 1 e 2 = atrás
              const front = k === 0;
              return (
                <article
                  key={c.slug}
                  className={`case-card${front ? " is-front" : ""}`}
                  style={{ "--k": k, "--accent": c.accent, zIndex: n - k } as React.CSSProperties}
                  aria-hidden={!front}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${n}: ${item.name}`}
                  onMouseEnter={front ? () => (armed.current = true) : () => onBackEnter(i)}
                  onClick={front ? undefined : () => go(i)}
                  onPointerDown={front ? onPointerDown : undefined}
                  onPointerUp={front ? onPointerUp : undefined}
                >
                  <div className="case-info">
                    <div className="case-meta">
                      <span className={`case-badge ${c.status}`}>{c.status === "live" ? t.live : t.concept}</span>
                      <span>{item.place}</span>
                    </div>
                    <h3 className="case-name">{item.name}</h3>
                    <p className="case-headline">{item.headline}</p>
                    <dl className="case-dl">
                      <div>
                        <dt>{t.challengeLabel}</dt>
                        <dd>{item.challenge}</dd>
                      </div>
                      <div>
                        <dt>{t.solutionLabel}</dt>
                        <dd>{item.solution}</dd>
                      </div>
                    </dl>
                    <ul className="case-chips">
                      {item.chips.map((chip) => (
                        <li key={chip}>{chip}</li>
                      ))}
                    </ul>
                    <a href={`/${lang}/cases/${c.slug}/`} className="case-more" tabIndex={front ? 0 : -1} data-umami-event="case-open" data-umami-event-case={c.slug}>
                      {t.more} <ArrowRight size={14} />
                    </a>
                  </div>

                  <div className="case-visual" aria-hidden="true">
                    <div className="case-browser">
                      <div className="case-browser-bar">
                        <span /><span /><span />
                      </div>
                      <img src={c.desktop} alt="" loading="lazy" decoding="async" width={1200} height={750} draggable={false} />
                    </div>
                    <div className="case-phone">
                      <img src={c.mobile} alt="" loading="lazy" decoding="async" width={390} height={844} draggable={false} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="cases-nav">
            <button type="button" className="cases-arrow" onClick={() => go(active - 1)} aria-label={t.prev}>
              <ArrowLeft size={18} />
            </button>
            <div className="cases-dots">
              {CASES.map((c, i) => (
                <button
                  key={c.slug}
                  type="button"
                  className="cases-dot"
                  aria-label={`${t.goTo}: ${t.items[i].name}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button type="button" className="cases-arrow" onClick={() => go(active + 1)} aria-label={t.next}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
