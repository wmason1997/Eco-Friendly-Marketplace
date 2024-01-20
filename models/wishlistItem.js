const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class wishlistItem extends Model {}

wishlistItem.init(
    {
        id: {},
        wishlistID: {
            references: {
                model: 'wishlist',
                key: 'id',
            },
        },
        itemID: {
            references: {
                model: 'item',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'wishlistitem',
    }
);

module.exports = wishlistItem;