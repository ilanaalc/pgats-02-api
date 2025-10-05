import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10, // usuários virtuais
    duration: '10s', // tempo de execução
};

//adicionar thresholds

export default function () {
    const url = 'http://localhost:3000/users/register'

    const payload = JSON.stringify({
        username: `user_${Math.random()}`, // gera username único
        password: '123456',
        favorecidos: ['mateus', 'joão']
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que o status é 201': (r) => r.status === 201,
        'Validar que a resposta contém username': (r) => r.body.includes("username"),
        'Validar que a resposta contém saldo': (r) => r.body.includes("saldo"),
    });

    sleep(1);
}
