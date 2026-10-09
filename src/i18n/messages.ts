// Textos do site nos três idiomas. O português é a referência: os outros
// idiomas precisam ter exatamente as mesmas chaves (o TypeScript confere).

const pt = {
  meta: {
    title: "Forgeon — Sites, automações e agentes de IA",
    description:
      "Criamos sites, produtos digitais, automações e agentes de IA para empresas que querem vender mais e operar com menos trabalho manual.",
  },
  nav: {
    services: "Serviços",
    projects: "Projetos",
    process: "Como trabalhamos",
    contact: "Contato",
    whatsapp: "Falar no WhatsApp",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    home: "Forgeon, início",
    main: "Principal",
    footer: "Rodapé",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Tecnologia que trabalha pelo seu negócio",
    title1: "Seu negócio.",
    title2: "Nossa tecnologia.",
    lead: ["Criamos sites, produtos digitais, automações e agentes de IA para empresas que querem ", "vender mais", " e operar com ", "menos trabalho manual", "."],
    primary: "Falar com a Forgeon",
    secondary: "Ver nosso trabalho",
    offers: [
      "Um exemplo para o seu negócio antes de fechar",
      "Escopo, prazo e preço definidos na proposta",
      "Atendimento em português, espanhol e inglês",
    ],
    scroll: "ROLAR",
  },
  services: {
    title: "Quatro frentes, um mesmo padrão de entrega.",
    lead: "Cada projeto começa pelo problema do seu negócio, não pela ferramenta.",
    more: "Ver como funciona",
    items: [
      {
        tag: "Websites",
        title: "Presença digital que trabalha pelo seu negócio.",
        description: "Sites institucionais e de venda, rápidos, no celular primeiro e prontos para converter visitas em conversas.",
      },
      {
        tag: "Produtos digitais",
        title: "Transformamos ideias em produtos.",
        description: "Aplicativos, plataformas e painéis sob medida, do protótipo ao produto em uso.",
      },
      {
        tag: "Automação",
        title: "Menos operação manual.",
        description: "Conectamos pedidos, mensagens, planilhas e sistemas para que tarefas repetidas rodem sozinhas.",
      },
      {
        tag: "Agentes de IA",
        title: "Tecnologia que trabalha enquanto você trabalha.",
        description: "Assistentes que atendem, qualificam e resolvem tarefas dentro da sua rotina, com limites que você define.",
      },
    ],
  },
  projects: {
    title: "Trabalho feito para negócios de verdade.",
    hint: "Passe o mouse ou toque nos cards de trás para trocar de projeto.",
    live: "No ar",
    concept: "Projeto conceitual",
    challengeLabel: "O desafio",
    solutionLabel: "A solução",
    more: "Ver o projeto completo",
    prev: "Projeto anterior",
    next: "Próximo projeto",
    goTo: "Ver projeto",
    items: [
      {
        name: "Los Rombos",
        place: "Bar e restaurante · Valladolid, Espanha",
        headline: "Site, pedidos e WhatsApp em uma só experiência móvel.",
        challenge: "Clientes pediam por mensagem solta, e a equipe perdia tempo anotando.",
        solution: "Cardápio online, pedido direto e confirmação por WhatsApp.",
        chips: ["Cardápio online", "Pedido pelo WhatsApp", "Reserva de mesa"],
      },
      {
        name: "DITALY",
        place: "Rede de pizzarias napolitanas · Espanha",
        headline: "Um site para sete restaurantes, com carta, reservas e pedidos.",
        challenge: "Cada restaurante precisava de espaço próprio sem perder a força da marca.",
        solution: "Uma página para cada local, carta única e caminho curto para reservar ou pedir.",
        chips: ["Página por restaurante", "Reserva e pedido online", "Espanhol e inglês"],
      },
      {
        name: "Rota 94",
        place: "Hamburgueria · Tietê, Brasil",
        headline: "Cardápio com sacola que monta o pedido no WhatsApp.",
        challenge: "A casa vendia pelo Instagram e pelo WhatsApp, sem um cardápio fácil de consultar.",
        solution: "Cardápio com filtros, sacola que envia o pedido pronto e aviso de aberto ou fechado.",
        chips: ["Cardápio com filtros", "Sacola no WhatsApp", "Aberto agora"],
      },
    ],
  },
  process: {
    title: "Do primeiro contato ao site no ar.",
    steps: [
      { title: "Conversa", description: "Entendemos seu negócio, seus clientes e o que precisa mudar." },
      { title: "Proposta", description: "Escopo, prazo e preço claros antes de qualquer trabalho começar." },
      { title: "Construção", description: "Você acompanha a evolução em versões navegáveis, no desktop e no celular." },
      { title: "Lançamento", description: "Publicamos, medimos e seguimos ajustando com você." },
    ],
  },
  cta: {
    badge: "Respondemos no mesmo dia",
    title: "Conte o que você precisa.",
    lead: "Prefere ver antes de decidir? Montamos um exemplo para o seu negócio, sem compromisso.",
    whatsapp: "Falar no WhatsApp",
    email: "Enviar e-mail",
  },
  footer: {
    rights: "Todos os direitos reservados.",
  },
  whatsapp: {
    message: "Olá! Vim pelo site da Forgeon e quero conversar sobre um projeto.",
    float: "Conversar no WhatsApp",
  },
};

