const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const tarefaRouter = require('./routes/tarefaRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Middlewares existentes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Importa o middleware de rotas (tarefaRouter)
const tarefaRouter = require('./routes/tarefaRouter');

// Usa o middleware de rotas para "/tarefas"
app.use('/tarefas', tarefaRouter);

module.exports = app;
