const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('sp_engine_group', {
  id: {
   autoIncrement: true,
   type: DataTypes.BIGINT,
   allowNull: false,
   primaryKey: true
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: true
   },
  version: {
   type: DataTypes.STRING(10),
   allowNull: true
  },
  nomination: {
   type: DataTypes.STRING(150),
   allowNull: true
  },
  comment: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  is_active: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: true
  },
  trash: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false
  }
 }, {
  sequelize,
  tableName: 'sp_engine_group',
  schema: 'public',
  timestamps: true,
  indexes: [{
   name: "sp_engine_group_pkey",
   unique: true,
   fields: [
    { name: "id" },
   ]
  }, ]
 });
};