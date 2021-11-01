module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define("PaymentMethod", {
        payment_method: {
            type: DataTypes.STRING
        },
        payment_method_image: {
            type: DataTypes.STRING
        }
    },{ timestamps: false })
    return PaymentMethod;
}