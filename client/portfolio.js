// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

let currentBrands = [];

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
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

function getBrandsFromProducts(products){
  return [... new Set(products.map(product => product.brand))];
}

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
        <span>${product.price}</span>
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
const renderBrands = brands => {
  const options = Array.from(
    {'length': brands.length},
    (value, index) => `<option value="${brands[index]}">${brands[index]}</option>`
  ).join('');

  selectBrand.innerHTML = options;
};


/**
 * Render indicator selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;

  spanp50.innerHTML = compute_percentile(50);
  spanp90.innerHTML = compute_percentile(90);
  spanp95.innerHTML = compute_percentile(95);

  var prod_sort_release = [...currentProducts].sort((a, b) => sort_by_release(a, b))
  spanlastRelease.innerHTML = prod_sort_release[prod_sort_release.length -1].released;

  spanNbNewProducts.innerHTML = nb_new_products(currentProducts);


};


const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);

  const brands = getBrandsFromProducts(currentProducts);
  renderBrands(brands);

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
  for(var i=0;i<currentProducts.length;i++){
    var release = Date.parse(currentProducts[i].released);
    var today = Date.now();
    w2 = (14*24*60*60*1000);
    if((today - release) < w2){
      nb++;
    }
  }
  return nb;
}

//console.log(compute_percentile(50));

//console.log(currentProducts);


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

selectBrand.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),selectShow.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});



document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);



/**
 * Filter by brand 
 * 
 


selectBrand.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


*/