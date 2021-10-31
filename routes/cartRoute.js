const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

// content of cart table
router.get('/cart',cartController.carts_get);
router.get('/cart/:id',cartController.cartsDetail_get);

router.post('/customer/cart', cartController.addToCart_post);
router.get('/customer/cart',cartController.cartItem_get);
// customer orders 
router.get('/customer/cart/:id',cartController.userCart_get);
router.delete('/cart/:id',cartController.cartProduct_delete);


module.exports = router;