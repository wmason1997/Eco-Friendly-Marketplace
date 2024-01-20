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
        itemID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        cartID: {
            type: DataTypes.INTEGER,
            allowNull: false 
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "cartitem",
    }
);

module.exports = cartItem;