import http from 'k6/http';

export function obterToken() {
      const url = 'http://localhost:3000/users/login';
    
      const payload = JSON.stringify({
        username: "julio",
        password: "123456"
      });
    
      const params = {
        headers: { 'Content-Type': 'application/json' },
      };
    
      const res = http.post(url, payload, params);

      return res.json('token');
}