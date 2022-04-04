require('dotenv').config();
const { Pool } = require('pg');

// pools will use environment variables for connection information
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'sdc_products',
  password: process.env.PGPASSWORD || '',
  port: process.env.PGPORT || 5432
});


pool.on('error', (err, client) => {
  console.error('Error acquiring pool:', err);
});


pool.connect((err, client, release) => {
  if (err) {
    return console.log('error acquiring client', err);
  }
  client.query('SELECT * FROM products LIMIT 10', (err, result) => {
    release();
    if (err) {
      return console.log('error executing query', err);
    }
    // console.log('results?', result.rows);
    console.log('success connection');
  })
});

module.exports = pool;