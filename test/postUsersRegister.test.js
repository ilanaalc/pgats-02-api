const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()

describe('Registro de Usuário', () => {
    describe('POST users/register', () => {
        it('Validar que retorna 201 ao enviar dados de um usuário não cadastrado', async () => {
            const reposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                username: "usuario2",
                password: "123456",
                favorecidos: [
                    "usuario3"
                    ]
            })
            expect(reposta.status).to.be.equal(201);
        })
    })
})