const puppeteer = require('puppeteer');
(async function main() {
  try {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const viewPort={width:1366, height:768};
    await page.setViewport(viewPort);
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');
    await page.goto('https://www.chevron.com/search?q=IoT');
    await page.waitForSelector('.search-results-item');
    const sections = await page.$$(('.search-results-item'));
    const aHref = await page.$eval('.search-results-item a', a => a.getAttribute('href'));
    await page.goto(aHref);
    await page.setViewport(viewPort);
      const pHTML = await page.$eval('.cb-content', p => p.innerHTML);
      const fields = pHTML.split('IoT');
      var text = fields[0];
      for (i=1;i<fields.length;i++)
      {
        text+= "<mark>IoT</mark>"+fields[i];
      }
    await page.evaluate(text => {
       let dom = document.querySelector('.cb-content');
       dom.innerHTML =text;
    },text);
    } catch (e) {
    console.log('Error',e);
  }
})();
