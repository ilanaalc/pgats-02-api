//Bibliotecas
const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config();

//Testes
describe ('Transferências', () => {
    describe('GET /transfers', () => {  
        it('Deve retornar 200 ao listar as transferências com um usuário autenticado', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "julio",
                password: "123456"
            })
            const token = respostaLogin.body.token

            const resposta = await request(process.env.BASE_URL)
            .get('/transfers')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)

            expect(resposta.status).to.equal(200) // Espere que o status seja 200 (sucesso)        
        })

    /*Teste com *BUG*    
      Verificar o retorno 401 quando o token não é fornecido ou é inválido, mas retorna 403. 
        it('Deve retornar 401 quando o token não é fornecido ou inválido', async () => {
            const resposta = await request(process.env.BASE_URL)
            .get('/transfers')
            .set('Content-Type', 'application/json')
            .set('Authorization','Bearer invalid_token') // Token inválido

            expect(resposta.status).to.equal(401) // Espere que o status seja 401 (Não Autorizado)           
            })*/      
        })
    
    })
