const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require('fs');

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json("Never gonna give up this project")
})

// body.find('#important-information > div:nth-child(2)').text())
app.post('/', async (req, res) => {
  console.log(req.body);
  const url = req?.body?.url; // Get the URL from the query parameters

  if (!url) {
    return res.status(400).send('URL parameter is missing.');
  }

  function processData(data) {
    console.log('Processing Data...');
    const $ = cheerio.load(data);
    const body = $('body');
    const i = body.find('#important-information > div:nth-child(2)').text().trim();
    console.log('Complete');
    return {data:i};
  }

  try {
    
    const browser = await puppeteer.launch({headless:"true"});
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    await browser.close();
    const ingredients = processData(data);

    return res.status(200).json({success:true, ing: ingredients.data});
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, error});
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
