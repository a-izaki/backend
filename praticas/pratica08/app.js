require('dotenv').config();

const express = require('express');
//const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Importação dos routers
const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/usuarios', usuariosRouter);
app.use('/produtos', produtosRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📧 URL: http://localhost:${PORT}`);
});

module.exports = app;
