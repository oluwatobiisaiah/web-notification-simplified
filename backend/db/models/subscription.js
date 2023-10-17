const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('subscriptions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    subsription: {
      allowNull: false,
      type: DataTypes.STRING,
      get(){ 
        return JSON.parse(this.getDataValue("subsription"))
      }
    },
  },
  {
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['deletedAt']
      },
    }
  });
};