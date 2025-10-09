const readline = require('readline-sync');
const conectar = require("./database");
const { Collection } = require('mongodb');

let db;
let collection;

// Função para criar uma tarefa
async function inserir(nomeTarefa) {
    const resultado = await collection.insertOne({
        nome: nomeTarefa,
        concluida: false
    });
    console.log('Tarefa criada com sucesso', resultado)
};

// Buscar Tarefas
async function buscar(nomeTarefa) {
    const resultado = await collection.findOne({
        nome: nomeTarefa
    });
    console.log(resultado);
}

//Alterar tarefa
async function alterar(nomeTarefa, nomeAtual, concluidaAtual) {
    const resultado = await collection.updateOne(
        {nome: nomeTarefa},
        {$set: {nome: nomeAtual, concluida: concluidaAtual}}
    )
    console.log(resultado);
};

async function remover(novaTarefa) {
    const resultado = await collection.deleteOne({
        novaTarefa
    });
    console.log(resultado);
}

async function main() {
    db = await conectar();                  // Chama a função de conexão com o banco
    collection = db.collection('tarefas');  // Conecta com a coleção (Tabela)

    while (true) {
    console.log("Menu Principal");
    console.log("1 - Criar Tarefa");
    console.log("2 - Buscar Tarefa");
    console.log("3 - Alterar Tarefa");
    console.log("4 - Remover Tarefa");
    console.log("5 - Sair");

    const opcao = readline.question('Escolha uma opcao: ');

    switch(opcao){
        case '1': {
            const nome = readline.question('Informe o nome da tarefa: ')
            await inserir(nome);
            break
        };
            
        case '2': {
            const nome = readline.question('Informe o nome da tarefa: ');
            await buscar(nome);
            break
        };

        case '3': {
            const nomeAtual = readline.question('Informe outro nome para a tarefa: ');
            const nomeTarefa = readline.question('Informe o nome da tarefa: ');
            const concluidaAtual = readline.question('Informe outra situação da tarefa: ');
            await alterar(nome, nomeAtual, concluidaAtual);
            break
        };

        case '4': {
            const nome = readline.question('Informe o nome da tarefa: ')
            await remover(nome);
            break
        };

        case '5': process.exit(0); break;
        default: console.log('Opção inválida')
    };
    };
};

main();