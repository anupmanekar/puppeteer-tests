const puppeteer = require('puppeteer');
const puppeteer_config = require('./../config/puppeteer_config.json');
const app_config = require('../config/' + process.argv[2] + '/app_config.json');
const pixelmatch = require('pixelmatch');
var assert = require('chai').assert;
const fs = require('fs');
const PNG = require('pngjs').PNG;

(async () => {
  const browser = await puppeteer.launch({headless:puppeteer_config["headless"], 'dumpio': true});
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800 });
  await page.goto(app_config["base_url"]);
  await page.screenshot({path: 'test-snapshots/actual_go_home_page_viewport.png'});
  await browser.close()
  console.log("ScreenShot taken");
  const expected = PNG.sync.read(fs.readFileSync('test-snapshots/expected_go_home_page_viewport.png'));
  const actual = PNG.sync.read(fs.readFileSync('test-snapshots/actual_go_home_page_viewport.png'));
  const {width, height} = expected;
  const diff = new PNG({width, height});
  await pixelmatch(actual.data, expected.data, diff.data, width, height, {threshold: 0.1});
  console.log("5");
  await fs.writeFileSync('test-snapshots/diff.png', PNG.sync.write(diff));
  console.log("6");
  await assert.isNull(diff).catch((err) => {console.log(err);});
  console.log("7");
})();