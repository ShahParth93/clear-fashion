const axios = require('axios');
const cheerio = require('cheerio');

const MUD_JEANS = 'https://mudjeans.eu'


/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.shopify-section.collection__landing .col.col-xs-6.col-md-3')
    .map((i, element) => {

      const brand = 'mudjeans';
      const name = $(element)
        .find('.product-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt($(element)
          .find('.product-price:first-child')
          .text()
          .replace(",00\n","")
          .replace("Buy€","")          
          )
      ;
      const lease = parseFloat($(element)
          .find('.product-price:nth-child(2)')
          .text()
          .replace("Lease for €","")
          .replace(",",".")                  
          )
      ;

      return {brand,name, price,lease};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

const parse_links = data =>{
  const $ = cheerio.load(data);

  return $('.header-navigation--primary .header-nav-list-item')
    .map((i,element) => {
      const href = $(element)
        .find('a')
        .attr('href')

      return `${MUD_JEANS}${href}`;
    })
    .get();
};

module.exports.scrape_links = async (url = MUD_JEANS) => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse_links(data);
  }

  console.error(status);

  return null;
};
