const { Order, Cart } = require('../models');
const db = require('../models');

const order_get = async (req, res) => {
    orders = await db.sequelize.query(
        `SELECT c.id as order_id, concat(cu.firstName,' ',cu.lastName) as Customer, cu.userName, i.product_image,i.brand_name,i.item_name,
        i.description,c.quantity FROM orders o join carts c on o.transaction_id=c.transaction_id
        join inventories i on c.inventory_id=i.id join customers cu on o.transaction_id=cu.id group 
        by i.item_name HAVING COUNT(i.item_name) >= 1 order by order_id`,{
        type: db.sequelize.QueryTypes.SELECT
        });

    return res.status(200).json(orders);
}

// for viewing customer order information
const order_info_get = async (req, res) => {
    const {id} = req.params
    
    order_infos = await db.sequelize.query(
        `SELECT o.id as o_id,cu.id,c.id as order_id, concat(cu.firstName,' ',cu.lastName) as Customer, cu.userName,cu.email, 
        i.product_image,i.brand_name,i.item_name,o.ordered_date,
        i.description,c.quantity FROM orders o join carts c on o.transaction_id=c.transaction_id
        join inventories i on c.inventory_id=i.id join customers cu on o.transaction_id=cu.id
        where c.id=${id} group by i.item_name HAVING COUNT(i.item_name) >= 1 order by order_id`,{
            type:db.sequelize.QueryTypes.SELECT
        });
        return res.status(200).json(order_infos);
}

// for orders of customer
const order_detail_get = async (req, res) => {

    const { id } = req.params;

    orders = await db.sequelize.query(
    `SELECT c.id,concat(cu.firstName,' ',cu.lastName) as Customer, i.product_image,i.brand_name,i.item_name,
    i.description,c.quantity FROM orders o join carts c on o.transaction_id=c.transaction_id
    join inventories i on c.inventory_id=i.id join customers cu on o.transaction_id=cu.id 
    where o.transaction_id=${id} group by i.item_name HAVING COUNT(i.item_name) >= 1`, {
    type: db.sequelize.QueryTypes.SELECT
    });

    return res.status(200).json(orders);

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
    Cart.update({ status: 'ordered' },{ where: { transaction_id: transactionId } })
    .then((ordered) => {
        console.log(ordered)
    })
    .catch(err => console.log(err));
}

const order_delete = (req, res) => {
    const { id } = req.params;

    console.log(id);
}

module.exports = {
    order_get,
    order_info_get,
    order_detail_get,
    order_post,
    order_delete
}