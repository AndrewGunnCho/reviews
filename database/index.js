const { Pool } = require('pg');
const Cursor = require('pg-cursor');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'review',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Error:', err);
});

// VALUES ${photosQuery('id', 'reviewsIns', 'photos')}
// VALUES ${characteristicsQuery('id', 'reviewsIns')}
// separate the entries for photos and characteristics

module.exports = {
  get: (params, callback) => {
    pool.query('SELECT rating FROM reviews WHERE product_id = $1 LIMIT 2', params, (err, data) => {
      if (err) {
        callback (err, null)
      } else {
        callback (null, data.rows)
      }
    })
  },

  getMeta: (params, callback) => {
    pool.query('SELECT rating FROM reviews WHERE product_id = $1 LIMIT 2', params, (err, data) => {
      if (err) {
        callback (err, null)
      } else {
        callback (null, data.rows)
      }
    })
  },

  // WITH ins1 AS (
  //   INSERT INTO reviews (rating, date, summary, body, recommend, reviewer_name, reviewer_email)
  //   VALUES ($2, $3, $4, $5, $6, $7, $8)
  //   RETURNING


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

