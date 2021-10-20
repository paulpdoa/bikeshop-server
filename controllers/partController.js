const { Product } = require('../models');

const part_get = (req,res) => {
    Product.findAll({ where: {product_type: 'parts'} })
        .then((part) => {
            res.json(part);
        })
        .catch(err => {
            console.log(err)
        }) 
}

const part_detail_get = (req,res) => {
    Product.findOne({where: {item: req.params.item}})
    .then((part) => {
        res.json(part);
    })
    .catch((err) => console.log(err))
}

module.exports = {
    part_get,
    part_detail_get
}