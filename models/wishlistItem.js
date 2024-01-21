const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class wishlistItem extends Model {}

wishlistItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        wishlistID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'wishlist',
                key: 'id',
            },
        },
        itemID: {
            type: DataTypes.INTEGER,
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