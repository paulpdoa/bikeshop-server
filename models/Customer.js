module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer",{
        firstName: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                //custom validation
                isUnique(value) {
                    return Customer.findOne({where:{userName:value}})
                    .then((username) => {
                        if(username) {
                            throw new Error('This username has already been taken');
                        }
                    })
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
            validate: {
                isEmail: {
                    msg:"Please enter a valid email"
                },
               isUnique(value) {
                   return Customer.findOne({where: {email: value}})
                    .then((email) => {
                        if(email){
                            throw new Error('This email has already been taken');
                        }
                    })
               }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.STRING
        }
    })
    return Customer;
}