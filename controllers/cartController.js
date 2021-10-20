const { Cart, Customer, Product } = require('../models');

const cartItem_get = (req, res) => {
    Customer.hasMany(Cart, {foreignKey: 'customer_id'})
    Product.hasMany(Cart, {foreignKey: 'product_id'})
    Cart.belongsTo(Customer,{ foreignKey: 'customer_id' })
    Cart.belongsTo(Product, { foreignKey: 'product_id'})

    Cart.findAll({
        include: [{model: Product}]
    })
    .then((result) => {
        res.json(result);
    })
    .catch(err => console.log(err)) 
}

const userCart_get = (req, res) => {
    // joining three tables
    Product.hasMany(Cart, {foreignKey:'product_id'})
    Cart.belongsTo(Product, { foreignKey: 'product_id'})

    Customer.hasMany(Cart,{foreignKey:'id'})
    Cart.belongsTo(Customer,{foreignKey:'customer_id'})

    Cart.findAll({ 
        include: [{model: Product},{model: Customer}],
        where: { customer_id: req.params.id } 
    })
    .then((user) => {
        res.json(user);
    })  
    .catch((err) => console.log(err));
}

const addToCart_post = (req, res) => {
    Cart.create({
        customer_id: req.body.buyerId,
        product_id: req.body.productId,
        quantity: req.body.quantity
    })
    .then((cart) => {
        res.status(200).json({ mssg: 'Added to cart!', status: true })
    })
    .catch(err => console.log(err))
}



module.exports = {
    addToCart_post,
    userCart_get,
    cartItem_get
}