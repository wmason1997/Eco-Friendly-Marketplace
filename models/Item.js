const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        description: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING,
        },
        carbon: {
            type: DataTypes.INTEGER,
        },
        energy: {
            type: DataTypes.INTEGER,
        },
        waste: {
            type: DataTypes.INTEGER,
        },
        imageURL: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'item',
    }
);

module.exports = Item;