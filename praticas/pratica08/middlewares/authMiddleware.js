const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    try {
        // Extrai o token do cabeçalho da requisição
        const { authorization } = req.headers;

        // Verifica se existe o cabeçalho authorization
        if (!authorization) {
            return res.status(401).json({ msg: 'Não autorizado' });
        }

        // Verifica se tem "Bearer" no header
        if (!authorization.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'Token inválido' });
        }

        const token = authorization.split(" ")[1];

        // Verifica se o token existe
        if (!token) {
            return res.status(401).json({ msg: 'Token inválido' });
        }

        //  AGORA: Usar JWT_SEGREDO (igual ao .env atualizado)
        const payload = jwt.verify(token, process.env.JWT_SEGREDO);
        
        //  CORREÇÃO: Mudar para req.usuario
        req.usuario = payload;

        console.log(' Token verificado - Usuário:', req.usuario);
        return next();

    } catch(err) {
        console.log(' Erro na verificação do token:', err.message);
        return res.status(401).json({ msg: "Token inválido" });
    }
}

function gerarToken(payload) {
    try {
        // Define o tempo de expiração (2m)
        const expiresIn = '2m';
        
        //  AGORA: Usar JWT_SEGREDO (igual ao .env atualizado)
        const token = jwt.sign(payload, process.env.JWT_SEGREDO, { expiresIn });
        console.log(' Token gerado com sucesso');
        return token;
        
    } catch(err) {
        console.log('Erro ao gerar token:', err.message);
        throw new Error('Erro ao gerar o token');
    }
}

module.exports = { gerarToken, verificarToken };
