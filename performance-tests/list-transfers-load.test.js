import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
    vus: 10,
    duration: '30s',

    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200'],
    },
};

export default function () {
  const resposta = http.get(pegarBaseURL() + '/transfers');
  //console.log(resposta)
  
  check (resposta, {
    'Validar que o status é 200': (r) => r.status ===200,
  });

  sleep(1);
}

