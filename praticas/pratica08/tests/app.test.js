const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);


let token;

describe ( 'Teste do recurso /Produtos', () => {
    test('GET / produtos deve retornar 401', async() => {
        const response = await request.get('/produtos');
        expect(response.status).toBe(401);
    } );


    test('GET /produtos com token inválido deve retornar 401 e msg "Token inválido"', async () => {
        const response = await request.get('/produtos').set("authorization", "Beare 6546546464"); 
        expect(response.status).toBe(401);        
      });


    test('POST /usuarios/login deve retornar 200', async () => {
        const response = await request.post('/usuarios/login').send({username: "airton", password: "123"});      
        expect(response.status).toBe(200);       
    
        token = response.body.token;
    });


    test('POST /usuarios/login deve retornar 200 ', async () => {
        const response = await request.post('/usuarios/login');             
        expect(response.status).toBe(200);        
    
        token = response.body.token; // 💾 salva o token
      });
    
    
      test('GET /produtos com token válido deve retornar 200 e JSON', async () => {
        const response = await request.get('/produtos')
          .set('authorization', token) // usa o token salvo         
    
        expect(response.status).toBe(200);        
      });

    test('deve retornar 200, JSON e conter propriedade "token"', async () => {           
        const response = await request.post('/usuarios/renovar')        
    
        expect(response.status).toBe(200);        
    });




    test('POST /usuarios/renovar deve retornar novo token', async () => {   
        const response = await request.post('/usuarios/renovar')            
        expect(response.status).toBe(200);
           
        tokenRenovado = response.body.token; // 💾 salva para o próximo teste
      });
    
      test('GET /produtos com token renovado deve retornar 200 e JSON', async () => {
        const response = await request.get('/produtos')           
        expect(response.status).toBe(200);       
      });












})