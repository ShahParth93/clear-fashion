const axios = require('axios');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

const DEDICATED_BRAND = 'https://www.dedicatedbrand.com'
/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const link = `https://www.dedicatedbrand.com${$(element)
        .find('.productList-link')
        .attr('href')}`;

      return {
        link,
        'brand': 'dedicated',
        'price': parseInt(
          $(element)
            .find('.productList-price')
            .text()
        ),
        'name': $(element)
          .find('.productList-title')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'photo': $(element)
          .find('.productList-image img')
          .attr('src')
        //'_id': uuidv5(link, uuidv5.URL)
      };
    })
    .get();
};

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

  return $('.mainNavigation-link-subMenu-link')
    .map((i,element) => {
      const href = $(element)
        .find('a')
        .attr('href')

      return `${DEDICATED_BRAND}${href}`;
    })
    .get();
};

module.exports.scrape_links = async (url = DEDICATED_BRAND) => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse_links(data);
  }

  console.error(status);

  return null;
};


