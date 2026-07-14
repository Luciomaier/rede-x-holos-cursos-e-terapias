import asyncio, os, sys
from pathlib import Path
from PIL import Image

# ── caminhos ──────────────────────────────────────────────────────────────────
SRC   = r"C:\Users\Rede Baixada\Downloads\foto lu para capa reels.jpeg"
PASTA = Path(__file__).parent
OUT   = PASTA / "foto-1080.jpg"
ROOT  = PASTA.parents[3]   # raiz do projeto (holos-cursos-terapias)
HTML  = PASTA / "capa.html"
PNG   = PASTA / "capa.png"

# ── 1. Processar imagem ───────────────────────────────────────────────────────
img = Image.open(SRC).convert("RGB")
w, h = img.size

def mean_brightness(y):
    return sum(img.getpixel((x, y))[0] for x in range(w//4, 3*w//4)) / (w//2)

top = next((y for y in range(h) if mean_brightness(y) > 20), 0)
bot = next((y for y in range(h-1, -1, -1) if mean_brightness(y) > 20), h-1) + 1

cropped = img.crop((0, top, w, bot))
cw, ch = cropped.size

scale = max(1080/cw, 1920/ch)
nw, nh = int(cw*scale), int(ch*scale)
resized = cropped.resize((nw, nh), Image.LANCZOS)

lx = (nw - 1080) // 2
ty = (nh - 1920) // 2
final = resized.crop((lx, ty, lx+1080, ty+1920))
final.save(OUT, "JPEG", quality=92)
print(f"foto salva: {OUT}")

# ── 2. Iniciar servidor local ─────────────────────────────────────────────────
import subprocess, time, signal

server = subprocess.Popen(
    [sys.executable, "-m", "http.server", "7823"],
    cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)
time.sleep(1.5)
print("servidor em :7823")

# ── 3. Renderizar com Playwright ──────────────────────────────────────────────
async def render():
    from playwright.async_api import async_playwright
    url = "http://localhost:7823/marketing/conteudo/reel-nova-profissao-2026-06-19/capa.html"
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1080, "height": 1920})
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(800)
        slide = page.locator(".slide")
        await slide.screenshot(path=str(PNG))
        await browser.close()
    print(f"capa salva: {PNG}")

asyncio.run(render())
server.terminate()
