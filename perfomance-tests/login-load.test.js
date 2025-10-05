import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,          // 20 usuários virtuais
  duration: '15s',  // durante 15 segundos
};

//adicionar thresholds

export default function () {
  const url = 'http://localhost:3000/users/login'
  const payload = JSON.stringify({
    username: 'luciana',
    password: '123456'
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'Validar que o status é 200': (r) => r.status === 200,
    'Validar que o token é string': (r) => typeof(r.json().token) == 'string'
  });

  sleep(1); // pausa de 1s entre execuções
}
