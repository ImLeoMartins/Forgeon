import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Info } from "lucide-react";
import { useScrollReveal } from "@/hooks/useAnimations";
import { useLang, useT } from "@/i18n";
import { CASES } from "@/cases";
import { CTA } from "@/components/CTA";

/** Página de um case em /xx/cases/<slug>/. Sem detalhes que prejudiquem o cliente (preço, números internos). */
export function CasePage({ slug }: { slug: string }) {
  const lang = useLang();
  const t = useT();
  const p = t.casePage;
  const index = CASES.findIndex((c) => c.slug === slug);
  const visual = CASES[index];
  const item = t.projects.items[index];
  const next = t.projects.items[(index + 1) % CASES.length];

  const observe = useScrollReveal("-60px");
  const reveal = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    reveal.current.forEach((el) => observe(el));
  }, [observe]);
  const rv = (i: number) => (el: HTMLElement | null) => {
    reveal.current[i] = el;
  };

  const [d1, d2, m1, m2] = visual.gallery;
  const [c1, c2, c3, c4] = item.gallery;

  return (
    <main className="cp" style={{ "--accent": visual.accent } as React.CSSProperties}>
      <header className="cp-hero">
        <div className="cp-wrap">
          <a className="cp-back" href={`/${lang}/#projetos`}>
            <ArrowLeft size={16} /> {p.back}
          </a>

          <div className="cp-hero-grid">
            <div className="cp-hero-copy">
              <div className="case-meta">
                <span className={`case-badge ${visual.status}`}>
                  {visual.status === "live" ? t.projects.live : t.projects.concept}
                </span>
                <span>{item.place}</span>
              </div>
              <h1 className="cp-title">{item.name}</h1>
              <p className="cp-lead">{item.headline}</p>
              <ul className="case-chips">
                {item.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              {visual.liveUrl && (
                <a className="cp-live" href={visual.liveUrl} target="_blank" rel="noopener noreferrer">
                  {p.liveLink} <ExternalLink size={15} />
                </a>
              )}
              {visual.status === "concept" && (
                <p className="cp-note">
                  <Info size={16} aria-hidden="true" />
                  <span>{p.conceptNote}</span>
                </p>
              )}
            </div>

            <div className="cp-hero-visual" aria-hidden="true">
              <div className="case-browser">
                <div className="case-browser-bar">
                  <span /><span /><span />
                </div>
                <img src={visual.desktop} alt="" width={1200} height={750} />
              </div>
              <div className="case-phone">
                <img src={visual.mobile} alt="" width={390} height={844} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="cp-section">
        <div className="cp-wrap cp-story">
          <div ref={rv(0)} className="fade-up">
            <h2 className="cp-h2">{p.contextLabel}</h2>
            <p className="cp-text">{item.context}</p>
          </div>
          <dl ref={rv(1)} className="fade-up case-dl cp-dl">
            <div>
              <dt>{t.projects.challengeLabel}</dt>
              <dd>{item.challenge}</dd>
            </div>
            <div>
              <dt>{t.projects.solutionLabel}</dt>
              <dd>{item.solution}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-wrap">
          <h2 ref={rv(2)} className="rv cp-h2">{p.deliveredLabel}</h2>
          <ol className="cp-delivered">
            {item.delivered.map((d, i) => (
              <li key={d.title} ref={rv(3 + i)} className="fade-up" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
                <span className="cp-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-wrap">
          <h2 ref={rv(8)} className="rv cp-h2">{p.galleryLabel}</h2>
          <div className="cp-gallery">
            {[
              [d1, c1],
              [d2, c2],
            ].map(([src, caption]) => (
              <figure key={src} className="cp-shot">
                <div className="case-browser">
                  <div className="case-browser-bar">
                    <span /><span /><span />
                  </div>
                  <img src={src} alt={caption} loading="lazy" decoding="async" width={1200} height={750} />
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
            <div className="cp-phones">
              {[
                [m1, c3],
                [m2, c4],
              ].map(([src, caption]) => (
                <figure key={src} className="cp-shot">
                  <div className="cp-phone">
                    <img src={src} alt={caption} loading="lazy" decoding="async" width={390} height={844} />
                  </div>
                  <figcaption>{caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA title={p.ctaTitle} lead={p.ctaLead} whatsappMessage={p.whatsappMessage.replace("{name}", item.name)} />

      <nav className="cp-wrap cp-next" aria-label={p.next}>
        <a href={`/${lang}/cases/${next.slug}/`}>
          <span>{p.next}</span>
          <strong>
            {next.name} <ArrowRight size={20} />
          </strong>
        </a>
      </nav>
    </main>
  );
}
