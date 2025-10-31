const express = require('express');
const {gerarToken, verificarToken} = require('../middlewares/auth');
const { token } = require('morgan');
const router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
	const { username, password } = req.body;

	// Simular uma autenticacao
	if(username === 'airton@iesb.edu.br' && password === 'abcd1234') {
		const payload = {
			iss: 'Minha API',
			email: username,
			nome: 'airton',
			perfil: 'admin'
		}
		try {
			return res.json({token: gerarToken(payload)});
		}	catch(err)	{
			return res.status(500).json({msg: err.message});
		};		
	};
	return res.status(401).json({msg: 'Credenciais inválidas'});
});

router.post('/renovar', verificarToken, function(req, res) {
	try {
		const payload = {
			iss: req.payload.iss,
			email: req.payload.username,
			nome: req.payload.airton,
			perfil: req.payload.perfil,
		};
		return res.json({ token: gerarToken(payload) });
	} catch (err) {
		return res.status(500).json({ msg: err.message })
	}
})

module.exports = router;
