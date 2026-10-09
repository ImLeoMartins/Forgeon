"""Gera as imagens de prévia de link (Open Graph) em public/og/og-<idioma>.png.

Os textos vêm de src/i18n/messages.ts. Rode de novo quando eles mudarem:
    python scripts/make-og.py
Precisa de Node 24 e do Playwright para Python (com o Chromium instalado).
"""
import base64
import json
import subprocess
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"

msgs = json.loads(subprocess.run(
    ["node", "--input-type=module", "-e",
     "const m = await import('./src/i18n/messages.ts'); console.log(JSON.stringify(m.messages))"],
    cwd=ROOT, capture_output=True, text=True, check=True, encoding="utf-8",
).stdout)

symbol = base64.b64encode((ROOT / "src" / "assets" / "ForgeonSimbolo.svg").read_bytes()).decode()

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; color: #F4F4F7;
    font-family: 'Space Grotesk', sans-serif;
    background:
      radial-gradient(60% 70% at 85% 40%, rgba(65,40,251,.45), transparent 70%),
      radial-gradient(40% 50% at 95% 90%, rgba(133,169,250,.25), transparent 70%),
      radial-gradient(35% 50% at 10% 0%, rgba(144,112,247,.18), transparent 80%),
      #08090D;
    padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between;
    position: relative;
  }
  .mark { position: absolute; right: 40px; top: 50%; transform: translateY(-50%); width: 430px;
          filter: drop-shadow(0 0 60px rgba(65,40,251,.6)); opacity: .95; }
  .brand { font-weight: 600; font-size: 26px; letter-spacing: .32em; color: #85A9FA; }
  h1 { font: 800 84px/1.02 Montserrat, sans-serif; letter-spacing: -.03em; max-width: 720px; }
  h1 span { background: linear-gradient(135deg, #9070F7, #454DFC 55%, #85A9FA);
            -webkit-background-clip: text; background-clip: text; color: transparent; }
  p { font-size: 28px; line-height: 1.4; color: #B4B7C5; max-width: 640px; margin-top: 28px; }
  .url { font-weight: 600; font-size: 24px; color: #F4F4F7; display: flex; align-items: center; gap: 12px; }
  .url::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: #85A9FA; box-shadow: 0 0 12px #85A9FA; }
</style></head><body>
  <img class="mark" src="data:image/svg+xml;base64,__SYMBOL__">
  <div class="brand">FORGEON</div>
  <div><h1>__T1__<br><span>__T2__</span></h1><p>__TAG__</p></div>
  <div class="url">forgeon.dev</div>
</body></html>"""

OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    for lang, m in msgs.items():
        html = (TEMPLATE.replace("__SYMBOL__", symbol)
                .replace("__T1__", m["hero"]["title1"])
                .replace("__T2__", m["hero"]["title2"])
                .replace("__TAG__", m["hero"]["eyebrow"]))
        page.set_content(html, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.screenshot(path=str(OUT / f"og-{lang}.png"))
        print(f"og-{lang}.png")
    browser.close()