export type Messages = typeof pt;

const es: Messages = {
  meta: {
    title: "Forgeon — Webs, automatizaciones y agentes de IA",
    description:
      "Creamos webs, productos digitales, automatizaciones y agentes de IA para empresas que quieren vender más y trabajar con menos tareas manuales.",
  },
  nav: {
    services: "Servicios",
    projects: "Proyectos",
    process: "Cómo trabajamos",
    contact: "Contacto",
    whatsapp: "Hablar por WhatsApp",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Forgeon, inicio",
    main: "Principal",
    footer: "Pie de página",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Tecnología que trabaja para tu negocio",
    title1: "Tu negocio.",
    title2: "Nuestra tecnología.",
    lead: ["Creamos webs, productos digitales, automatizaciones y agentes de IA para empresas que quieren ", "vender más", " y trabajar con ", "menos tareas manuales", "."],
    primary: "Hablar con Forgeon",
    secondary: "Ver nuestro trabajo",
    offers: [
      "Un ejemplo para tu negocio antes de cerrar el trato",
      "Alcance, plazo y precio definidos en la propuesta",
      "Atención en español, portugués e inglés",
    ],
    scroll: "DESLIZAR",
  },
  services: {
    title: "Cuatro áreas, un mismo nivel de entrega.",
    lead: "Cada proyecto empieza por el problema de tu negocio, no por la herramienta.",
    more: "Ver cómo funciona",
    items: [
      {
        tag: "Webs",
        title: "Presencia digital que trabaja para tu negocio.",
        description: "Webs corporativas y de venta, rápidas, pensadas primero para el móvil y listas para convertir visitas en conversaciones.",
      },
      {
        tag: "Productos digitales",
        title: "Convertimos ideas en productos.",
        description: "Aplicaciones, plataformas y paneles a medida, del prototipo al producto en uso.",
      },
      {
        tag: "Automatización",
        title: "Menos trabajo manual.",
        description: "Conectamos pedidos, mensajes, hojas de cálculo y sistemas para que las tareas repetitivas funcionen solas.",
      },
      {
        tag: "Agentes de IA",
        title: "Tecnología que trabaja mientras tú trabajas.",
        description: "Asistentes que atienden, cualifican y resuelven tareas dentro de tu rutina, con los límites que tú defines.",
      },
    ],
  },
  projects: {
    title: "Trabajo hecho para negocios de verdad.",
    hint: "Pasa el ratón o toca las tarjetas de atrás para cambiar de proyecto.",
    live: "Publicado",
    concept: "Proyecto conceptual",
    challengeLabel: "El reto",
    solutionLabel: "La solución",
    more: "Ver el proyecto completo",
    prev: "Proyecto anterior",
    next: "Proyecto siguiente",
    goTo: "Ver proyecto",
    items: [
      {
        name: "Los Rombos",
        place: "Bar y restaurante · Valladolid, España",
        headline: "Web, pedidos y WhatsApp en una sola experiencia móvil.",
        challenge: "Los clientes pedían con mensajes sueltos y el equipo perdía tiempo apuntando.",
        solution: "Carta online, pedido directo y confirmación por WhatsApp.",
        chips: ["Carta online", "Pedidos por WhatsApp", "Reserva de mesa"],
      },
      {
        name: "DITALY",
        place: "Cadena de pizzerías napolitanas · España",
        headline: "Una web para siete restaurantes, con carta, reservas y pedidos.",
        challenge: "Cada restaurante necesitaba su propio espacio sin perder la fuerza de la marca.",
        solution: "Una página para cada local, una carta común y un camino corto para reservar o pedir.",
        chips: ["Página por restaurante", "Reservas y pedidos online", "Español e inglés"],
      },
      {
        name: "Rota 94",
        place: "Hamburguesería · Tietê, Brasil",
        headline: "Carta con cesta que prepara el pedido en WhatsApp.",
        challenge: "El local vendía por Instagram y WhatsApp, sin una carta fácil de consultar.",
        solution: "Carta con filtros, cesta que envía el pedido listo y aviso de abierto o cerrado.",
        chips: ["Carta con filtros", "Cesta en WhatsApp", "Abierto ahora"],
      },
    ],
  },
  process: {
    title: "Del primer contacto a la web publicada.",
    steps: [
      { title: "Conversación", description: "Entendemos tu negocio, tus clientes y lo que hay que cambiar." },
      { title: "Propuesta", description: "Alcance, plazo y precio claros antes de empezar cualquier trabajo." },
      { title: "Desarrollo", description: "Sigues la evolución en versiones navegables, en ordenador y en móvil." },
      { title: "Lanzamiento", description: "Publicamos, medimos y seguimos ajustando contigo." },
    ],
  },
  cta: {
    badge: "Respondemos el mismo día",
    title: "Cuéntanos qué necesitas.",
    lead: "¿Prefieres verlo antes de decidir? Preparamos un ejemplo para tu negocio, sin compromiso.",
    whatsapp: "Hablar por WhatsApp",
    email: "Enviar un correo",
  },
  footer: {
    rights: "Todos los derechos reservados.",
  },
  whatsapp: {
    message: "¡Hola! Vengo de la web de Forgeon y quiero hablar sobre un proyecto.",
    float: "Hablar por WhatsApp",
  },
};

