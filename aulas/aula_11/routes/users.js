const express = require('express');
const {gerarToken, verificarToken, cifrarSenha} = require('../middlewares/auth');
const { token } = require('morgan');
const router = express.Router();
const Usuario = require('../models/userModel');

router.post('/', async (req, res) => {
	const{ username, password } = req.body;

	const novoUsuario = await Usuario.create({
		username, password: cifrarSenha(password)
	});
	res.status(201).json({
		id: novoUsuario._id,
		username: novoUsuario.username
	});
})

/* GET users listing. */
router.post('/login', async function(req, res, next) {
	const { username, password } = req.body;
	const usuarioEncontrado = await usuario.findOne({username});

	

	const usuarioAutenticado = await Usuario.findOne({
		username,
		password: cifrarSenha(password)
	})

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
