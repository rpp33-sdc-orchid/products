const pool = require('../../db/index.js');

module.exports = {
  getProductList: (page = 1, count = 5) => {
    // console.log('product page and count?', page, count);
    const query = `SELECT * FROM products LIMIT $2 OFFSET $1`;

    return pool.connect().then((client) => {
      return client.query(query, [page * count - count, count])
        .then((res) => {
          client.release();
          // console.log('list results?', res.rows);
          return res.rows;
        })
        .catch((err) => {
          console.log('error executing getProductList query', err);
          return err;
        })
    });
  },
  getProduct: (productId) => {
    // console.log('product id in product?', productId);
    const query = `SELECT row_to_json(t) AS products
    FROM (
      SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price,
        ( SELECT json_agg(row_to_json(fea))
          FROM (
            SELECT features.feature, features.value FROM features WHERE features.product_id = products.id
          ) fea
        ) AS features
      FROM products WHERE products.id = $1
    ) t`;

    return pool.connect().then((client) => {
      return client.query(query, [productId])
        .then((res) => {
          client.release();
          // console.log('product results?', res.rows[0].products);
          return res.rows[0].products;
        })
        .catch((err) => {
          console.log('error executing getProduct query', err);
          return err;
        })
    });
  },
  getStyles: (productId) => {
    const query = `SELECT row_to_json(t)
    FROM (
      SELECT products.id AS product_id,
        ( SELECT json_agg(row_to_json(stl))
          FROM (
            SELECT styles.style_id, styles.name, styles.original_price, styles.sale_price, styles.defaults AS "defaults?", (
              SELECT COALESCE(json_agg(row_to_json(pho)), NULL, '[]')
              FROM (
                SELECT photos.thumbnail_url, photos.url FROM photos WHERE photos.style_id = styles.style_id
                ) pho
              ) AS photos,
              (
                SELECT COALESCE(json_agg(row_to_json(sku)), NULL, '{}')
                FROM (
                SELECT skus.skus_id, skus.quantity, skus.size FROM skus WHERE skus.style_id = styles.style_id
                ) sku
              ) AS skus
            FROM styles WHERE styles.product_id = products.id
          ) stl
        ) AS results
      FROM products WHERE products.id = $1
    ) t`;

    return pool.connect().then((client) => {
      return client.query(query, [productId])
        .then((res) => {
          client.release();
          // console.log('style results?', res.rows[0].row_to_json);
          return res.rows[0].row_to_json;
        })
        .catch((err) => {
          console.log('error executing getStyles query', err);
          return err;
        })
    });
  },
  getRelated: (productId) => {
    // console.log('product id in related?', productId);
    const query = `SELECT json_agg(related.related_product_id) FROM related WHERE related.product_id = $1`;

    return pool.connect().then((client) => {
      return client.query(query, [productId])
        .then((res) => {
          client.release();
          // console.log('related results?', res.rows[0].json_agg);
          if(res.rows[0].json_agg) {
            return res.rows[0].json_agg;
          } else {
            return [];
          }
        })
        .catch((err) => {
          console.log('error executing getRelated query', err);
          return err;
        })
    });
  }
};