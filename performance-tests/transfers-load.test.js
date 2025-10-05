import http from 'k6/http';
import { check, sleep } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
    vus: 10,
    duration: '10s',

    threshold: {
        http_req_duration: ['p(95)<200'],
        http_req_failed: ['rate<0.01']
    }
};

export default function() {
    const token = obterToken();

    const url = pegarBaseURL() + '/transfers';

    const payload = JSON.stringify({
        from: "julio",
        to: "priscila",
        value: 10
    });

    const params = {
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que o status é 201': (r) => r.status === 201,
    });

    sleep(1);
}