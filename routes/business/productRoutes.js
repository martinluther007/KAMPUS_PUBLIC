const express = require('express');
const productController = require('./../../controllers/business/productController');
const authController = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get( productController.getAllProducts)
  .post(authController.protect,productController.uploadProductPhoto,productController.createProduct);

  router
  .route('/myProducts')
  .get( authController.protect,productController.getMyProducts)
 

  router
  .route('/myProducts/:id')
  .get( authController.protect,productController.getMyProduct)
  .patch(authController.protect,productController.uploadProductPhoto,productController.updateProduct)
  .delete(
    authController.protect,
    productController.deleteProduct
  )

router
  .route('/:id')
  .get(productController.getProduct)
  

module.exports = router;
