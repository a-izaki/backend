const express = require('express');
const usuariosController = require('../controllers/usuariosController.js')
const { verificarToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// POST / → criar usuário
router.post('/', usuariosController.criar);

// POST /login → login do usuário
router.post('/login', usuariosController.entrar);

// POST /renovar → renovar token
router.post('/renovar', verificarToken, usuariosController.renovar);

// a) DELETE /:id → verificarToken + remover usuário
router.delete('/:id', verificarToken, usuariosController.remover);

module.exports = router;


