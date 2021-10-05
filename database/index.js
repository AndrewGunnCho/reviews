const { Pool } = require('pg');
const Cursor = require('pg-cursor');
const config = require('../config.js');

const pool = new Pool({
  user: config.user,
  host: config.host,
  password: config.password,
  database: config.database,
  port: config.port,
})

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

// const getRating = (id) => {
  // obj
  // var obj = {};

  // loop through ratings in reviews where product_id
    // set rating with value as key and increment
      // if it exists, increment

  // return object // <- attach this to ratings
// }

// const getRecommend = (id) => {
  // obj
  // var obj = {};

  // loop through recommend in reviews where product_id
    // set key as boolean and increment
      // if it exists, increment

  // return object // <- attach this to recommended
// }

// VALUES ${photosQuery('id', 'reviewsIns', 'photos')}
// VALUES ${characteristicsQuery('id', 'reviewsIns')}
// separate the entries for photos and characteristics

// get: (params, callback) => {
//   pool.query('SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = $1 AND reported IS NOT TRUE LIMIT 5', params, (err, data) => {
//     if (err) {
//       callback (err, null)
//     } else {
//       callback (null, data.rows)
//     }
//   })
// },

// const characteristics = (id) => {
//   `SELECT * FROM characteristics WHERE product_id = ${id}`
// }

// let obj = {
//   `product_id: ${data.id},
//   ratings: ${},
//   recommended: ${},
//   characteristics: ${characteristics()}`
// }

module.exports = {
  get: (text, callback) => {
    pool.query(text, null, (err, data) => {
      // console.log(err)
      if (err) {
        callback (err, null)
      } else {
        callback (null, data.rows)
      }
    })
  },

  getMeta: (text, callback) => {
    pool.query(text, null, (err, data) => {
      console.log(err)
      if (err) {
        callback (err, null)
      } else {
        obj[data]
        callback (null, obj)
      }
    })
  },

  // WITH reviews AS (
  //   INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
  //   VALUES (4, 4, 123423152315, 'lol', 'test', true, 'a', 'a@a.com')
  //   RETURNING id
  //   )
  // , photos AS (
  //   INSERT INTO photos (url, review_id)
  //   VALUES (['https//:gottem.com', 'https//:lmao.com'], id) <- need to separate
  // , characteristics_review AS (
  //   INSERT INTO ()
  //   VALUES ()
  // )



  post: (params, callback) => {
    pool.query('INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', params, (err, data) => {
      if (err) {
        callback (err, null);
      } else {
        callback (null, data);
      }
    })
  },

  put: (params, callback) => {
    pool.query('UPDATE reviews SET helpful = helpful + 1 WHERE review_id = ?', params, (err, data) => {
      if (err) {
        callback (err, null);
      } else {
        callback (null, data);
      }
    })
  },

  report: (params, callback) => {
    pool.query('UPDATE reviews SET reported = true WHERE reported = false', params, (err,data) => {
      if (err) {
        callback (err, null);
      } else {
        callback (null, data);
      }
    })
  }

}

// (async () => {
//   const client = await pool.connect();
//   const query = 'SELECT * FROM reviews';

//   const cursor = await client.query(new Cursor(query));

//   cursor.read(1, (err, rows) => {
//     console.log('We got the first row set');
//     console.log(rows);

//     cursor.read(1, (err, rows) => {
//       console.log('This is the next row set');
//       console.log(rows);
//     });
//   });
// })();

