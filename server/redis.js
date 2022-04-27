const redis = require("redis");
require('dotenv').config();

const redisClient = redis.createClient({
  // host: process.env.REDIS_HOST,
  // port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => {
  console.log('Redis Client Error', err)
});

module.exports = redisClient;
