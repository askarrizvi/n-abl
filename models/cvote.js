const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cvote extends Model {}

Cvote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'comment',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cvote'
  }
);

module.exports = Cvote;
