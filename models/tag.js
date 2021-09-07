const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tags extends Model {}

Tags.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag'
  }
);

module.exports = Tags;
