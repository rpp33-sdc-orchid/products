import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  // vus: 600,
  // duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  },
  scenarios: {
    // one_hundred_rps: {
    //   executor: 'constant-arrival-rate',
    //   rate: 100,
    //   timeUnit: '1s', // 100 iterations per second, i.e. 100 RPS
    //   duration: '30s',
    //   preAllocatedVUs: 100, // how large the initial pool of VUs would be
    //   maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
    //   gracefulStop: '5s'
    // },
    one_thousand_rps: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
      gracefulStop: '5s'
    }
  }
};


export default function () {
  // const before = new Date().getTime();
  // const T = 10; // time needed to complete a VU iteration
  const productList_url = 'http://localhost:8000/products';
  const productList_params = {
    page: 200000,
    count: 5
  }

  // Replace this with normal requests w/o a for-loop
  // for (let i = 0; i < 10; i++) {
    http.get(productList_url, productList_params);
  // }

  // const after = new Date().getTime();
  // const diff = (after - before) / 1000;
  // const remainder = T - diff;
  // if (remainder > 0) {
  //   sleep(remainder);
  // } else {
  //   console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
  // }
  sleep(1)
}