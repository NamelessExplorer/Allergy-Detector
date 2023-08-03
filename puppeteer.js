const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require('fs');

const app = express();

app.get('/', async (req, res) => {
  const url = req.query.url; // Get the URL from the query parameters

  if (!url) {
    return res.status(400).send('URL parameter is missing.');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    await browser.close();
    processData(data);

    return res.status(200).send('Data processed successfully.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while processing the data.');
  }
});

function processData(data) {
  console.log('Processing Data...');
  const $ = cheerio.load(data);
  const body = $('body');
  fs.writeFileSync('data.json', pretty(body.find('#important-information > div:nth-child(2)').text()));
  console.log('Complete');
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
