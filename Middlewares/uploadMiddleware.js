const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({destination: './public/products'})

const upload = multer({ storage: storage })

module.exports = upload;