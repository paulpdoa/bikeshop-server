module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUnique(value) {
                    return Admin.findOne({ where: {userName: value} })
                    .then((username) => {
                        if(username) {
                            throw new Error('This username has already been taken');
                        }
                    })
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Admin;
}