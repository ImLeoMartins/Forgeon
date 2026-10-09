import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to observe elements and add "in" class when they enter the viewport.
 * Used for .rv (reveal diagonal) and .fade-up animations.
 */
export function useScrollReveal(rootMargin = "-80px") {
  const observerRef = useRef<IntersectionObserver | null>(null);
  // alvo observado -> elemento que recebe a classe "in"
  const targetsRef = useRef(new WeakMap<Element, Element>());

  const observe = useCallback(
    (el: Element | null) => {
      if (!el) return;
      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const revealed = targetsRef.current.get(entry.target) ?? entry.target;
                revealed.classList.add("in");
                observerRef.current?.unobserve(entry.target);
              }
            });
          },
          { rootMargin }
        );
      }
      // .rv começa recortado por clip-path: o observer pode considerá-lo invisível
      // (principalmente no celular) e nunca revelá-lo. Observamos o pai, que não é recortado.
      const target = el.classList.contains("rv") ? (el.parentElement ?? el) : el;
      targetsRef.current.set(target, el);
      observerRef.current.observe(target);
    },
    [rootMargin]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return observe;
}

/**
 * Hook to track scroll progress and update the progress bar.
 */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

/**
 * Hook for card mouse spotlight effect.
 */
export function useCardSpotlight() {
  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };
  return handleMouseMove;
}

/**
 * Hook for 3D tilt effect on elements.
 */
export function use3DTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      el.style.transition = "transform 500ms cubic-bezier(.16,1,.3,1)";
    };

    const handleMouseEnter = () => {
      el.style.transition = "transform 100ms ease";
    };

    // Pointer events cobrem mouse, toque e caneta. pan-y mantém o scroll vertical no celular.
    el.style.touchAction = "pan-y";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.addEventListener("pointermove", handleMouseMove);
    el.addEventListener("pointerleave", handleMouseLeave);
    el.addEventListener("pointercancel", handleMouseLeave);
    el.addEventListener("pointerup", handleMouseLeave);
    el.addEventListener("pointerenter", handleMouseEnter);

    return () => {
      el.removeEventListener("pointermove", handleMouseMove);
      el.removeEventListener("pointerleave", handleMouseLeave);
      el.removeEventListener("pointercancel", handleMouseLeave);
      el.removeEventListener("pointerup", handleMouseLeave);
      el.removeEventListener("pointerenter", handleMouseEnter);
    };
  }, [strength]);

  return ref;
}

/**
 * Hook para animação de float sutil para elementos
 */
export function useFloatAnimation(amplitude = 4, duration = 4000) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.animation = `float ${duration}ms ease-in-out infinite alternate`;

    // Adiciona o keyframe dinamicamente
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0); }
        100% { transform: translateY(-${amplitude}px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [amplitude, duration]);

  return ref;
}

/**
 * Hook para animação de pulsação suave
 */
export function usePulseAnimation(scale = 1.05, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.animation = `pulse ${duration}ms ease-in-out infinite alternate`;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.7; }
        100% { transform: scale(${scale}); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [scale, duration]);

  return ref;
}