const en: Messages = {
  meta: {
    title: "Forgeon — Websites, automation and AI agents",
    description:
      "We build websites, digital products, automations and AI agents for businesses that want to sell more and spend less time on manual work.",
  },
  nav: {
    services: "Services",
    projects: "Projects",
    process: "How we work",
    contact: "Contact",
    whatsapp: "Chat on WhatsApp",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Forgeon, home",
    main: "Main",
    footer: "Footer",
    language: "Language",
  },
  hero: {
    eyebrow: "Technology that works for your business",
    title1: "Your business.",
    title2: "Our technology.",
    lead: ["We build websites, digital products, automations and AI agents for businesses that want to ", "sell more", " and spend ", "less time on manual work", "."],
    primary: "Talk to Forgeon",
    secondary: "See our work",
    offers: [
      "A preview built for your business before you commit",
      "Scope, timeline and price set in the proposal",
      "Support in English, Spanish and Portuguese",
    ],
    scroll: "SCROLL",
  },
  services: {
    title: "Four areas, one standard of delivery.",
    lead: "Every project starts with your business problem, not with the tool.",
    more: "See how it works",
    items: [
      {
        tag: "Websites",
        title: "An online presence that works for your business.",
        description: "Company and sales websites that are fast, built mobile-first and ready to turn visits into conversations.",
      },
      {
        tag: "Digital products",
        title: "We turn ideas into products.",
        description: "Custom apps, platforms and dashboards, from prototype to a product in use.",
      },
      {
        tag: "Automation",
        title: "Less manual work.",
        description: "We connect orders, messages, spreadsheets and systems so repetitive tasks run on their own.",
      },
      {
        tag: "AI agents",
        title: "Technology that works while you work.",
        description: "Assistants that answer, qualify and handle tasks inside your routine, within the limits you set.",
      },
    ],
  },
  projects: {
    title: "Work built for real businesses.",
    hint: "Hover or tap the cards behind to switch projects.",
    live: "Live",
    concept: "Concept project",
    challengeLabel: "The challenge",
    solutionLabel: "The solution",
    more: "See the full project",
    prev: "Previous project",
    next: "Next project",
    goTo: "Show project",
    items: [
      {
        name: "Los Rombos",
        place: "Bar and restaurant · Valladolid, Spain",
        headline: "Website, orders and WhatsApp in one mobile experience.",
        challenge: "Customers ordered through scattered messages, and the staff lost time writing them down.",
        solution: "Online menu, direct ordering and WhatsApp confirmation.",
        chips: ["Online menu", "WhatsApp orders", "Table booking"],
      },
      {
        name: "DITALY",
        place: "Neapolitan pizza chain · Spain",
        headline: "One website for seven restaurants, with menu, bookings and orders.",
        challenge: "Each restaurant needed its own space without diluting the brand.",
        solution: "A page for every location, one shared menu and a short path to book or order.",
        chips: ["A page per restaurant", "Online bookings and orders", "Spanish and English"],
      },
      {
        name: "Rota 94",
        place: "Burger joint · Tietê, Brazil",
        headline: "A menu with a cart that builds the order in WhatsApp.",
        challenge: "The place sold through Instagram and WhatsApp, with no easy menu to browse.",
        solution: "Filterable menu, a cart that sends the finished order and an open/closed indicator.",
        chips: ["Filterable menu", "WhatsApp cart", "Open now"],
      },
    ],
  },
  process: {
    title: "From first contact to a live website.",
    steps: [
      { title: "Conversation", description: "We learn about your business, your customers and what needs to change." },
      { title: "Proposal", description: "Clear scope, timeline and price before any work begins." },
      { title: "Build", description: "You follow progress through clickable versions, on desktop and mobile." },
      { title: "Launch", description: "We publish, measure and keep improving with you." },
    ],
  },
  cta: {
    badge: "We reply the same day",
    title: "Tell us what you need.",
    lead: "Want to see it before you decide? We'll build a preview for your business, no strings attached.",
    whatsapp: "Chat on WhatsApp",
    email: "Send an email",
  },
  footer: {
    rights: "All rights reserved.",
  },
  whatsapp: {
    message: "Hi! I found Forgeon through your website and I'd like to talk about a project.",
    float: "Chat on WhatsApp",
  },
};

export const messages = { pt, es, en };
