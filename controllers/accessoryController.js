const { Product } = require('../models');

const accessory_get = (req, res) => {
    Product.findAll({ where: { product_type: 'accessory' } })
    .then((accessory) => {
        res.json(accessory);
    })
    .catch((err) => console.log(err));
}

const accessory_detail_get = (req, res) => {
    Product.findOne({ where: { item: req.params.accessory } })
    .then((accessory) => {
        res.json(accessory)
    })
    .catch((err) => console.log(err));
}
module.exports = {
    accessory_get,
    accessory_detail_get
}