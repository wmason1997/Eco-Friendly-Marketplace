const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class orderItem extends Model {}

orderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        itemID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'item',
                key: 'id',
            },
        },
        orderID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'order',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orderitem',
    }
)

module.exports = orderItem;