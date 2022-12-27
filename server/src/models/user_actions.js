const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('user_actions', {
  id: {
   autoIncrement: true,
   type: DataTypes.BIGINT,
   allowNull: false,
   primaryKey: true
  },
  version: {
   type: DataTypes.STRING(10),
   allowNull: true
  },
  accesstime: {
   type: DataTypes.TIME,
   allowNull: true
  },
  class_name: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  object_name: {
   type: DataTypes.STRING(255),
   allowNull: true
  },
  object_id: {
   type: DataTypes.BIGINT,
   allowNull: true
  },
  user_id: {
   type: DataTypes.BIGINT,
   allowNull: false,
   references: {
    model: 'users',
    key: 'id'
   }
  }
 }, {
  sequelize,
  tableName: 'user_actions',
  schema: 'public',
  timestamps: true,
  indexes: [{
   name: "user_actions_pkey",
   unique: true,
   fields: [
    { name: "id" },
   ]
  }, ]
 });
};