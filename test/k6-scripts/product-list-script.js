import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  // rps: 10,
  vus: 1000,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  }
};

export default function () {
  const productList_url = 'http://localhost:8000/products';
  const productList_params = {
    page: 100,
    count: 50
  }
  http.get(productList_url, productList_params, {
    tags: { name: 'GET/products' }
  });
}