const models = require('../models');

module.exports = {
  getProductList: () => {},
  getProduct: () => {},
  getStyles: () => {},
  getRelated: (req, res) => {
    // TODO: get productId from req.param?
    models.getRelated(productId)
      .then((res) => {
        // TODO: send result to client
      })
      .catch((err) => {
        console.log('error getting related product in server', err);
        res.sendStatus(500);
      })
  }
};