const request = require('supertest')
const { expect } = require('chai');
const { obterToken } = require('../helpers/login.js');
require('dotenv').config();

describe('Transferências', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('julio', '123456')
    })

    describe('GET /transfers', () => {
        it('Deve retornar 200 ao listar as transferências com um usuário autenticado', async () => {
            const resposta = await request(process.env.BASE_URL)
            .get('/transfers')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
        })

    })
})
