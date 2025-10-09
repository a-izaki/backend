// 6.a Importa tudo do model renomeado
const tarefaModel = require('../models/tarefaModel');
// 5.d Função listar
function listar(req, res) {
  res.json([]);
}

// 5.g–i Função buscarPeloId
function buscarPeloId(req, res) {
  const { tarefaId } = req.params;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json({});
}

// 5.k Função criar
function criar(req, res) {
  res.status(201).json({ id: '1a2b' });
}

// 5.n–p Função atualizar
function atualizar(req, res) {
  const { tarefaId } = req.params;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json({ id: '1a2b' });
}

// 5.r–t Função remover
function remover(req, res) {
  const { tarefaId } = req.params;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.status(204).send();
}

// 5. e, h, l, o, s Exporta todas as funções
module.exports = { listar, buscarPeloId, criar, atualizar, remover };
