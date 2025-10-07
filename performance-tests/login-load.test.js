import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  vus: 20,          
  duration: '15s',  

  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const url = pegarBaseURL() + '/users/login';

  const payload = JSON.stringify({
    username: "julio",
    password: "123456"
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Validar que o status é 200': (r) => r.status === 200,
    'Validar que o token é uma string': (r) => typeof (r.json().token) == 'string',
  });

  sleep(1);
}
