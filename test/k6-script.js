import http from 'k6/http';
import { sleep } from 'k6';

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// }

export default function () {
  const url = 'http://localhost:8000/products';

  const params = {
    page: 1,
    count: 5
  }

  http.get(url, params);
}