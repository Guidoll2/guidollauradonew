import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = (req.query.url as string) || "https://www.emplearg.com";

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Simula un navegador real
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  await page.goto(url, { waitUntil: "networkidle2" });

  // Espera a que el formulario de inicio de sesión esté presente
  await page.waitForSelector("form");

  await page.evaluate(() => window.scrollTo(0, 0));

  const buffer = await page.screenshot({ fullPage: false })
  
  await browser.close();

  res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
  res.status(200).send(buffer);
  
}
