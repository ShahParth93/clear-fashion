const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const db = require('./db/index');


const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/:id',  async (request, response)=>{
    response.send(await db.findById(request.params.id))

})

app.get('/products/search',  async (request, response)=>{
    /*
    let brand = request.params.brand
    let limit = request.params.limit
    let price = request.params.price

    let res  = await db.filteredProducts(limit, brand, price)
    */
    response.send(
        /*'limit':limit,
        'brand':brand,
        'price':price
        */
        
        {'test':52}
        
    );
    
})


app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
