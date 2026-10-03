import { useEffect, useRef } from "react";

/**
 * Hook para animação parallax baseada em scroll
 * @param factor - Intensidade do efeito parallax (0-1)
 * @param direction - Direção do movimento ('up', 'down', 'left', 'right')
 */
export function useParallax(
  factor = 0.2,
  direction: "up" | "down" | "left" | "right" = "up"
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = viewportHeight / 2 - elementCenter;

      // Normaliza a distância (-1 a 1)
      const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / (viewportHeight / 2)));

      // Calcula o deslocamento com easing suave
      const displacement = normalizedDistance * factor * 100;

      // Aplica transformação baseada na direção
      switch (direction) {
        case "up":
          el.style.transform = `translateY(${displacement}px)`;
          break;
        case "down":
          el.style.transform = `translateY(${-displacement}px)`;
          break;
        case "left":
          el.style.transform = `translateX(${displacement}px)`;
          break;
        case "right":
          el.style.transform = `translateX(${-displacement}px)`;
          break;
      }
    };

    // Adiciona transition suave
    el.style.transition = "transform 120ms cubic-bezier(.16,1,.3,1)";

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Executa uma vez para posicionamento inicial

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [factor, direction]);

  return ref;
}

/**
 * Hook para animação de scroll-triggered scale
 * @param minScale - Escala mínima (ex: 0.8)
 * @param maxScale - Escala máxima (ex: 1)
 */
export function useScrollScale(minScale = 0.8, maxScale = 1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Quando o elemento está no viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // Calcula quanto do elemento está visível
      const visibleHeight = Math.min(viewportHeight, elementBottom) - Math.max(0, elementTop);
      const visibleRatio = visibleHeight / rect.height;

      // Aplica escala baseada na visibilidade
      if (visibleRatio > 0) {
        const scale = minScale + (maxScale - minScale) * Math.min(1, visibleRatio);
        el.style.transform = `scale(${scale})`;
      }
    };

    el.style.transition = "transform 200ms cubic-bezier(.16,1,.3,1)";
    el.style.transformOrigin = "center";

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [minScale, maxScale]);

  return ref;
}

/**
 * Hook para animação de rotação com scroll
 * @param maxRotation - Rotação máxima em graus (ex: 15)
 */
export function useScrollRotation(maxRotation = 10) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = (scrollY / 100) % maxRotation;
      el.style.transform = `rotate(${rotation}deg)`;
    };

    el.style.transition = "transform 200ms ease";
    el.style.transformOrigin = "center";

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxRotation]);

  return ref;
}