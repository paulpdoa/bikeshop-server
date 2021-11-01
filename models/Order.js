module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        cart_id: {
            type: DataTypes.INTEGER
        },
        payment_id: {
            type: DataTypes.INTEGER
        },
        ordered_date: {
            type: DataTypes.STRING
        },
        reference_number: {
            type: DataTypes.STRING
        }  
    })
    return Order;
}