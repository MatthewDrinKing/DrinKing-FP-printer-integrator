const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome'
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', {waitUntil: 'networkidle0'});
})();
