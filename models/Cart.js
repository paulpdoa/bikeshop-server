module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart",{
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inventory_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        }
    })
    return Cart;
} 