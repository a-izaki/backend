//4h - Importar a função conectarDb
const { conectarDb } = require('./database');
 
//4i, 4j - Classe Tarefa com propriedade db inicializando com "null".
class Tarefa {
    db = null;
    collection = null;

    //4k - Construtor com nome, concluida e id
    constructor(nome, concluida) {
        this.nome = nome;
        this.concluida = concluida;
        this.id = null;
    }

    // l) Método init para conectar ao banco e obter a coleção
    async init() {
        this.db = await conectarDb();
        this.collection = this.db.collection('tarefas');
  }

    //4m - Método inserir
    async inserir() {
        //4n - Inserir documento
        const resultado = await this.collection.insertOne({
            nome: this.nome,
            concluida: this.concluida
        });

        //4o - Atribuir o ID inserido
        this.id = resultado.insertedId;
    } 

//4p - Método alterar
async alterar() {
    //4q - Atualizar documento
    await this.collection.updateOne(
        { _id: this.id  },
        { $set: { nome: this.nome, concluida: this.concluida } }
    );
}
 
//4r - Método deletar
async deletar() {
    //4s - Deletar documento
    await this.collection.deleteOne({
        nome: this.nome
    });
}

//4t - Método buscar
async buscar() {
    //4u - Buscar documento
    const resultado = await this.collection.findOne({
        nome: this.nome
    });

    //4v - Atualizar propriedades
    if (resultado) {
        this.id = resultado._id;
        this.nome = resultado.nome;
        this.concluida = resultado.concluida;

    }
}

}

// 4w - Exportar a classe Tarefa
module.exports = { Tarefa };
