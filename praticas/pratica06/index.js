// 6b - Importar readline-sync
const readline = require('readline-sync');

// 6c - Importar controlador.js
const controlador = require('./controlador');

// 6d - Função menu
function menu() {
  console.log('\n===== MENU =====');
  console.log('1 - Adicionar tarefa');
  console.log('2 - Buscar tarefa');
  console.log('3 - Atualizar tarefa');
  console.log('4 - Remover tarefa');
  console.log('5 - Sair');
}

// 6e - Função escolherOpcao
async function escolherOpcao(opcao) {
    switch (opcao) {
        // 6g - Adicionar tarefa
        case '1':
            const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
            await controlador.adicionarTarefa(nomeAdicionar);
            console.log('Tarefa adicionada com sucesso!');
            break;
        
        // 6h - Buscar tarefa
        case '2': {
            const nomeBuscar = readline.question('Digite o nome da tarefa: ');
            const tarefaBuscada = await controlador.buscarTarefa(nomeBuscar);
            if (tarefaBuscada.id) {
                console.log(`ID: ${tarefaBuscada.id}`);
                console.log(`Nome: ${tarefaBuscada.nome}`);
                console.log(`Concluída: ${tarefaBuscada.concluida}`);
            }   else {
                console.log('Tarefa não encontrada.');
            }
            break;

        }

        // 6i - Atualizar tarefa
        case '3': {
            const nomeAtualizar = readline.question('Digite o nome da tarefa: ');
            const concluidaAtualizar = readline.keyInYN('A tarefa está concluída? ');
            await controlador.atualizarTarefa(nomeAtualizar, concluidaAtualizar);
            console.log('Tarefa atualizada com sucesso!');
            break;
        }

        // 6j - Remover tarefa
        case '4': {
            const nomeRemover = readline.question('Digite o nome da tarefa: ');
            await controlador.removerTarefa(nomeRemover);
            console.log('Tarefa removida com sucesso!');
            break;
        }
        // 6k - Sair
        case '5': {
            console.log('Encerrando...');
            process.exit();
        }

        default:
        console.log('Opção inválida. Tente novamente.');
        
    }   
    
}
 // 6l - Função main com laço infinito
    async function main() {
        while (true) {
            menu(); // Mostrar menu
            // 6m - Ler opção
            const opcao = readline.question('Escolha uma opcao: ');
            await escolherOpcao(opcao); // Chamar função com a opção
        }

    }
// 6n - Chamada da função main

main();
