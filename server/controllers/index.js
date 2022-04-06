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
        console.log('results?', results);
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