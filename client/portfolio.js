// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

let currentBrands = [];
let favorites = [];


let filter_reasonable = 'ko';
let filter_brand = '';
let filter_recent = 'ko';
let filter_favorite = 'ko';

const two_weeks = 1209600000;


// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');

const checkReasonable = document.querySelector('#check_reasonable_price');
const checkRecent = document.querySelector('#check_recently_released');
const checkFavorite = document.querySelector('#check_favorite');


const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const spanlastRelease = document.querySelector('#lastDate');
const spanNbNewProducts = document.querySelector('#nbNewProducts');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


/**
 * Fetch brands from list of products
 * @return {Object}
 */

/*
function getBrandsFromProducts(products){
  return [... new Set(products.map(product => product.brand))];
}
*/


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}€</span>
        <button onclick="add_to_favorites('${product.uuid}')" class="favbutton">Add to favorites</button>

      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render brands selector
 * @param  {Object} brands
 */
const renderBrands = products => {
  var brands =[];
  for(var i =0;i<products.length;i++){
    if (!(brands.includes(products[i].brand))){
      brands.push(products[i].brand);
    }
  }
  const options = Array.from(
    brands,
    value => `<option value="${value}">${value}</option>`
  );

  selectBrand.innerHTML = options;
  selectBrand.selectedIndex = brands.indexOf(filter_brand);

};


/**
 * Render indicator selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;

  spanp50.innerHTML = compute_percentile(50)+ ' euros';
  spanp90.innerHTML = compute_percentile(90)+ ' euros';
  spanp95.innerHTML = compute_percentile(95)+ ' euros';

  var prod_sort_release = [...currentProducts].sort((a, b) => sort_by_release(a, b))
  spanlastRelease.innerHTML = prod_sort_release[prod_sort_release.length -1].released;

  spanNbNewProducts.innerHTML = nb_new_products(currentProducts);


};


const render = (products, pagination) => {
  products = filter_products(products);
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);

  //const brands = getBrandsFromProducts(currentProducts);
  //renderBrands(products);

};


function compute_percentile(p){
  var products = currentProducts.sort((a, b) => compareprice(a, b, 1));
  var i = Math.floor((p/100) * products.length)
  return products[i].price
}

function sort_by_release(a, b){
  let comparison = 0;
  if(a.released > b.released){
    comparison = 1;
  }else if(a.released < b.released){
    comparison = -1;
  }
  return comparison;
}

function nb_new_products(listproducts){
  var nb=0;
  for(var i=0;i<listproducts.length;i++){
    var release = Date.parse(listproducts[i].released);
    var today = Date.now();
    var w2 = (14*24*60*60*1000);
    if((today - release) / 1000 / 3600 / 24 < 30){
      nb++;
    }
  }
  return nb;
}

function add_to_favorites(id){
  //var prod = currentProducts.filter(p => p.uuid == id);

  //We will store each favorite product in the localStorage
  //favorites.push(prod);
  //localStorage.setItem('favorites', JSON.stringify(favorites));
  var nbSameId=0;
  for(var i=0;i<favorites.length;i++){
    if(favorites[i].uuid === id){
      nbSameId++
    }
  }

  if(nbSameId>=1){
    for(var i=0;i<favorites.length;i++){
      if(favorites[i].uuid !== id){
        favorites.push(favorites[i])
      }
    }
  }else{
    for(var i=0;i<currentProducts.length;i++){
      if(currentProducts[i].uuid === id){
        favorites.push(currentProducts[i])
      }
    }  
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));

  render(currentProducts, currentPagination);


}
  /*
  if(favorites.some(p => p.uuid === id)) {
    favorites = favorites.filter(p => p.uuid !== id);
  } else {
    favorites.push(currentProducts.find(p => p.uuid === id));
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));


  render(currentProducts, currentPagination);

}
*/
function filter_products(products){
  if(filter_reasonable === 'ok') {
    products = products.filter(p => p.price < 100);
  }
  if(filter_favorite === 'ok') {
    products = favorites;
  }
  if(filter_recent === 'ok') {
    products = products.filter(p => (Date.now() - Date.parse(p.released)) / 1000 / 3600 / 24 < 30 );
  }
  renderBrands(products);
  if(filter_brand !== '') {
    products = products.filter(p => p['brand'] === filter_brand);
  }
  return products;
}

console.log(localStorage);


/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


/**
 * Select the page to display
 * @type {[type]}
 */

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),selectShow.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

/**
 * Select the brands to display
 * @type {[type]}
 */

selectSort.addEventListener('change', event =>{

  // Price ascending
  if(event.target.value === 'price-asc'){
    currentProducts = [...currentProducts].sort((a, b) => compareprice(a, b));

  }
  //Price descending
  if(event.target.value === 'price-desc'){
    currentProducts = [...currentProducts].sort((a, b) => compareprice(a, b));
    currentProducts.reverse();

  }
  //Date ascending
  if(event.target.value === 'date-asc'){
    currentProducts = [...currentProducts].sort((a, b) => sort_by_release(a, b));

  }
  //Date descending
  if(event.target.value === 'date-desc'){
    currentProducts = [...currentProducts].sort((a, b) => sort_by_release(a, b));
    currentProducts.reverse();
  }
  render(currentProducts, currentPagination);
})



/**
 * Filter by brand 
 * 
 
*/
selectBrand.addEventListener('change', event => {
  filter_brand = event.target.value;
  render(currentProducts, currentPagination);
});



checkRecent.addEventListener('change', () => {
  if(filter_recent === 'ok'){
    filter_recent = 'ko';
  }else{
    filter_recent = 'ok';
  }
  render(currentProducts, currentPagination);
});


checkReasonable.addEventListener('change', () => {
  if(filter_reasonable === 'ok'){
    filter_reasonable = 'ko';
  }else{
    filter_reasonable = 'ok';
  }
  render(currentProducts, currentPagination);
});

checkFavorite.addEventListener('change', () => {
  if(filter_favorite === 'ok'){
    filter_favorite = 'ko';
  }else{
    filter_favorite = 'ok';
  }
  renderProducts(favorites);
});


document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);


