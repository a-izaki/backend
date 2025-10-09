const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 4.a) Importa o middleware de rotas
const tarefaRouter = require('./routes/tarefaRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 4.b) Usa o middleware de rota para "/tarefas"
app.use('/tarefas', tarefaRouter);

module.exports = app;

