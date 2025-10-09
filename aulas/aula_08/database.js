// Importar o cliente do mongodb
const { MongoClient } = require('mongodb');

// String de conexão
const url = "mongodb+srv://  @cluster0.8axvmjj.mongodb.net/";

const client = new MongoClient(url);

async function conectar() {
    try {
        await client.connect();
        console.log("conectado");
        return client.db("agenda");
    } catch(e) {
        console.log("Erro ao conecatar no MongoDB", e.message);
    }
    
}

module.exports = conectar;