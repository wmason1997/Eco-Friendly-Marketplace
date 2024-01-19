const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Cart extends Model {}
    

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        
        }
    }
)

module.exports = Cart;