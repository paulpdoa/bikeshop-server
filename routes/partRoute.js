const express = require('express');
const router = express.Router();

const partController = require('../controllers/partController');

router.get('/parts', partController.part_get);
router.get('/parts/:item',partController.part_detail_get);

module.exports = router;