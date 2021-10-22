module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory",{
        product_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_type: {
          type: DataTypes.STRING,
          allowNull: false  
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_price: {
            type: DataTypes.DECIMAL(20,2),
            allowNull:false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_color_id: {
            type: DataTypes.INTEGER
        },
        product_size: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Inventory;
}