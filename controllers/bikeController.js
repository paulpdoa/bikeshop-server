const { Inventory } = require('../models');

const bike_get = (req,res) => {
    Inventory.findAll({ where: {product_type: 'bike'} })
        .then((bike) => {
            res.json(bike);
        })
        .catch(err => {
            console.log(err)
        }) 
}

const bike_detail_get = (req, res) => {
    Inventory.findOne({ where: { item: req.params.item } })   
    .then((product) => {
        res.json(product)
    })
    .catch((err) => console.log(err))
}

module.exports = {
    bike_get,
    bike_detail_get
}