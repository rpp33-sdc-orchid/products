const pool = require('../../db/index.js');

module.exports = {
  getProductList: () => {},
  getProduct: () => {},
  getStyles: () => {},
  getRelated: (productId) => {
    console.log('product id in related?', productId);
    const query = `SELECT json_agg(related.related_product_id) FROM related WHERE related.product_id = $1`

    pool.connect().then((client) => {
      client.query(query, [productId])
        .then((res) => {
          client.release();
          console.log('results?', res.rows);
        })
        .catch((err) => {
          console.log('error executing query', err);
        })
      });
    };
};