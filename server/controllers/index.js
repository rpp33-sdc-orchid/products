const models = require('../models');

module.exports = {
  getProductList: (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    models.getProductList(page, count)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting product list', err);
        res.status(500).send('Error getting product list');
      })
  },
  getProduct: (req, res) => {
    const productId = req.params.product_id;
    models.getProduct(productId)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting product info', err);
        res.status(500).send('Error getting product info');
      })
  },
  getStyles: (req, res) => {
    const productId = req.params.product_id;
    models.getStyles(productId)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting product styles', err);
        res.status(500).send('Error getting product styles');
      })
  },
  getRelated: (req, res) => {
    const productId = req.params.product_id;
    models.getRelated(productId)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('error getting related product', err);
        res.status(500).send('Error getting related product');
      })
  }
};