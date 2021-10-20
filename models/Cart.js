module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart",{
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    })
    return Cart;
} 