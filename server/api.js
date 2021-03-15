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

app.get('/products/search',  async (request, response)=>{
    
    var limit;
    if(request.query.limit){
        limit = parseInt(request.query.limit);
    }else{
        limit = 12
    }
    
    let brand = request.query.brand;
    
    let price = parseInt(request.query.price);
    
    
    let res  = await db.filteredProducts(limit, brand, price);
    let total = res.length;
    response.send({
        'limit':limit,
        'total':total,
        'results':res
        
    });
    
})

app.get('/products/:id',  async (request, response)=>{
    response.send(await db.findById(request.params.id))

})



app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
