const jwt = require('jsonwebtoken');

function gerarToken(payload) {
    try {
        const expiresIn = '1m';   // interio em segundo, '1m
        const token = jwt.sign(payload, process.env.JWT_SEGREDO, { expiresIn });
        return token;
    }   catch(err) {
        throw Error('Erro ao gerar um token');
    }
};

function verificarToken (req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SEGREDO);
        req.payload = payload;
        return next();
    }   catch(err) {
        return res.status(401).json({msg: "Token Inválido"});
    }
};

module.exports = { gerarToken, verificarToken };