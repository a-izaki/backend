const supertest = require('supertest');
const app = require("../app");
const request = supertest(app);

describe("Testes do recurso /usuarios", () => {
    let idCriado = null;
    let token = null;
  
    // f) Crie um teste para verificar se uma chamada "POST /usuarios" 
    test('POST /usuarios deve retornar 201 e JSON com _id e email', async () => {
        const novoUsuario = {
          email: "usuario@email.com",
          senha: "abcd1234"
        };
    
        const response = await request
          .post("/usuarios")
          .send(novoUsuario)
          .set("Accept", "application/json");
    
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/json/);
    
        // Verificando propriedades usando toBe / toBeDefined
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toBe("usuario@email.com");
    
        // g) Salve o valor da propriedade "_id" 
        idCriado = response.body._id;
      });
    
      // h) verificar se uma chamada "POST /usuarios" sem um JSON e retorna o status "422"
      test('POST /usuarios sem JSON deve retornar 422 e mensagem de erro', async () => {
        const response = await request
          .post("/usuarios")
          .set("Accept", "application/json");
    
        expect(response.status).toBe(422);
        expect(response.headers["content-type"]).toMatch(/json/);
    
        expect(response.body.msg).toBe("Email e Senha são obrigatórios");
      });
    
      test('POST /usuarios/login deve retornar 200 e JSON com token', async () => {
        const login = {
          usuario: "usuario@email.com",
          senha: "abcd1234"
        };
    
        const response = await request
          .post("/usuarios/login")
          .send(login)
          .set("Accept", "application/json");
    
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
    
        // Verificação com toBe
        expect(typeof response.body.token).toBe("string");
    
        token = response.body.token;
      });
    
      test('POST /usuarios/login sem JSON deve retornar 401 e mensagem de erro', async () => {
        const response = await request
          .post("/usuarios/login")
          .set("Accept", "application/json");
    
        expect(response.status).toBe(401);
        expect(response.headers["content-type"]).toMatch(/json/);
    
        expect(response.body.msg).toBe("Credenciais inválidas");
      });
    
      test('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
        const response = await request
          .post("/usuarios/renovar")
          .set("authorization", `Bearer ${token}`)
          .set("Accept", "application/json");
    
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);    
       
        expect(typeof response.body.token).toBe("string");
      });
    
      test('POST /usuarios/renovar com token inválido deve retornar 401 e mensagem de erro', async () => {
        const response = await request
          .post("/usuarios/renovar")
          .set("authorization", "Bearer 123456789")
          .set("Accept", "application/json");
    
        expect(response.status).toBe(401);
        expect(response.headers["content-type"]).toMatch(/json/);
    
        expect(response.body.msg).toBe("Token inválido");
      });
    
      // n) verificar se uma chamada "DELETE /usuarios/${id}"
      test('DELETE /usuarios/:id com token válido deve retornar 204 e sem conteúdo', async () => {
        const response = await request
          .delete(`/usuarios/${idCriado}`)
          .set("authorization", `Bearer ${token}`)
          .set("Accept", "application/json");
    
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });