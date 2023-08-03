//Packages
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require('fs');

const url="https://www.amazon.in/Hersheys-Chocolate-Syrup-623g/dp/B00KX0I112?th=1";

const product = {name: "", ingredients:""};

const log = (str) => {
    fs.appendFile("./scraped.txt", "Content:\n"+str, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

async function scrape() {
    //Fetch data
    const {data} = await axios.get(url);
    //Load up the HTML
    let $ = cheerio.load(data);
    //Extract data we need
    const item = $("div#dp-container");
    
    product.name = $(item).find('h1 span#productTitle').text();
    console.log(product.name);

    const div = $('#important-information > div:nth-child(2)').text().trim();
    log(pretty($("body").text()));
    log(pretty($("body").text().trim()));
}

scrape();