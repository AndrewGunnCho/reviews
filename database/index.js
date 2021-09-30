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

module.exports = {
  get: (callback) => {
    pool.query('SELECT * FROM reviews WHERE ', (err, data) => {
      if (err) {
        callback (err, null)
      } else {
        callback (null, data)
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

