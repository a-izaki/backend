const express = require('express');
const {gerarToken, verificarToken} = require('../middlewares/authMiddleware');
const { token } = require('morgan');

const router = express.Router();

router.post('/login', (req, res) => {
    const { usuario, email, senha } = req.body;
    const emailUsuario = usuario || email; 
    const token = gerarToken(emailUsuario);
    return res.status(200).json({ token });
  });
  
  
  router.post('/renovar', verificarToken, (req, res) => {
    const novoToken = gerarToken(req.usuario.email);
    return res.status(200).json({ token: novoToken });
  });
  
  
  module.exports = router;