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


// pool.on('error', (err, client) => {
//   console.error('Error acquiring pool:', err);
// });


module.exports = pool;