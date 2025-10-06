const request = require('supertest')
const { expect } = require('chai')


describe('Listar Usuários', () => {
    describe('GET /users', () => {
        it('Deve retornar 200 com uma lista de usuários', async () => {
            const resposta = await request(process.env.BASE_URL)
            .get('/users')
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
            expect(resposta.body.length).to.be.above(0)
        })
    })
})