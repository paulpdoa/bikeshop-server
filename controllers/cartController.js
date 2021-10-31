const { Cart, Customer, Inventory } = require('../models');

const carts_get = (req, res) => {
    Cart.findAll()
    .then((content) => {
        res.json(content);
    })
    .catch((err) => console.log(err));
}
const cartsDetail_get = (req,res) => {
    const { id } = req.params;
    Cart.findOne({ where: { id: id }})
    .then((detail) => {
        res.json(detail);
    })
    .catch((err) => console.log(err));
}

const cartItem_get = (req, res) => {
    Customer.hasMany(Cart, {foreignKey: 'customer_id'})
    Inventory.hasMany(Cart, {foreignKey: 'inventory_id'})
    Cart.belongsTo(Customer,{ foreignKey: 'customer_id' })
    Cart.belongsTo(Inventory, { foreignKey: 'inventory_id'})

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
    Inventory.hasMany(Cart, {foreignKey:'inventory_id'})
    Cart.belongsTo(Inventory, { foreignKey: 'inventory_id'})

    Customer.hasMany(Cart,{foreignKey:'id'})
    Cart.belongsTo(Customer,{foreignKey:'customer_id'})

    Cart.findAll({ 
        include: [{model: Inventory},{model: Customer}],
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
        inventory_id: req.body.inventoryId,
        quantity: req.body.quantity
    })
    .then((cart) => {
        res.status(200).json({ mssg: 'Added to cart!', status: true })
    })
    .catch(err => console.log(err))
}

const cartProduct_delete = (req,res) => {
    const { id } = req.params;

    Cart.destroy({ where: { id: id }})
    .then((removed) => {
        res.json({ mssg: 'Item has been deleted' })
    })
    .catch((err) => console.log(err))
}


module.exports = {
    carts_get,
    cartsDetail_get,
    addToCart_post,
    userCart_get,
    cartItem_get,
    cartProduct_delete
}