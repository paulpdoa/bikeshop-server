const { Order } = require('../models');

const order_get = (req, res) => {
    Order.findAll()
    .then((order) => {
        res.json(order)
    })
    .catch(err => console.log(err));
}

const order_post = (req, res) => {
    const { transactionId, paymentId, orderedDate, referenceNum } = req.body;
    
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
}

module.exports = {
    order_get,
    order_post
}