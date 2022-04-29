const redis = require("redis");
const { promisify } = require('util');
require('dotenv').config();


const client = redis.createClient({
  // host: process.env.REDIS_HOST,
  // port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD
});
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

client.on('ready', () => {
  console.log('Redis Client Connected');
});

client.connect();

// client.set('productKey', 'productValue');
// client.get('productKey')
// .then((value) => {
//   console.log('value?', value);
//   client.set('productKey', 'productValue');
// })

module.exports = {
  getListCache: (page, count) => {
    return client.get(`list_page=${page}_count=${count}`)
    .then((result) => {
      // console.log('cashed????', result);
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setListCache: (page, count, body) => {
    return client.set(`list_page=${page}_count=${count}`, JSON.stringify(body))
    // .then((result) => console.log('success add to product list cache'))
    .catch((err) => {
      throw err;
    })
  },
  getProductCache: (id) => {
    return client.get(`product_id=${id}`)
    .then((result) => {
      // console.log('cashed????', result);
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setProductCache: (id, body) => {
    return client.set(`product_id=${id}`, JSON.stringify(body))
    // .then((result) => console.log('success add to product cache'))
    .catch((err) => {
      throw err;
    })
  },
  getStyleCache: (id) => {
    return client.get(`style_product_id=${id}`)
    .then((result) => {
      // console.log('cashed????', result);
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setStyleCache: (id, body) => {
    return client.set(`style_product_id=${id}`, JSON.stringify(body))
    // .then((result) => console.log('success add to style cache'))
    .catch((err) => {
      throw err;
    })
  },
  getRelatedCache: (id) => {
    return client.get(`related_product_id=${id}`)
    .then((result) => {
      // console.log('cashed????', result);
      return JSON.parse(result)
    })
    .catch(() => null)
  },
  setRelatedCache: (id, body) => {
    return client.set(`related_product_id=${id}`, JSON.stringify(body))
    // .then((result) => console.log('success add to related cache'))
    .catch((err) => {
      throw err;
    })
  }
};
