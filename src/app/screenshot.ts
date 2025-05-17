// scripts/screenshot.js
import fs from 'fs';
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Ajusta el viewport a tu gusto:
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto('https://www.emplearg.com', { waitUntil: 'networkidle2' });

  // Captura toda la página:
  const buffer = await page.screenshot({ fullPage: true });
  fs.writeFileSync('public/emplearg-screenshot.png', buffer);

  await browser.close();
})();
