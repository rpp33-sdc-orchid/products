import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  vus: 600,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  }
};


export default function () {
  const before = new Date().getTime();
  const T = 10; // time needed to complete a VU iteration
  const productList_url = 'http://localhost:8000/products';
    const productList_params = {
      page: 250000,
      count: 5
    }

  // Replace this with normal requests w/o a for-loop
  for (let i = 0; i < 10; i++) {
    http.get(productList_url, productList_params);
  }

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
  }
}