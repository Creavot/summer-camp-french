const puppeteer = require('puppeteer');
const path = require('path');

async function capture(file, out) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(__dirname, file), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.resolve(__dirname, out), fullPage: false });
  await browser.close();
  console.log('Done: ' + out);
}

(async () => {
  await capture('poster-instagram.html', 'poster-instagram.png');
  await capture('poster-instagram-en.html', 'poster-instagram-en.png');
})();
