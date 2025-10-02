const request = require('supertest');
const app = require('../app');
const port = 3000;

let tarefaId;

describe("Testes da API de Tarefas", () => {

    // d) Instância de requisição usando supertest
    const api = request(app);
  
    // e) GET /tarefas deve retornar status 200 e JSON
    test("GET /tarefas retorna 200 e JSON", async () => {
      const res = await api.get("/tarefas");
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  
    // f) POST /tarefas cria uma tarefa e retorna 201 e JSON
    test('POST /tarefas cria uma tarefa e retorna 201', async () => {
      const res = await api
        .post("/tarefas")
        .send({ nome: "Estudar Node", concluida: false });
      
      expect(res.status).toBe(201);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.id).toBeDefined();
  
      tarefaId = res.body.id; // salva o id para os próximos testes
    });
  
    // g) GET /tarefas/:id retorna 200 e JSON
    test("GET /tarefas/:id retorna 200 e JSON", async () => {
      const res = await api.get(`/tarefas/${tarefaId}`);
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.id).toBe(tarefaId);
    });
  
    // h) GET /tarefas/1 retorna 404 e JSON (tarefa inexistente)
    test("GET /tarefas/1 retorna 404 e JSON", async () => {
      const res = await api.get("/tarefas/1");
      expect(res.status).toBe(404);
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  
    // i) PUT /tarefas/:id atualiza tarefa existente e retorna 200 e JSON
    test("PUT /tarefas/:id atualiza a tarefa e retorna 200", async () => {
      const res = await api
        .put(`/tarefas/${tarefaId}`)
        .send({ nome: "Estudar Node e Express", concluida: true });
      
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/json/);
      expect(res.body.nome).toBe("Estudar Node e Express");
      expect(res.body.concluida).toBe(true);
    });
  
    // j) PUT /tarefas/1 retorna 404 e JSON
    test("PUT /tarefas/1 retorna 404", async () => {
      const res = await api
        .put("/tarefas/1")
        .send({ nome: "Teste", concluida: true });
      
      expect(res.status).toBe(404);
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  
    // k) DELETE /tarefas/:id retorna 204 e sem conteúdo
    test("DELETE /tarefas/:id retorna 204", async () => {
      const res = await api.delete(`/tarefas/${tarefaId}`);
      expect(res.status).toBe(204);
      expect(res.body).toEqual({});
    });
  
    // l) DELETE /tarefas/1 retorna 404 e JSON
    test("DELETE /tarefas/1 retorna 404", async () => {
      const res = await api.delete("/tarefas/1");
      expect(res.status).toBe(404);
      expect(res.headers["content-type"]).toMatch(/json/);
    });
});

