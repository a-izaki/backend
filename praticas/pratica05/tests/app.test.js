// 3.b) Importa o pacote supertest
const request = require('supertest');

// 3.c) Importa a instância da aplicação Express
const app = require('../app');

// d) Cria a instância de requisição
const api = request(app);

// Variável para armazenar o ID da tarefa criada
let tarefaId; 

describe('Teste da API de Tarefas', () => {
// 3.e) Teste GET /tarefas
    test('GET/tarefas deve retornar status 200 e JSON', async() => {
        const res = await api.get('/tarefas');
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
    })

// 3.f) Teste POST /tarefas
    test('POST /tarefas deve retornar status 201 e JSON', async () => {
        const novaTarefa = { nome: 'Estudar Node', concluida: false };
        const res = await api.post('/tarefas').send(novaTarefa);
        expect(res.statusCode).toBe(201);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id');
        tarefaId = res.body.id;
    });

// 3.g) Teste GET /tarefas/id
    test('GET /tarefas/:id deve retornar status 200 e JSON', async () => {
        const res = await api.get(`/tarefas/${tarefaId}`);
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    // 3.h) Teste GET /tarefas/1 (não existente)
    test('GET /tarefas/1 deve retornar status 404 e JSON', async () => {
        const res = await api.get('/tarefas/1');
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });

 // 3.i) Teste PUT /tarefas/id
    test('PUT /tarefas/:id deve retornar status 200 e JSON', async () => {
        const atualizacao = { nome: 'Estudar Node e Express', concluida: true };
        const res = await api.put(`/tarefas/${tarefaId}`).send(atualizacao);
        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

 // 3.j) Teste PUT /tarefas/1 (não existente)
    test('PUT /tarefas/1 deve retornar status 404 e JSON', async () => {
        const atualizacao = { nome: 'Teste inválido', concluida: true };
        const res = await api.put('/tarefas/1').send(atualizacao);
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });

// 3.k) Teste DELETE /tarefas/id
    test('DELETE /tarefas/:id deve retornar status 204 e sem conteúdo', async () => {
        const res = await api.delete(`/tarefas/${tarefaId}`);
        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual({});
    });

// 3.l) Teste DELETE /tarefas/1 (não existente)
    test('DELETE /tarefas/1 deve retornar status 404 e JSON', async () => {
        const res = await api.delete('/tarefas/1');
        expect(res.statusCode).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
    });
});
