import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
    vus: 20,
    duration: '30s',

  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
    const url = pegarBaseURL() + '/users/register';

    const payload = JSON.stringify({
        username: `user_${Math.random()}`,
        password: "123456",
        favorecidos: [
            "usuario3"
        ]
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que o status é 201': (r) => r.status === 201,
    });

    sleep(1);
}
