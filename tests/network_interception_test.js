const puppeteer = require('puppeteer');
const puppeteer_config = require('./../config/puppeteer_config.json');
const app_config = require('../config/' + process.argv[2] + '/app_config.json');

(async () => {
  const browser = await puppeteer.launch({headless:puppeteer_config["headless"], 'dumpio': true});
  const page = await browser.newPage();
  page.on('requestfinished', request => {
    console.log(request.url());
  });
  await page.goto(app_config["base_url"]);
  const searchElem = await page.waitFor("//input[@title='Search']");
  await page.screenshot({path: 'test-snapshots/google_home.png'});
  await searchElem.type("Amazon");
  await searchElem.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({path: 'test-snapshots/search_results.png'});
  await browser.close()
})();
