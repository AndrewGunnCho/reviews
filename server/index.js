require('newrelic');
const express = require('express');
const path = require('path');

const db = require(path.join('..', 'database', 'index.js'));

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/loaderio-cd4244f3aa8828e1a6fef5970d3856b5', (req, res) => {
  res.send('loaderio-cd4244f3aa8828e1a6fef5970d3856b5');
})

app.get('/reviews/', (req, res) => {

  var page = req.query.page || 1;
  var count = req.query.count || 5;
  var sort = req.query.sort || 'newest';

  var text =
    `SELECT json_build_object(
    'product', ${req.query.product_id},
    'page', ${page} - 1,
    'count', ${count},
    'results',
      (SELECT json_agg(row_to_json(reviews))
      FROM (SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
        (SELECT array_agg(json_build_object(
        'id', id,
        'url', url
        ))
        FROM photos
        WHERE review_id = reviews.id)
        AS photos
      FROM reviews
      WHERE product_id = ${req.query.product_id}
      AND reported IS NOT TRUE
      ORDER BY id DESC
      OFFSET ((${page} - 1) * ${count}) ROWS
      FETCH NEXT ${count} ROWS ONLY)
      AS reviews))`;

  db.get(text, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data[0].json_build_object)
    }
  })
})

app.listen(PORT, () => {
  console.log(`Port:${PORT} brings me eternal suffering`);
});