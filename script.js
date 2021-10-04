import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1, // stimulate virtual users
  duration: '30s', // test duration
};

// randomize
export default function () {
  http.get(`http://localhost:3000/reviews?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`);
}

// http.get('http://localhost:3000/reviews?page=1&count=3&product_id=15');
// sleep(1);