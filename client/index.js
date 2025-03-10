// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

//console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}]

//console.table(MY_FAVORITE_BRANDS);
//console.log(MY_FAVORITE_BRANDS[0]);





/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var link_cheapest_tshirt = 'https://www.loom.fr/collections/tous-les-vetements/products/le-t-shirt';
//console.log(link_cheapest_tshirt);



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var NbProducts = marketplace.length;
//console.log(NbProducts);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
const listbrands = [];
marketplace.forEach(element => listbrands.push(element.brand));
//console.log(listbrands);

const uniquebrands = [...new Set(listbrands)];
///... allows to transorm the set back into an array 
//console.log(uniquebrands);


//const brandlist = marketplace.map(product => product.brand);
//map returns an array from an array


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
function compareprice(a,b){
    let comparison = 0;
    if (a.price > b.price) {
      comparison = 1;
    } else if (a.price < b.price) {
      comparison = -1;
    }
    return comparison;
}
var sortbyprice = marketplace.sort(compareprice);

const listbrandsprice = [];
sortbyprice.forEach(element => listbrandsprice.push(element));
//console.log(listbrandsprice);






// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function comparedate(a,b){
    let comparison = 0;
    if (a.date > b.date) {
      comparison = 1;
    } else if (a.date < b.date) {
      comparison = -1;
    }
    return comparison;
}
var sortbydate = marketplace.sort(comparedate);
sortbydate.reverse();
const listbrandsdate = [];
sortbydate.forEach(element => listbrandsdate.push(element));
//console.log(listbrandsdate);



// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

const listbrands50n100 = [];
for (var i = 0; i < marketplace.length; i++) {
  if((marketplace[i].price >=50)&&(marketplace[i].price<=100)){
    listbrands50n100.push(marketplace[i]);
  }
}

//console.log(listbrands50n100);



// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average
var s =0;
for (var i = 0; i < marketplace.length; i++) {
  s=s+marketplace[i].price;
}
var avgBasket = s/marketplace.length;
//console.log(Math.round(avgBasket));





/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
const groups = (get_attr) => (arr) => arr.reduce((groups, item) =>
    {
        const group = (groups[get_attr(item)] || []);
        group.push(item);
        groups[get_attr(item)] = group;
        return groups;
    }, {});


const group_brand = groups(elt => elt.brand);

const products_grouped_by_brand = group_brand(marketplace);
//console.log(products_grouped_by_brand);



// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
//console.log("Here are the products sorted by price for each brand");
for (const [key, value] of Object.entries(products_grouped_by_brand)) {
    var array = value;
    array.sort(compareprice);
  
}
//console.log(products_grouped_by_brand);

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

//console.log("Here are the products sorted by date for each brand");
for (const [key, value] of Object.entries(products_grouped_by_brand)) {
    var array = value;
    array.sort(comparedate);
  
}
//console.log(products_grouped_by_brand);




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products



function brandPercentile(b){
  var prices = [];
  for(var i=0; i < marketplace.length;i++){
    if(marketplace[i].brand == b){
      prices.push(marketplace[i].price);
    }
  }
  //console.log(prices);
  var pricessorted = prices.sort(function(a,b){ return a-b;});
  //console.log(pricessorted);
  var position = ((pricessorted.length) - 1) * 0.9;
  var base = Math.floor(position); //Rounding up to the nearest whole number
  var rest = position - base;

  if (base+1 >= pricessorted.length){
    return pricessorted[base];
  }
  else{
    return pricessorted[base]*(1-(position%1))+pricessorted[base+1]*(position%1);
  } 
}
//uniquebrands.forEach(element => console.log(element+ ': '+brandPercentile(element)) );


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd;

var d = Date.parse(today);

var w2 = (14*24*60*60*1000);//two weeks in miliseconds

const newproduct = (element) => d - Date.parse(element.released) < w2;
//console.log(COTELE_PARIS.some(newproduct)); //at least one new product



// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

const reasonableprice = (element) => element.price < 100;
//console.log(COTELE_PARIS.every(reasonableprice));



// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

/*
for(var i=0;i<COTELE_PARIS.length;i++){
  if(COTELE_PARIS[i].uuid == 'b56c6d88-749a-5b4c-b571-e5b5c6483131'){
    console.log(COTELE_PARIS[i]);
  }
}
*/

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

/*
for(var i=0;i<COTELE_PARIS.length;i++){
  if(COTELE_PARIS[i].uuid == 'b56c6d88-749a-5b4c-b571-e5b5c6483131'){
    const index = COTELE_PARIS.indexOf(COTELE_PARIS[i]);
    if (index > -1) {
      COTELE_PARIS.splice(index, 1);
    }
  }
}
console.log(COTELE_PARIS);

*/
// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

//console.log(blueJacket);
//console.log(jacket);

//blueJacket also has the property 'favorite' set to true

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
jacket = Object.assign({}, blueJacket, { favorite: true });
//console.log(jacket);
//console.log(blueJacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
localStorage.setItem("MY_FAVORITE_BRANDS", MY_FAVORITE_BRANDS);
//console.log(localStorage);