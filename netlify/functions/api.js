'use strict';

const parser = require('node-html-parser');
const express = require('express');
const puppeteer = require('puppeteer');
const serverless = require('serverless-http');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ingredient-api.onrender.com'); // Replace with your HTML domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const router = express.Router();

router.use(express.json())

router.get('/', (req, res) => {
  res.status(200).json("Not giving up this project")
})

// body.find('#important-information > div:nth-child(2)').text())
router.post('/', async (req, res) => {
  
  console.log(req.body);
  const url = req?.body?.url; // Get the URL from the query parameters

  if (!url) {
    return res.status(400).send('URL parameter is missing.');
  }

  

  function processData(data) {

    const dom = parser.parse(data);
    console.log(dom)
    const ex = dom.querySelector('#important-information > div:nth-child(2)');

    console.log(ex);

    if(ex === null){
      return {success:false,error:"Cannot scrape data"};
    }

    return {success:true,ing:ex.textContent.trim().replace(/\s+/, " ")};
    
  }

  try {
    
    const browser = await puppeteer.launch({headless:"true"});
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.content();
    await browser.close();
    const ingredients = processData(data);

    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, error});
  }
});


app.use('/api/', router)
module.exports = router
module.exports.handler = serverless(app)