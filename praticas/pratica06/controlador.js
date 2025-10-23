// 5b - Importar a classe Tarefa do modelo
const { Tarefa } = require('./modelo');

// 5c - Função para adicionar uma tarefa
async function adicionarTarefa(nome) {
   // 5d - Criar instância de Tarefa
  const tarefa = new Tarefa(nome, false); // tarefa começa como não concluída
  
  // 5e - Inicializar e inserir
  await tarefa.init();
  await tarefa.inserir();
}

// 5f - Função para buscar uma tarefa
async function buscarTarefa(nome) {

  // 5g - Criar instância de Tarefa  
  const tarefa = new Tarefa(nome, false);

  // 5h - Inicializar e buscar
  await tarefa.init();
  await tarefa.buscar();

  // 5i - Retornar tarefa
  return tarefa;
}

// 5j - Função para atualizar uma tarefa
async function atualizarTarefa(nome, concluida) {

  // 5k - Criar instância de Tarefa  
  const tarefa = new Tarefa(nome, false);

  // 5l - Inicializar e buscar
  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;

    // 5m - Alterar tarefa
    await tarefa.alterar();
  }
}

// 5n - Função para remover uma tarefa
async function removerTarefa(nome) {

  // 5o - Criar instância de Tarefa  
  const tarefa = new Tarefa(nome, false);

  // 5p - Inicializar, buscar e deletar
  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
  }
}

// 5q - Exportar todas as funções
module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};
