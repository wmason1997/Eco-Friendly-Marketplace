const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const cartItem = require('./cartItem');

class Cart extends Model {
    async addItem(cartItemData) {
        try {
            await cartItem.create(cartItemData)
        } catch (error) {
            console.log("failed creating cart item")
            console.log(error)
        }
    }
}
    
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
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
                field: 'userID'
            },
        
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'cart'
    }
)

// Define associations
Cart.hasMany(cartItem, {
    foreignKey: 'cartID',
  });


module.exports = Cart;