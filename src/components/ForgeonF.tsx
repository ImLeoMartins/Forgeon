import { useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { FORGEON_F_MARKUP } from "@/assets/forgeonFMarkup";

/**
 * Símbolo "F" da Forgeon, dividido em 4 peças (duas pernas):
 *
 *   perna de baixo -> peça 2 (esquerda), depois peça 1 (direita)
 *   perna de cima  -> peça 3 (esquerda), depois peça 4 (direita)
 *
 * Comportamento:
 *  1. Entrada: as peças sobem uma de cada vez, de baixo para cima.
 *  2. Repouso: cada perna flutua com fase própria (o F "respira").
 *  3. Interação: o mouse (ou o toque / Enter) refaz a subida.
 *  4. Scroll: parallax suave no conjunto.
 *
 * Os tempos ficam em index.css (.f-piece-N, variável --d).
 */
const REPLAY_COOLDOWN_MS = 2400;

export function ForgeonF() {
  const parallaxRef = useParallax<HTMLDivElement>(0.3, "down");
  const [run, setRun] = useState(0);
  const lastRun = useRef(performance.now());

  const replay = (force = false) => {
    const now = performance.now();
    if (!force && now - lastRun.current < REPLAY_COOLDOWN_MS) return;
    lastRun.current = now;
    setRun((r) => r + 1);
  };

  return (
    <div ref={parallaxRef} className="f-parallax">
      <div
        className="f-mark"
        role="img"
        aria-label="Símbolo da Forgeon"
        tabIndex={0}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") replay();
        }}
        onClick={() => replay()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            replay(true);
          }
        }}
      >
        {/* O markup é estático e vem do nosso próprio SVG. A key remonta o SVG e reinicia a animação. */}
        <div
          key={run}
          className="f-svg"
          dangerouslySetInnerHTML={{ __html: FORGEON_F_MARKUP }}
        />
      </div>
    </div>
  );
}
