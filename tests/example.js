const puppeteer = require('puppeteer');
const puppeteer_config = require('./../config/puppeteer_config.json');

(async () => {
  const browser = await puppeteer.launch({headless:puppeteer_config["headless"]});
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'test-snapshots/example.png'});
  await browser.close();
})();