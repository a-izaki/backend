const express = require('express');
const app = express();
const port = 3000;


const tarefas = [  
    { id: 1, nome: "Estudar middleware", concluida: false },  
    { id: 2, nome: "Praticar Express", concluida: true }  
];

  

//...............midleware de aplicação.......
  app.use((req, res, next) => {
    console.log("Time:", Date.now(), " - ", req.method, " - ", req.url);
    next();
});

const router = express.Router();




// Rota para listar todas as tarefas
app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});




// Rota POST para criar nova tarefa
app.post("/tarefas", (req, res) => {
 
// Gera um novo id baseado no último
const novaTarefa = {
    id: tarefas.length + 1,
    ...req.body
};
tarefas.push(novaTarefa)
res.send(novaTarefa);
});
 



// GET /tarefas/:tarefaId → busca tarefa por ID
app.get("/tarefas/:tarefaId", (req, res) => {
    const tarefaId = parseInt(req.params.tarefaId, 10);
    const tarefa = tarefas.find(t => t.id === tarefaId);
  
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
  
    res.json(tarefa);
});


// PUT /tarefas/:tarefaId → atualiza uma tarefa
app.put("/tarefas/:tarefaId", (req, res) => {
    const tarefaId = parseInt(req.params.tarefaId, 10);
    const tarefa = tarefas.find(t => t.id === tarefaId);
  
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
  
    const { nome, concluida } = req.body;
  
    if (nome !== undefined) tarefa.nome = nome;
    if (concluida !== undefined) tarefa.concluida = concluida;
  
    res.json(tarefa);
});


// DELETE /tarefas/:tarefaId → remove tarefa
app.delete("/tarefas/:tarefaId", (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId, 10);
  const index = tarefas.findIndex(t => t.id === tarefaId);

  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas.splice(index, 1);

  res.status(204).send();
});



// Middleware de erro → captura erros das rotas GET, PUT, DELETE
app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });    
});
  
  




app.listen(port, () => {
console.log(`Escutando na porta ${port}`);
});

module.export = app;
   