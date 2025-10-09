// 6.d Array de tarefas
const tarefas = [];

// 6.e–f) listar
function listar() {
  return tarefas;
}

// 6.i–j buscarPeloId
function buscarPeloId(tarefaId) {
  return tarefas.find(t => t.id === tarefaId) || null;
}

// 6.l–m criar
function criar(tarefa) {
  const novaTarefa = {
    ...tarefa,
    id: Math.random().toString(36).substr(2, 4)
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

// 6.p–q atualizar
function atualizar(tarefa) {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index === -1) return null;
  tarefas[index] = { ...tarefas[index], ...tarefa };
  return tarefas[index];
}

// 6.t–u remover
function remover(tarefaId) {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return null;
  const [removida] = tarefas.splice(index, 1);
  return removida;
}

// 6.Exporta todas as funções
module.exports = { listar, buscarPeloId, criar, atualizar, remover };
