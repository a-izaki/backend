// 1. Importar framework
const express = require("express");

// importar middleware de terceiro
const cors = require('cors');
const router = require('./router');



// 2. Criaruma instância da aplicação
const app = express();


//middleware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 1. middleware de aplicação
app.use( (req, res, next) => {
    console.log("Passei pelo middleware de app");
    next();
});

app.use('/tarefas', router);

// Criar um middleware
app.get('/', (req, res) => {
    res.send("Olá");
});


// 3. middleware de erro
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})


// 3. Iniciar a aplicação em uma porta
app.listen(3000, () => {
    console.log("A app está On!");
})