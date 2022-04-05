const models = require('../models');

module.exports = {
  getProductList: (req, res) => {
    // TODO: get page and count from req.param?
    // console.log('req.param?', req.params);
    const page = 1;
    const count = 5;
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
    // TODO: get product id from req.param?
    const productId = 1;
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
    // TODO: get product id from req.param?
    const productId = 1;
    models.getStyles(productId)
      .then((results) => {
        // TODO: send result to client
         console.log('results?', results);
        // res.send(results);
      })
      .catch((err) => {
        console.log('error getting product styles', err);
        res.sendStatus(500);
      })
  },
  getRelated: (req, res) => {
    // TODO: get productId from req.param?
    const productId = 1;
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