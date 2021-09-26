module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
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
                    return User.findOne({where:{userName:value}})
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
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: {
                    msg:"Please enter a valid email"
                },
               isUnique(value) {
                   return User.findOne({where: {email: value}})
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
        }
    })
    return User;
}