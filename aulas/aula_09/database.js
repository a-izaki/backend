require('dotenv').config();
const { MongoClient } = require('mongodb');

// String de conexão
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/`;


const client = new MongoClient(url);
let db = null;
async function conectar() {
    try {
         if (db == null) {
            db = await client.connect();
            db = client.db('agenda');
        }
        console('Conectado aoMongoDB');
        return db
    } catch (e) {
        console.log('Erro ao se conectar ao MongoDB', e.message);
    }   
}

module.exports = conectar;
