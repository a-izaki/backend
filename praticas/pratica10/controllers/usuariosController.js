const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware.js');
const usuariosModel = require('../models/usuariosModel.js');

// Criar usuário
async function criar(req, res) {
    try {
        if (!req.body.email || !req.body.senha) {
            return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
        }

        const senhaCifrada = cifrarSenha(req.body.senha);

        const novoUsuario = await usuariosModel.create({
            email: req.body.email,
            senha: senhaCifrada
        });

        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } catch (err) {
        return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

// Login
async function entrar(req, res) {
    try {
        if (!req.body.usuario || !req.body.senha) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const usuarioEncontrado = await usuariosModel.findOne({
            email: req.body.usuario
        });

        if (!usuarioEncontrado) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const senhaOK = compararSenha(req.body.senha, usuarioEncontrado.senha);
        if (!senhaOK) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const token = gerarToken({ email: req.body.usuario });

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
    }
}

// Renovar token
async function renovar(req, res) {
    try {
        if (!req.usuario || !req.usuario.email) {
            return res.status(401).json({ msg: "Token inválido" });
        }

        const novoToken = gerarToken({ email: req.usuario.email });
        return res.status(200).json({ token: novoToken });
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

// Remover usuário
async function remover(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({ msg: "ID é obrigatório" });
        }

        await usuariosModel.findOneAndDelete({ _id: req.params.id });
        return res.status(204).send();
    } catch (err) {
        return res.status(422).json({ msg: "Erro ao remover usuário" });
    }
}

module.exports = { criar,  entrar, renovar, remover };
