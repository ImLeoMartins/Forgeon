// Umami (https://umami.is): visitas, países e eventos, sem cookies.
// O ID do site vem de VITE_UMAMI_ID (definido em .env.production).
// Sem o ID, nada é carregado. Só conta no domínio oficial: prévias e localhost ficam de fora.
const UMAMI_ID = import.meta.env.VITE_UMAMI_ID as string | undefined;

export function loadAnalytics() {
  if (!UMAMI_ID) return;
  const s = document.createElement("script");
  s.defer = true;
  s.src = "https://cloud.umami.is/script.js";
  s.dataset.websiteId = UMAMI_ID;
  s.dataset.domains = "www.forgeon.dev,forgeon.dev";
  document.head.appendChild(s);
}

/**
 * Atributos que o Umami lê no clique: evento "whatsapp", com a região do número
 * (americas = Leo, europe = Vinicius) e o lugar do botão na página.
 */
export function whatsappEvent(href: string, place: "float" | "navbar" | "contact" | "footer") {
  return {
    "data-umami-event": "whatsapp",
    "data-umami-event-region": href.includes("wa.me/55") ? "americas" : "europe",
    "data-umami-event-place": place,
  };
}
