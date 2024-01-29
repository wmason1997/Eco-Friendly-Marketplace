const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const Cart = require('./Cart');

class cartItem extends Model {
    // async addItem(cartItemData, res) {
    //     try {
    //         await cartItem.create(cartItemData)
    //         res.status(200).json({ message: 'Item added to cart successfully', addedItem });
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send("failed creating cart item")
    //     }
    // }
}

cartItem.init(
    {  
        id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
        },
        itemID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // cartID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'cart',
        //         key: 'id'
        //     }
        // },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                key: 'id',
                model: 'user'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            default: 1
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: "cartitem",
    }
);

module.exports = cartItem;