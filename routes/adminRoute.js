const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const { validateToken } = require('../Middlewares/authAdminMiddleware');
const upload = require('../Middlewares/uploadMiddleware');

// all admins for authenticating
router.get('/admin/auth',validateToken,adminController.adminAuth_get);

// auths for admin users
router.get('/admins', adminController.admin_get);
router.post('/admin/register',adminController.admin_register);
router.post('/admin/login',adminController.admin_login);
router.get('/admin/logout',adminController.admin_logout);

// products
router.get('/admin/products',adminController.product_get);
router.post('/admin/addproduct',upload.single('product'),adminController.admin_addproduct);


module.exports = router;