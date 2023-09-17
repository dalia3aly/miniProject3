const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Fruit extends Model {}

Fruit.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
    name: {
    type: DataTypes.STRING,
    allowNull: true
    },
  family: {
    type: DataTypes.STRING,
    allowNull: true
  },
    order_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fat: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sugar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carbohydrates: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

}, {
  sequelize,
  modelName: 'Fruit',
  timestamps: false           // to Avoide createdAt and updatedAt errors for now
});

module.exports = Fruit;