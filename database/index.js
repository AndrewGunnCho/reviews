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

module.exports = {
  get: (text, callback) => {
    pool.query(text, null, (err, data) => {
      if (err) {
        callback (err, null)
      } else {
        callback (null, data.rows)
      }
    })
  }
}