const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/customer/orders',orderController.order_get);
router.get('/customer/info/:id',orderController.order_info_get);
router.get('/customer/orders/:id',orderController.order_detail_get);
router.post('/customer/orders',orderController.order_post);

module.exports = router;