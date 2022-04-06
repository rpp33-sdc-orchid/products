const models = require('../models');

module.exports = {
  getProductList: (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    models.getProductList(page, count)
      .then((results) => {
        // console.log('results?', results);
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting product list', err);
        res.sendStatus(500);
      })
  },
  getProduct: (req, res) => {
    const productId = req.params.product_id;
    models.getProduct(productId)
      .then((results) => {
        // console.log('results?', results);
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting product info', err);
        res.sendStatus(500);
      })
  },
  getStyles: (req, res) => {
    const productId = req.params.product_id;
    models.getStyles(productId)
      .then((results) => {
        // console.log('results?', results);
        // console.log('skus?', results.results[0].skus);
        results.results.forEach((style) => {
          let resultObj = {};
          let skusArr = style.skus;
          skusArr.forEach((sku) => {
            let eachSkus = {'quantity': 0, 'size': 0};
            eachSkus.quantity = sku.quantity;
            eachSkus.size = sku.size;
            resultObj[sku.skus_id] = eachSkus;
          })
          style.skus = resultObj;
        })
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting product styles', err);
        res.sendStatus(500);
      })
  },
  getRelated: (req, res) => {
    const productId = req.params.product_id;
    models.getRelated(productId)
      .then((results) => {
        // console.log('results?', results);
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting related product', err);
        res.sendStatus(500);
      })
  }
};