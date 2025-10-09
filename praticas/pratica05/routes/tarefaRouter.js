const express = require('express');

// 5.a) Importa tudo do controller renomeado
const tarefaController = require('../controllers/tarefaController');

// 4.e Cria instância do Router
const router = express.Router();

// 4.g–) GET "/" → retorna array vazio
router.get('/', (req, res) => {
  res.json([]);
});

// 4.i–k GET "/:tarefaId"
router.get('/:tarefaId', (req, res) => {
  const { tarefaId } = req.params;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json({});
});

// 4.l–m POST "/" → retorna id fixo
router.post('/', (req, res) => {
  res.status(201).json({ id: '1a2b' });
});

// 4.n–p PUT "/:tarefaId"
router.put('/:tarefaId', (req, res) => {
  const { tarefaId } = req.params;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json({ id: '1a2b' });
});

// 4.q–s DELETE "/:tarefaId"
router.delete('/:tarefaId', (req, res) => {
  const { tarefaId } = req.params;
  if (tarefaId === '1') {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.status(204).send();
});

// 5.b) GET /
router.get('/', tarefaController.listar);

// 5.f) GET /:tarefaId
router.get('/:tarefaId', tarefaController.buscarPeloId);

// 5.j) POST /
router.post('/', tarefaController.criar);

// 5.m) PUT /:tarefaId
router.put('/:tarefaId', tarefaController.atualizar);

// 5.q) DELETE /:tarefaId
router.delete('/:tarefaId', tarefaController.remover);

// 5.f) Exporta o router
module.exports = router;

