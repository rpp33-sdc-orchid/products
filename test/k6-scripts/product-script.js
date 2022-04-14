import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  // rps: 10,
  vus: 100,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  }
};

export default function () {
  let testProductId = 999999;

  const product_url = `http://localhost:8000/products/${testProductId}`;
  http.get(product_url);

}