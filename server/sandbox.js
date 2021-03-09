'use strict';
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse= require('./sources/adresse');
const mudjeans= require('./sources/mudjeans');
const Readline = require('readline'); // for reading inputs
const fs = require('fs');

//const node = require('./node');

const db = require('./db');


let allProducts = [];
let nbProducts = 0;

let urls =['https://mudjeans.eu','https://www.dedicatedbrand.com','https://adresse.paris/630-toute-la-collection'];

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



/* Changement */
async function all() {
  try {

    const p1 = await mudjeans.scrape_links('https://mudjeans.eu')

    //console.log(p1);
    //console.log(p1.length);
    
    for(var i=0;i<p1.length;i++){
      //console.log(p1[i]);
      const products = await mudjeans.scrape(p1[i]);

      //console.log(`There are ${products.length} products in this page`);
      //console.log(products);
      //nbProducts = nbProducts + products.length;
      for(var j=0;j<products.length;j++){
        allProducts.push(products[j]);  
      }
      
    }

    console.log("Scrapping done for mudjeans");

    const p2 = await dedicatedbrand.scrape_links('https://www.dedicatedbrand.com')

    //console.log(p2);

    //console.log(p2.length);


    for(var i=0;i<p2.length;i++){
      //console.log(p2[i]);

      const products = await dedicatedbrand.scrape(p2[i]);

      //console.log(`There are ${products.length} products in this page`);
      //console.log(products);
      //nbProducts = nbProducts + products.length;
      for(var j=0;j<products.length;j++){
        allProducts.push(products[j]);  
      }
    }
    console.log("Scrapping done for dedicatedbrand");

    const p3 = await adresse.scrape('https://adresse.paris/630-toute-la-collection')

    //console.log(p3);
    for(var j=0;j<p3.length;j++){
        allProducts.push(p3[j]);  
    }
    
    console.log("Scrapping done for adresse paris");


    const result = await db.insert(allProducts);

    console.log(`💽  ${result.insertedCount} inserted products`);


    

    /*
    let data = JSON.stringify(allProducts);
    fs.writeFileSync('main.json', data);


    console.log('All products are in the main.json');

    */
    //return allProducts;
    //process.exit(0);

    
  } catch (e) {
    console.error(e);
    //process.exit(1);
  }
  
}


async function testquery(){

    const resu = await db.filteredProducts(5,'dedicated',24);

    console.log(resu);

}


const [,, eshop] = process.argv;


const rl = Readline.createInterface({ // for reading inputs
    input : process.stdin,
    output : process.stdout,
    terminal : false
})

/*
console.log("Which website do you want to scrap ? 1 - Adresse Paris | 2 - Dedicated Brand | 3 - Mud Jeans | 4 - All")

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
  if(input == 4){
    all();
  }
});

*/
testquery()
