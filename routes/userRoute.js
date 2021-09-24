const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.user_get );
router.post('/register',userController.user_register);
router.post('/login', userController.user_login);
router.post('/forgot',userController.forgot_password);
router.put('/users', userController.update_password);
router.get('/logout',userController.user_logout);

module.exports = router;