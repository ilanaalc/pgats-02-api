const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()

describe('Transferência', () => {
    describe('POST /transfers', () => {
        it('Deve retornar sucesso com 201 quando realizar uma transferência para um usuário registrado', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send({
                username: "julio",
                password: "123456"
            })
            const token = respostaLogin.body.token

            const resposta = await request(process.env.BASE_URL)
            .post('/transfers')
            .set('Content-Type', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .send({
                from: "julio",
                to: "priscila",
                value: 5
            })
            expect(resposta.status).to.equal(201)
        })
    })
})