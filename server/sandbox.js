/* eslint-disable no-console, no-process-exit */
//const dedicatedbrand = require('./sources/dedicatedbrand');
//const adresse= require('./sources/adresse');
const mudjeans= require('./sources/mudjeans');
//https://www.dedicatedbrand.com/en/men/news
//https://adresse.paris/602-nouveautes
//https://mudjeans.eu/collections/men-buy-jeans

// CHoisir quel site puis parcourir tous les url
async function sandbox (eshop = 'https://mudjeans.eu/collections/women-jeans') {
  try {
    console.log(🕵️‍♀️  browsing ${eshop} source;

    //const products = await dedicatedbrand.scrape(eshop);
    const products = await mudjeans.scrape(eshop);
    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);