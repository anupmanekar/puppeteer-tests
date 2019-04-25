const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const app_config = require('../config/' + process.argv[2] + '/app_config.json');

const FILE = './tmp/result.csv';

const exporter = new CSVExporter({
  file: FILE,
  fields: ['response.url', 'response.status', 'links.length'],
});

(async () => {
  const crawler = await HCCrawler.launch({
    maxDepth: 3,
    exporter
  });
  await crawler.queue(app_config["base_url"]);
  await crawler.onIdle();
  await crawler.close();
})();