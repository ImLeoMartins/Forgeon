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
        slug: "los-rombos",
        summary: "Site do bar Los Rombos, em Valladolid: cardápio online, pedidos pelo WhatsApp e reserva de mesa.",
        context: "O Los Rombos é um bar e restaurante de bairro em Valladolid, aberto do café da manhã ao jantar. Os pedidos chegavam por mensagens soltas e ligações, e a casa não tinha um lugar para mostrar o cardápio inteiro.",
        delivered: [
          { title: "Cardápio online", text: "Pratos por categoria, com filtro de alérgenos, fáceis de consultar no celular." },
          { title: "Pedido pelo WhatsApp", text: "O cliente monta o pedido no site e envia pronto, sem app e sem comissão de intermediário." },
          { title: "Reserva de mesa", text: "Um formulário curto que chega como mensagem para a equipe confirmar." },
          { title: "Pronto para o Google", text: "Os dados do restaurante vão marcados para aparecer melhor nas buscas da região." },
        ],
        gallery: ["O ambiente, em galeria", "Por que escolher o Los Rombos", "O cardápio no celular", "A página inicial no celular"],
      },
    ],
  },
  casePage: {
    back: "Todos os projetos",
    contextLabel: "Contexto",
    deliveredLabel: "O que entregamos",
    galleryLabel: "Galeria",
    conceptNote: "Projeto conceitual: uma proposta criada pela Forgeon para mostrar o que o site pode ser. Não é o site oficial do restaurante.",
    liveLink: "Ver o site no ar",
    ctaTitle: "Quer algo assim para o seu negócio?",
    ctaLead: "Conte como funciona hoje. Montamos um exemplo para o seu negócio, sem compromisso.",
    whatsappMessage: "Olá! Vi o projeto {name} no site da Forgeon e quero algo parecido.",
    next: "Próximo projeto",
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
        slug: "los-rombos",
        summary: "Web del bar Los Rombos, en Valladolid: carta online, pedidos por WhatsApp y reserva de mesa.",
        context: "Los Rombos es un bar restaurante de barrio en Valladolid, abierto del desayuno a la cena. Los pedidos llegaban por mensajes sueltos y llamadas, y el local no tenía dónde enseñar la carta completa.",
        delivered: [
          { title: "Carta online", text: "Platos por categoría, con filtro de alérgenos, fáciles de consultar en el móvil." },
          { title: "Pedidos por WhatsApp", text: "El cliente prepara el pedido en la web y lo envía listo, sin app y sin comisiones de intermediarios." },
          { title: "Reserva de mesa", text: "Un formulario corto que llega como mensaje para que el equipo lo confirme." },
          { title: "Listo para Google", text: "Los datos del restaurante van marcados para aparecer mejor en las búsquedas de la zona." },
        ],
        gallery: ["El ambiente, en galería", "Por qué elegir Los Rombos", "La carta en el móvil", "La portada en el móvil"],
      },
    ],
  },
  casePage: {
    back: "Todos los proyectos",
    contextLabel: "Contexto",
    deliveredLabel: "Qué entregamos",
    galleryLabel: "Galería",
    conceptNote: "Proyecto conceptual: una propuesta creada por Forgeon para mostrar lo que puede ser la web. No es la web oficial del restaurante.",
    liveLink: "Ver la web publicada",
    ctaTitle: "¿Quieres algo así para tu negocio?",
    ctaLead: "Cuéntanos cómo funciona hoy. Preparamos un ejemplo para tu negocio, sin compromiso.",
    whatsappMessage: "¡Hola! He visto el proyecto {name} en la web de Forgeon y quiero algo parecido.",
    next: "Proyecto siguiente",
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
        slug: "los-rombos",
        summary: "Website for Los Rombos, a bar in Valladolid, Spain: online menu, WhatsApp ordering and table booking.",
        context: "Los Rombos is a neighbourhood bar and restaurant in Valladolid, open from breakfast to dinner. Orders came in through scattered messages and calls, and the place had nowhere to show its full menu.",
        delivered: [
          { title: "Online menu", text: "Dishes by category, with an allergen filter, easy to browse on a phone." },
          { title: "WhatsApp ordering", text: "Customers build the order on the site and send it ready to go, with no app and no middleman fees." },
          { title: "Table booking", text: "A short form that arrives as a message for the staff to confirm." },
          { title: "Ready for Google", text: "The restaurant's details are marked up to show better in local searches." },
        ],
        gallery: ["The atmosphere, in a gallery", "Why choose Los Rombos", "The menu on mobile", "The home page on mobile"],
      },
    ],
  },
  casePage: {
    back: "All projects",
    contextLabel: "Context",
    deliveredLabel: "What we delivered",
    galleryLabel: "Gallery",
    conceptNote: "Concept project: a proposal created by Forgeon to show what the website could be. It is not the restaurant's official website.",
    liveLink: "Visit the live website",
    ctaTitle: "Want something like this for your business?",
    ctaLead: "Tell us how things work today. We'll build a preview for your business, no strings attached.",
    whatsappMessage: "Hi! I saw the {name} project on Forgeon's website and I'd like something similar.",
    next: "Next project",
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
