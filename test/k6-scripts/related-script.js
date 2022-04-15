import http from 'k6/http';
import { group, sleep } from 'k6';


export const options = {
  // rps: 10,
  vus: 1200,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  }
};

export default function () {
  let testProductId = Math.floor(Math.random() * (1000000 - 900000) + 900000);

  const related_url = `http://localhost:8000/products/${testProductId}/related`;
  http.get(related_url);

}