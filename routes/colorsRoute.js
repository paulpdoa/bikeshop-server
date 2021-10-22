const express = require('express');
const router = express.Router();

const colorsController = require('../controllers/colorsController');

router.get('/product-colors',colorsController.colors_get);

module.exports = router;