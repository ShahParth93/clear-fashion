const {MongoClient} = require('mongodb');
const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_URI = `mongodb+srv://parth:eQBAE1gmfxnODEmN@clearcluster.egopx.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;

const sand = require('./sandbox');

async function main(){
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	const db =  client.db(MONGODB_DB_NAME)
	return db;
}

function insert(db,col_data){
    let col = db.collection('products');
    let res = col.insertMany(col_data);
    return res
}

async function run(){
	let db = await main()
	console.log("Connection to mongo done");
	let products = await sand();
	console.log(products)
    //await insert(db, 'products', products)
}

run();

