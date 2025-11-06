const express = require('express');
const {gerarToken, verificarToken} = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /usuarios/login
router.post('/login', (req, res) => {
    try {
        // Gera o token passando o email do corpo da requisição
        console.log('Body recebido:', req.body);
        const token = gerarToken({ email: req.body.email });

        // Retorna status 200 e o token gerado
        return res.status(200).json({ token });              
        
    }   catch(err){
        console.log('Erro no login:', err.message);
        return res.status(500).json({ msg: err.message });
    };
    
  });
  
// POST /usuarios/renovar
router.post('/renovar', verificarToken, (req, res) => {
try {
    // Gera o token passando o email do corpo da requisição
    const novoToken = gerarToken({ email: req.body.email });

    // Retorna status 200 e o token gerado
    return res.status(200).json({ token: novoToken });
}   catch (err) {
    return res.status(500).json({ msg: err.message });
}    
});

  module.exports = router;