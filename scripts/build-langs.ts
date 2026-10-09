// Roda depois do `vite build`. Gera dist/pt/, dist/es/ e dist/en/ a partir de
// dist/index.html, cada um com título, descrição, Open Graph e hreflang no
// próprio idioma (robôs e prévias de link não executam JavaScript).
// Também escreve sitemap.xml e robots.txt.
// Node 24 executa TypeScript direto: node scripts/build-langs.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { messages } from "../src/i18n/messages.ts";

const SITE = "https://www.forgeon.dev";
const LANGS = ["pt", "es", "en"] as const;
type Lang = (typeof LANGS)[number];

const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", es: "es-ES", en: "en" };
const OG_LOCALE: Record<Lang, string> = { pt: "pt_BR", es: "es_ES", en: "en_US" };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const alternates = [
  ...LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${SITE}/${l}/" />`),
  `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
].join("\n    ");

function seo(lang: Lang, url: string): string {
  const { title, description } = messages[lang].meta;
  const image = `${SITE}/og/og-${lang}.png`;
  return `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Forgeon" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${OG_LOCALE[lang]}" />
    ${LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`).join("\n    ")}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${image}" />`;
}

const template = readFileSync("dist/index.html", "utf8");
const block = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;
if (!block.test(template)) throw new Error("dist/index.html sem o bloco SEO:START/SEO:END");

function page(lang: Lang, url: string): string {
  return template
    .replace(block, seo(lang, url))
    .replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[lang]}">`);
}

for (const lang of LANGS) {
  mkdirSync(`dist/${lang}`, { recursive: true });
  writeFileSync(`dist/${lang}/index.html`, page(lang, `${SITE}/${lang}/`));
}
// A raiz só redireciona (script em index.html); para robôs, vale o inglês.
writeFileSync("dist/index.html", page("en", `${SITE}/`));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(
  (l) => `  <url>
    <loc>${SITE}/${l}/</loc>
    <lastmod>${today}</lastmod>
${LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[a]}" href="${SITE}/${a}/" />`).join("\n")}
  </url>`,
).join("\n")}
</urlset>
`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`build-langs: ${LANGS.map((l) => `/${l}/`).join(", ")} + sitemap.xml + robots.txt`);
