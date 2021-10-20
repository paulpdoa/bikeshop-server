const express = require('express');
const router = express.Router();

const bikeController = require('../controllers/bikeController');

router.get('/bicycles',bikeController.bike_get);
router.get('/bicycles/:item',bikeController.bike_detail_get);

module.exports = router;