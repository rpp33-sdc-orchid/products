const express = require('express');
const controller = require('./constrollers');
const router = express.Router();

// router.use()

// route for retrieve the list of products
router.get('/', controller.getProductList);

// route for return all product level information for a specified product id
router.get('/:product_id', controller.getProduct);

// route for return all styles available for a given product
router.get('/:product_id/styles', controller.getStyles);

// router for return the id's of products related to the product specified
router.get('/:product_id/related', controller.getRelated);

module.exports = router;