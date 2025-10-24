const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

const url = '/produtos';

let id = null;

// 3e) Crie um suite de testes para o recurso /tarefas através da função "describe()".
describe('Testes para o recurso /tarefas', () =>  {
     test('POST / produtos', async() => {
        const response = await request.post(url).send( { nome: 'Laranja', preco: 10.0 } ); 
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).toBe(10.0); 
        id = response.body._id
     });

     // 3h
     test('POST / deve retornar 422', async() => {
        const response = await request.post(url).send({nome: " "});        
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");    
    });

    // 3i
    test('GET / deve retornar 200', async() => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // 3j
    test('GET / produtos/:id id deve retornar 200 e o produto correto', async() => {
        const response = await request.get(`/produtos/${id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).toBe(10.0);
    });


    // 3k
    test('GET /produtos/0 deve retornar 400 e mensagem de parâmetro inválido', async () => {
        const response = await request.get('/produtos/0');       
        expect(response.status).toBe(400);      
        // Verifica o tipo do conteúdo
        expect(response.headers['content-type']).toMatch(/json/);      
        // Verifica a mensagem de erro
        expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
      });

    // 3l
    test('GET /produtos/:id inexistente deve retornar 404 e mensagem "Produto não encontrado"', async () => {
        const response = await request.get('/produtos/000000000000000000000000');        
        expect(response.status).toBe(404);          // Verifica o status HTTP         
        expect(response.headers['content-type']).toMatch(/json/);   // Verifica o tipo do conteúdo       
        expect(response.body).toHaveProperty('msg', 'Produto não encontrado');  // Verifica a mensagem de erro
      });


      // m
      test('PUT /produtos/:id deve retornar 200 e o produto atualizado', async () => {
        const produtoAtualizado = {
          nome: 'Laranja Pera',
          preco: 18.00
        };
      
        const response = await request
          .put(`/produtos/${id}`) // usa o id salvo no teste anterior
          .send(produtoAtualizado)
          .set('Accept', 'application/json');      
       
        expect(response.status).toBe(200);   // Verifica o status HTTP       
        expect(response.headers['content-type']).toMatch(/json/);   // Verifica o tipo de conteúdo
      
        // Verifica as propriedades e valores retornados
        expect(response.body).toHaveProperty('_id', id);
        expect(response.body).toHaveProperty('nome', 'Laranja Pera');
        expect(response.body).toHaveProperty('preco', 18.00);
      });


      // 3n
      test('PUT /produtos/:id sem JSON deve retornar 422 e mensagem de erro', async () => {
        const response = await request
          .put(`/produtos/${id}`) // usa o id de um produto existente
          .send({}) // corpo vazio
          .set('Accept', 'application/json');  
       
        expect(response.status).toBe(422);   // Verifica o status HTTP       
        expect(response.headers['content-type']).toMatch(/json/);   // Verifica o tipo do conteúdo        
        expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios'); // Verifica a mensagem de erro
      });


      // 3o
      test('PUT /produtos/0 deve retornar 400 e mensagem de parâmetro inválido', async () => {
        const produtoAtualizado = {
          nome: 'Laranja Pera',
          preco: 18.0
        };
      
        const response = await request
          .put('/produtos/0') // ID inválido
          .send(produtoAtualizado)
          .set('Accept', 'application/json');     
        
        expect(response.status).toBe(400);  // Verifica o status HTTP       
        expect(response.headers['content-type']).toMatch(/json/);   // Verifica o tipo do conteúdo       
        expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');  // Verifica a mensagem de erro
      });
      
      
      // 3p
      test('PUT /produtos/:id inexistente deve retornar 404 e mensagem "Produto não encontrado"', async () => {
        const produtoAtualizado = {
          nome: 'Laranja Pera',
          preco: 18.0
        };
      
        const response = await request
          .put('/produtos/000000000000000000000000') // ID inexistente
          .send(produtoAtualizado)
          .set('Accept', 'application/json');    
        
        expect(response.status).toBe(404);  // Verifica o status HTTP       
        expect(response.headers['content-type']).toMatch(/json/);   // Verifica o tipo de conteúdo       
        expect(response.body).toHaveProperty('msg', 'Produto não encontrado');  // Verifica a mensagem de erro
      });

      // 3q
      test('DELETE /produtos/:id deve retornar 204 e sem conteúdo', async () => {
        const response = await request
          .delete(`/produtos/${id}`) // usa o id de um produto existente
          .set('Accept', 'application/json');           
        expect(response.status).toBe(204);   
      });
      
      
      // 3r
      test('DELETE /produtos/0 deve retornar 400 e mensagem de parâmetro inválido', async () => {
        const response = await request
          .delete('/produtos/0') // ID inválido
          .set('Accept', 'application/json');
      
        expect(response.status).toBe(400);       
        expect(response.headers['content-type']).toMatch(/json/);       
        expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
      });


      // 3s
      test('DELETE /produtos/:id inexistente deve retornar 404 e mensagem "Produto não encontrado"', async () => {
        const response = await request
          .delete('/produtos/000000000000000000000000') // ID inexistente
          .set('Accept', 'application/json');
      
        expect(response.status).toBe(404);      
        expect(response.headers['content-type']).toMatch(/json/);      
        expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
      });
      
      
});