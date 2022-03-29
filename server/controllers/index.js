const models = require('../models');

module.exports = {
  getProductList: (req, res) => {
    // TODO: get page and count from req.param?
    models.getProductList(page, count)
      .then((res) => {
        // TODO: send result to client
      })
      .catch((err) => {
        console.log('error getting product list', err);
        res.sendStatus(500);
      })
  },
  getProduct: (req, res) => {
    // TODO: get product id from req.param?
    models.getProduct(productId)
      .then((res) => {
        // TODO: send result to client
      })
      .catch((err) => {
        console.log('error getting product info', err);
        res.sendStatus(500);
      })
  },
  getStyles: (req, res) => {
    // TODO: get product id from req.param?
    models.getStyles(productId)
      .then((res) => {
        // TODO: send result to client
      })
      .catch((err) => {
        console.log('error getting product styles', err);
        res.sendStatus(500);
      })
  },
  getRelated: (req, res) => {
    // TODO: get productId from req.param?
    models.getRelated(productId)
      .then((res) => {
        // TODO: send result to client
      })
      .catch((err) => {
        console.log('error getting related product', err);
        res.sendStatus(500);
      })
  }
};