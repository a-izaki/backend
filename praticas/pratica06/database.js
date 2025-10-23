// Carregar variáveis de ambiente ANTES de tudo
require('dotenv').config();



// 4b - Importar a classe MongoClient do pacote "mongodb"
const { MongoClient } = require('mongodb');

// 4c - Declarar a constante "url" com a string de conexão do MongoDB Atlas
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/`;

// 4d - Declarar a constante "client" com uma instância de MongoClient
const client = new MongoClient(url);

// 4e - Função assíncrona para conectar ao banco
async function conectarDb() {
  await client.connect();
  return client.db('agenda');
}

// 4f - Exportar a função conectarDb
module.exports = { conectarDb };
