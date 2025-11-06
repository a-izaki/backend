const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe ( 'Teste do recurso /Produtos', () => {

    let token;
    let tokenRenovado;

    test('GET / produtos deve retornar 401 e JSON com msg "Não autorizado"', async() => {
        const response = await request.get('/produtos');
        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Não autorizado');
    } );

    //********************************************************************
    test('GET /produtos com token inválido deve retornar 401 e msg "Token inválido"', async () => {
        const response = await request.get('/produtos').set("authorization", "Beare 123456789"); 
        expect(response.status).toBe(401);      
        expect(response.type).toBe('application/json');
        expect(response.body.msg).toBe('Token inválido');  
      });

    //********************************************************************
    test('POST / usuarios/login deve retornar 200 e JSON com token', async () => {
        const response = await request.post('/usuarios/login').send({
            email: 'email@exemplo.com', 
            senha: "abcd1234"
        });      
        expect(response.status).toBe(200);       
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');

        token = response.body.token;    // salva o token
    });

    //********************************************************************    
    test('GET /produtos com token válido deve retornar 200 e JSON', async () => {
        const response = await request.get('/produtos')
          .set('authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(200); 
        expect(response.type).toBe('application/json');       
      });



    //********************************************************************
    test('POST /usuarios/renovar com token salvo deve retornar 200 e novo token', async () => {
        const response = await request.post('/usuarios/renovar')
            .set('authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
        
        tokenRenovado = response.body.token; // 💾 salva o token renovado
    });       

   
    test('GET /produtos com token renovado deve retornar 200 e JSON', async () => {
        const response = await request.get('/produtos')
            .set('authorization', `Bearer ${tokenRenovado}`);
        
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
    
})
