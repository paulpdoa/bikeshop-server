const express = require('express');
const router = express.Router();

const accessoryController = require('../controllers/accessoryController');

router.get('/accessories',accessoryController.accessory_get);
router.get('/accessories/:accessory',accessoryController.accessory_detail_get);

module.exports = router;