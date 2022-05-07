const redis = require("redis");
const { promisify } = require('util');
require('dotenv').config();


const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

client.on('ready', () => {
  console.log('Redis Client Connected');
});

client.connect();

module.exports = {
  getListCache: (page, count) => {
    return client.get(`list_page=${page}_count=${count}`)
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setListCache: (page, count, body) => {
    return client.set(`list_page=${page}_count=${count}`, JSON.stringify(body))
    .catch((err) => {
      throw err;
    })
  },
  getProductCache: (id) => {
    return client.get(`product_id=${id}`)
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setProductCache: (id, body) => {
    return client.set(`product_id=${id}`, JSON.stringify(body))
    .catch((err) => {
      throw err;
    })
  },
  getStyleCache: (id) => {
    return client.get(`style_product_id=${id}`)
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setStyleCache: (id, body) => {
    return client.set(`style_product_id=${id}`, JSON.stringify(body))
    .catch((err) => {
      throw err;
    })
  },
  getRelatedCache: (id) => {
    return client.get(`related_product_id=${id}`)
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setRelatedCache: (id, body) => {
    return client.set(`related_product_id=${id}`, JSON.stringify(body))
    .catch((err) => {
      throw err;
    })
  }
};
