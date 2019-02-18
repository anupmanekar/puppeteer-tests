const puppeteer = require('puppeteer');
const puppeteer_config = require('./../config/puppeteer_config.json');
const app_config = require('../config/' + process.argv[2] + '/app_config.json');

(async () => {
  const browser = await puppeteer.launch({headless:puppeteer_config["headless"]});
  const page = await browser.newPage();
  await page.goto(app_config["base_url"]);
  await page.screenshot({path: 'test-snapshots/login.png'});
  await browser.close();
})();

(async () => {
  const browser = await puppeteer.launch({headless:puppeteer_config["headless"]});
  const page = await browser.newPage();
  await page.goto(app_config["base_url"]);
  const login_text = await page.waitFor("//input[@name='username']");
  await login_text.type("manekar.anup@gmail.com")
  const password_text = await page.waitFor("//input[@name='password']")
  await password_text.type("test1234")
  const login_button = await page.waitFor("//span[text()='Login']")
  await login_button.click()
  await page.waitFor('//div[text()="Patient Management"]')
  await page.screenshot({path: 'test-snapshots/dashboard.png'});
  await browser.close();
})();