const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/customer/orders',orderController.order_get);
router.post('/customer/orders',orderController.order_post);

module.exports = router;