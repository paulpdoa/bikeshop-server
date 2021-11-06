const { Order, Cart, Inventory } = require('../models');

const order_get = (req, res) => {
    Order.findAll()
    .then((order) => {
        res.json(order)
    })
    .catch(err => console.log(err));
}

const order_detail_get = async (req, res) => {

    // Cart.hasMany(Order, { foreignKey: 'transaction_id' });
    // Order.belongsTo(Cart, { foreignKey: 'transaction_id' });

    // Inventory.hasMany(Order, { foreignKey: 'id' })
    // Order.belongsTo(Inventory, { foreignKey: 'id' })

    // Order.findAll({
    //     include: [{ model: Cart }, { model: Inventory }],
    //     where: { transaction_id: req.params.id }
    // })
    // .then((order) => {
    //     res.json(order);
    // })
    // .catch(err => console.log(err));
}

const order_post = (req, res) => {
    const { transactionId, paymentId, orderedDate, referenceNum } = req.body;
    
    // place the orders inside the order table
    Order.create({
        transaction_id: transactionId,
        payment_id: paymentId,
        ordered_date: orderedDate,
        reference_number: referenceNum
    })
    .then((order) => {
        res.json({ mssg: 'Order has been successfully placed!', order })
    })
    .catch(err => console.log(err));

    // update the status of cart to ordered when the transaction is done
    Cart.update(
        { status: 'ordered' },
        { where: { transaction_id: transactionId } }
    )
    .then((ordered) => {
        console.log(ordered)
    })
    .catch(err => console.log(err));

}

module.exports = {
    order_get,
    order_detail_get,
    order_post
}