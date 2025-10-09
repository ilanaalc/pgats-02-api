const request = require('supertest')
const { expect } = require('chai')
const { obterToken } = require('../helpers/login.js')
const postTranferencia = require('../fixtures/postTransferencia.json')
require('dotenv').config()

describe('Transferências', () => {
    let token

    beforeEach ( async () => {
        token = await obterToken('julio', '123456')
    })

    describe('POST /transfers', () => {
        it('Deve retornar sucesso com 201 quando realizar uma transferência para um usuário registrado', async () => {
            const resposta = await request(process.env.BASE_URL)
            .post('/transfers')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send(postTranferencia)
            expect(resposta.status).to.equal(201)
        })
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