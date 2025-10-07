const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');

const obterToken = async (usuario, senha) => {
    bodyLogin = {...postLogin}
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)
    return respostaLogin.body.token
}

module.exports = {
    obterToken
}