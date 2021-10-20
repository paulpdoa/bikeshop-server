module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",{
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_type: {
          type: DataTypes.STRING,
          allowNull: false  
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(20,2),
            allowNull:false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Product;
}