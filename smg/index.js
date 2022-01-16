const puppeteer = require('puppeteer');
const express = require("express");
const app = express()
const port = 80
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
    res.send('Hello World!')

    buySell(req.body.action, req.body.stock)
  
});
async function buySell(action, stock) {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
  
    page.goto("https://www.stockmarketgame.org/login.html");
    await page.waitForSelector('#Login > p:nth-child(5) > input[type=text]');
    await page.type('#Login > p:nth-child(5) > input[type=text]', "NY4_73_ZZ2096", { delay: 100 });
    await page.type('#Login > p:nth-child(6) > input[type=password]:nth-child(2)', "LucasTamir", { delay: 100 });
    await page.click("#Login > p:nth-child(7) > input")
    await page.waitForTimeout(1000);
    page.goto("https://www.stockmarketgame.org/enterstock.htm");
    await page.bringToFront();
    await page.waitForTimeout(1000);
    await page.click("#rb" + action)
    await page.type('#SymbolName', stock, { delay: 100 });
    await page.type('#BuySellAmt', "10", { delay: 100 });
    await page.click("#btnSend")
    await page.waitForTimeout(1000);
    await page.type('#TradePassword', "LucasTamir", { delay: 100 });
    await page.click("#btnConfirmTrade")
    await page.waitForTimeout(1000);
    //await browser.close();
  };
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
