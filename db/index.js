require('dotenv').config();
const { pool } = require('pg');

// pools will use environment variables for connection information
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'sdc_products',
  password: process.env.PGPASSWORD || '',
  port: process.env.PGPORT || 5432
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});