const { ProductColor } = require('../models');

module.exports.colors_get = (req, res) => {
    ProductColor.findAll()
    .then((colors) => {
        res.status(200).json(colors)
    }).catch(err => console.log(err))
}
