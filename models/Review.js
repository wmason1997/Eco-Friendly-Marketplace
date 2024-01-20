const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        itemID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'item',
                key: 'id'
            }
        },
        stars: {
            type: DataTypes.INTEGER,
        },
        review: {
            type: DataTypes.TEXT,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
)

module.exports = Review;