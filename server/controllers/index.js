const models = require('../models');
const { getListCache, setListCache, getProductCache, setProductCache, getStyleCache, setStyleCache, getRelatedCache, setRelatedCache } = require('../redis.js');

module.exports = {
  getProductList: (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    getListCache(page, count)
    .then((cached) => {
      // console.log('cached?', cached);
      if (cached) return cached;
      return models.getProductList(page, count)
    })
    .then((results) => {
      setListCache(page, count, results);
      res.send(results);
    })
    .catch((err) => {
      console.log('error getting product list', err);
      res.status(500).send('Error getting product list');
    })
  },
  getProduct: (req, res) => {
    const productId = req.params.product_id;
    getProductCache(productId)
    .then((cached) => {
      // console.log('cached?', cached);
      if (cached) return cached;
      return models.getProduct(productId)
    })
    .then((results) => {
      setProductCache(productId, results);
      res.send(results);
    })
    .catch((err) => {
      console.log('error getting product info', err);
      res.status(500).send('Error getting product info');
    })
  },
  getStyles: (req, res) => {
    const productId = req.params.product_id;
    getStyleCache(productId)
    .then((cached) => {
      // console.log('cached?', cached);
      if (cached) return cached;
      return models.getStyles(productId);
    })
    .then((results) => {
      setStyleCache(productId, results);
      res.send(results);
    })
    .catch((err) => {
      console.log('error getting product styles', err);
      res.status(500).send('Error getting product styles');
    })
  },
  getRelated: (req, res) => {
    const productId = req.params.product_id;
    getRelatedCache(productId)
    .then((cached) => {
      // console.log('cached?', cached);
      if (cached) return cached;
      return models.getRelated(productId);
    })
    .then((results) => {
      setRelatedCache(productId, results);
      res.send(results);
    })
    .catch((err) => {
      console.log('error getting related product', err);
      res.status(500).send('Error getting related product');
    })
  }
};