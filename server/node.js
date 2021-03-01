const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://parth:eQBAE1gmfxnODEmN@clearcluster.egopx.mongodb.net/clearfashion?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


async function main(){
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	const db =  client.db(MONGODB_DB_NAME)

}
main();