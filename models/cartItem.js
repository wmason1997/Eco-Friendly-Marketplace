const {Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class cartItem extends Model {}

cartItem.init(
    {  
        id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
        }
    },
    {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false 
        }
    }
);

module.exports = cartItem;