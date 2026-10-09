// Roda depois do `vite build`. A partir de dist/index.html, gera:
//   dist/pt/, dist/es/, dist/en/                      (home em cada idioma)
//   dist/<idioma>/cases/<slug>/                       (página de cada case)
// cada um com título, descrição, Open Graph e hreflang no próprio idioma
// (robôs e prévias de link não executam JavaScript). Também escreve
// sitemap.xml e robots.txt.
// Node 24 executa TypeScript direto: node scripts/build-langs.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { messages } from "../src/i18n/messages.ts";

const SITE = "https://www.forgeon.dev";
const LANGS = ["pt", "es", "en"] as const;
type Lang = (typeof LANGS)[number];

const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", es: "es-ES", en: "en" };
const OG_LOCALE: Record<Lang, string> = { pt: "pt_BR", es: "es_ES", en: "en_US" };

type Meta = { title: string; description: string; image: string };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** `path` é o caminho sem o idioma: "/" na home, "/cases/ditaly/" num case. */
function seo(lang: Lang, path: string, url: string, meta: Meta): string {
  const alternates = [
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${SITE}/${l}${path}" />`),
    path === "/" ? `<link rel="alternate" hreflang="x-default" href="${SITE}/" />` : "",
  ].filter(Boolean).join("\n    ");
  const title = esc(meta.title);
  const description = esc(meta.description);
  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    ${alternates}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Forgeon" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${OG_LOCALE[lang]}" />
    ${LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`).join("\n    ")}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${meta.image}" />`;
}

const template = readFileSync("dist/index.html", "utf8");
const block = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;
if (!block.test(template)) throw new Error("dist/index.html sem o bloco SEO:START/SEO:END");

function write(file: string, lang: Lang, path: string, url: string, meta: Meta) {
  const html = template
    .replace(block, seo(lang, path, url, meta))
    .replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[lang]}">`);
  mkdirSync(file.replace(/\/[^/]+$/, ""), { recursive: true });
  writeFileSync(file, html);
}

const homeMeta = (lang: Lang): Meta => ({ ...messages[lang].meta, image: `${SITE}/og/og-${lang}.png` });

const paths: string[] = ["/"];
for (const lang of LANGS) {
  write(`dist/${lang}/index.html`, lang, "/", `${SITE}/${lang}/`, homeMeta(lang));
  for (const item of messages[lang].projects.items) {
    const path = `/cases/${item.slug}/`;
    if (lang === "pt") paths.push(path);
    write(`dist/${lang}${path}index.html`, lang, path, `${SITE}/${lang}${path}`, {
      title: `${item.name} — ${item.headline.replace(/\.$/, "")} | Forgeon`,
      description: item.summary,
      image: `${SITE}/og/cases/${item.slug}.jpg`,
    });
  }
}
// A raiz só redireciona (script em index.html); para robôs, vale o inglês.
write("dist/index.html", "en", "/", `${SITE}/`, homeMeta("en"));

const today = new Date().toISOString().slice(0, 10);
const urls = paths.flatMap((path) =>
  LANGS.map(
    (l) => `  <url>
    <loc>${SITE}/${l}${path}</loc>
    <lastmod>${today}</lastmod>
${LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[a]}" href="${SITE}/${a}${path}" />`).join("\n")}
  </url>`,
  ),
);
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
);
// Endereço que não existe: o Cloudflare Pages serve este arquivo com status 404.
writeFileSync(
  "dist/404.html",
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=/"><title>Forgeon</title></head>
<body><a href="/">forgeon.dev</a></body></html>
`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`build-langs: ${LANGS.length} idiomas × ${paths.length} páginas + sitemap.xml + robots.txt`);
