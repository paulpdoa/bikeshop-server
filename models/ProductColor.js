module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define("ProductColor", {
        product_color: {
            type: DataTypes.STRING,
        }
    }, { timestamps: false })
    return ProductColor
}