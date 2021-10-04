import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '1s',
};

export default function () {
  http.get('http://localhost:3000/reviews?page=1&count=3&product_id=15');
  sleep(1);
}