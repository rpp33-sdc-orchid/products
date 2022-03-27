const pool = require('../../db/index.js');

module.exports = {
  getProductList: (page = 1, count = 5) => {
    console.log('product page and count?', page, count);
    const query = `SELECT * FROM products LIMIT $2 OFFSET $1`;

    return pool.connect().then((client) => {
      return client.query(query, [page * count - count, count])
        .then((res) => {
          client.release();
          console.log('results?', res.rows);
          // TODO: return results?
        })
        .catch((err) => {
          console.log('error executing query', err);
        })
    });
  },
  getProduct: () => {},
  getStyles: () => {},
  getRelated: (productId) => {
    console.log('product id in related?', productId);
    const query = `SELECT json_agg(related.related_product_id) FROM related WHERE related.product_id = $1`

    return pool.connect().then((client) => {
      return client.query(query, [productId])
        .then((res) => {
          client.release();
          console.log('results?', res.rows);
          // TODO: return results?
        })
        .catch((err) => {
          console.log('error executing query', err);
        })
    });
  }
};