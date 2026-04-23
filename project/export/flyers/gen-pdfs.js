const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const flyers = [
  { html: 'flyer-v1.html', pdf: 'UCCF-Flyer-V1.pdf' },
  { html: 'flyer-v2.html', pdf: 'UCCF-Flyer-V2.pdf' },
  { html: 'flyer-v3.html', pdf: 'UCCF-Flyer-V3.pdf' },
];

const dir = __dirname;

(async () => {
  const browser = await chromium.launch();

  for (const { html, pdf } of flyers) {
    const page = await browser.newPage();
    const url = 'file://' + path.join(dir, html);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.pdf({
      path: path.join(dir, pdf),
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    await page.close();
    console.log('Generated:', pdf);
  }

  await browser.close();
  console.log('Done.');
})();
