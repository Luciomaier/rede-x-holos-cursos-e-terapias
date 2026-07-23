import asyncio
from playwright.async_api import async_playwright

URL = "http://localhost:7823/marketing/conteudo/reel-auriculoterapia-2026-07-22/capa.html"
OUT = "marketing/conteudo/reel-auriculoterapia-2026-07-22/capa.png"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
        await page.goto(URL, wait_until="networkidle")
        await page.wait_for_timeout(1200)
        await page.locator(".slide").screenshot(path=OUT)
        await browser.close()
        print("done ->", OUT)

asyncio.run(main())
