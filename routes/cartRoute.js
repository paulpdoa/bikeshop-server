const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.post('/customer/cart', cartController.addToCart_post);
router.get('/customer/cart',cartController.cartItem_get);
router.get('/customer/cart/:id',cartController.userCart_get);


module.exports = router;