const express = require('express');
const path = require('path');

const db = require(path.join('..', 'database', 'index.js'));

const PORT = 3000;
const app = express();

app.use(express.json());

// const pagesQuery = {
//   text: `
//     SELECT * FROM reviews
//     WHERE product_id=${id}
//     ORDER BY id
//     OFFSET (($1 - 1) * $2) ROWS
//     FETCH NEXT $2 ROWS ONLY
//   `,
//   values: [page, count],
// };

// CASE WHEN photos is null
// THEN '[]'
// ELSE 'id', id, 'url', url END

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
      res.send(err)
    } else {
      res.send(data[0].json_build_object)
    }
  })
})

// first attempt

// `SELECT json_build_object(
//   'product_id', ${req.query.product_id},
//   'ratings', 1,
//   'recommended', 1,
//   'characteristics',
//     (SELECT json_agg(json_build_object(
//       name,
//       (SELECT json_agg(json_build_object(
//         'id', id,
//         'value', value
//       ))
//       FROM characteristics_review
//       WHERE review_id = review.id
//       AND characteristic_id = characteristics.id)
//     ))
//     FROM characteristics
//     WHERE product_id = ${req.query.product_id})
//   FROM reviews
//   WHERE product_id = ${req.query.product_id})`


// ---

// `SELECT json_build_object(
//   'product_id', ${req.query.product_id},
//   'ratings', 1,
//   'recommended', 1,
//   'characteristics',
//     (SELECT json_agg(row_to_json(characteristics))
//     FROM (SELECT name,
//       (SELECT json_build_object(
//       'id', id,
//       'value', value
//       )
//       FROM characteristics_review
//       WHERE characteristic_id = characteristics.id
//       AND review_id = reviews.id)
//       AS characteristics_review
//     FROM characteristics
//     WHERE product_id = ${req.query.product_id})
//     AS characteristics)
//   FROM reviews
//   WHERE product_id = ${req.query.product_id}
//   AS reviews)`;


app.get('/reviews/meta', (req, res) => {

  // var text =
    // `SELECT json_build_object(
    //   'product_id', 1,
    //   'ratings', 1,
    //   'recommended', 1,
    //   'characteristics',
    //     (SELECT json_agg(row_to_json(characteristics))
    //     FROM (SELECT name,
    //       (SELECT json_build_object(
    //       'id', id,
    //       'value', value
    //       ) AS test
    //       FROM characteristics_review
    //       WHERE characteristic_id = 1
    //       AND review_id = 1)
    //       AS characteristics_review
    //     FROM characteristics
    //     WHERE product_id = 1)
    //     AS characteristics)
    //   FROM reviews
    //   WHERE product_id = 1
    //   AS reviews)`;


  db.getMeta(text, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data[0].json_build_object);
    }
  })
})

app.post('/reviews', (req, res) => {
  console.log(req.body)
  var params = [req.body.product_id, req.body.rating, new Date(), req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email, req.body.photos, req.body.characteristics];
  console.log(params)
  // db.getMeta(params, (err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.sendStatus(201);
  //   }
  // })
})




app.listen(PORT, () => {
  console.log(`Port:${PORT} brings me eternal suffering`);
});