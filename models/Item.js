const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
       
        description: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(6,2),
        },
        category: {
            type: DataTypes.STRING,
        },
        subcategory: {
            type: DataTypes.STRING,
        },
        carbon: {
            type: DataTypes.DECIMAL(4,2),
        },
        energy: {
            type: DataTypes.DECIMAL(4,2),
        },
        waste: {
            type: DataTypes.DECIMAL(4,2),
        },
        imageURL: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'item',
    }
);

module.exports = Item;