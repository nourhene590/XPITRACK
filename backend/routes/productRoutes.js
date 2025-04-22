const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getNearExpiryProducts,
  getOutOfStockProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { check } = require('express-validator');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getProducts)
  .post(
    [
      check('name', 'Le nom du produit est requis').not().isEmpty(),
      check('category', 'La catégorie est requise').not().isEmpty(),
      check('quantity', 'La quantité est requise').isNumeric(),
    ],
    createProduct
  );

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.get('/category/:category', getProductsByCategory);
router.get('/near-expiry', getNearExpiryProducts);
router.get('/out-of-stock', getOutOfStockProducts);

module.exports = router;