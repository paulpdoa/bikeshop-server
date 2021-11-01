const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

// middleware auth
const { validateToken } = require('../Middlewares/authMiddleware');

// created this to be able to pass in frontend and use axios to get request
router.get('/auth', validateToken, customerController.auth_get);

router.get('/customers', customerController.customer_get);
router.get('/customers/:id',customerController.customerProfile_get);
router.post('/register',customerController.customer_register);
router.post('/login', customerController.customer_login);
router.post('/forgot',customerController.forgot_password);
router.put('/customers', customerController.update_password);
router.get('/logout', customerController.customer_logout);
router.put('/customers/:id',customerController.update_profile);
router.get('/payment-method',customerController.payment_method_get);

module.exports = router;