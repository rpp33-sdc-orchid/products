import http from 'k6/http';
import { group, sleep } from 'k6';

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }

export const options = {
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000']
  }
};

export default function () {
  let productId_end = 999999;
  let productId_mid = 454755;
  let productId_beginning = 1;
  let productId_B = 800000;

  group('GET/products', function () {
    const productList_url = 'http://localhost:8000/products';
    const productList_params = {
      page: 10,
      count: 10
    }
    http.get(productList_url, productList_params, {
      tags: { name: 'GET/products' }
    });
  });

  group('GET/products/:product_id', function () {
    const productEnd_url = `http://localhost:8000/products/${productId_end}`;
    http.get(productEnd_url);

    const productMid_url = `http://localhost:8000/products/${productId_mid}`;
    http.get(productMid_url);

    const productBeginning_url = `http://localhost:8000/products/${productId_beginning}`;
    http.get(productBeginning_url);
  });

  group('GET/products/:product_id/styles', function () {
    const styleEnd_url = `http://localhost:8000/products/${productId_end}/styles`;
    http.get(styleEnd_url);

    const styleMid_url = `http://localhost:8000/products/${productId_B}/styles`;
    http.get(styleMid_url);
  });

  group('GET/products/:product_id/related', function () {
  const relatedEnd_url = `http://localhost:8000/products/${productId_end}/related`;
  http.get(relatedEnd_url);

  const relatedMid_url = `http://localhost:8000/products/${productId_B}/related`;
  http.get(relatedMid_url);
  });
}