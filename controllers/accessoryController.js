const { Inventory } = require('../models');

const accessory_get = (req, res) => {
    Inventory.findAll({ where: { product_type: 'accessory' } })
    .then((accessory) => {
        res.json(accessory);
    })
    .catch((err) => console.log(err));
}

const accessory_detail_get = (req, res) => {
    Inventory.findOne({ where: { item_name: req.params.accessory } })
    .then((accessory) => {
        res.json(accessory)
    })
    .catch((err) => console.log(err));
}
module.exports = {
    accessory_get,
    accessory_detail_get
}