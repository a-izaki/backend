const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


function verificarToken(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ msg: "Token inválido" });
        }

        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.jwt_segredo);

        // Adiciona payload na requisição
        req.usuario = payload;

        return next();
    } catch (err) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}


function gerarToken(payload) {
    try {
        const expiresIn = process.env.JWT_EXPIRES || '1h';
        return jwt.sign(payload, process.env.jwt_segredo, { expiresIn });
    } catch (err) {
        throw new Error("Erro ao gerar o token");
    }
}


function cifrarSenha(senha) {
    const salto = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(senha, salto);
}


function compararSenha(senha, hash) {
    return bcryptjs.compareSync(senha, hash);
}


module.exports = { verificarToken,    gerarToken,    cifrarSenha,    compararSenha };
