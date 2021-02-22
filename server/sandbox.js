/* eslint-disable no-console, no-process-exit */
'use strict';
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse= require('./sources/adresse');
const mudjeans= require('./sources/mudjeans');
const Readline = require('readline'); // for reading inputs
const fs = require('fs');


let allProducts = [];
let nbProducts = 0;

async function mjeans() {
  try {

    const pages = await mudjeans.scrape_links('https://mudjeans.eu')

    console.log(pages);
    console.log(pages.length);
    
    for(var i=0;i<pages.length;i++){
      console.log(pages[i]);
      const products = await mudjeans.scrape(pages[i]);

      console.log(`There are ${products.length} products in this page`);
      console.log(products);
      nbProducts = nbProducts + products.length;
      allProducts.push(products);
    }
    
    console.log(`This website stores ${nbProducts} products`);

    let data = JSON.stringify(allProducts);
    fs.writeFileSync('mudjeans.json', data);

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function dedicated () {
  try {


    const pages = await dedicatedbrand.scrape_links('https://www.dedicatedbrand.com')

    console.log(pages);

    console.log(pages.length);


    for(var i=0;i<pages.length;i++){
      console.log(pages[i]);

      const products = await dedicatedbrand.scrape(pages[i]);

      console.log(`There are ${products.length} products in this page`);

      console.log(products);
  

      nbProducts = nbProducts + products.length;
      allProducts.push(products);
    }

    
    console.log(`This website stores ${nbProducts} products`);

    let data = JSON.stringify(allProducts);
    fs.writeFileSync('dedicated.json', data);


    console.log('done');


    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function adress() {
  try {

    const products = await adresse.scrape('https://adresse.paris/630-toute-la-collection')

    console.log(products);

    console.log(`This website stores ${products.length} products`);

    let data = JSON.stringify(products);
    fs.writeFileSync('address.json', JSON.stringify(products));

    

  

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


const rl = Readline.createInterface({ // for reading inputs
    input : process.stdin,
    output : process.stdout,
    terminal : false
})

console.log("Which website do you want to scrap ? 1 - Adresse Paris | 2 - Dedicated Brand | 3 - Mud Jeans")

rl.on('line', (input) => {
  if(input == 1){
    adress();
  }
  if(input == 2){
    dedicated();
  }
  if(input == 3){
    mjeans();
  }
});



