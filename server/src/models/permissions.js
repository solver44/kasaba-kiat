const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('permissions', {
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
  name: {
   type: DataTypes.STRING(50),
   allowNull: false,
   unique: "permissions_name_key"
  },
  translate_ru: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  translate_uz: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  translate_uzl: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  acces: {
   type: DataTypes.STRING(50),
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
  tableName: 'permissions',
  schema: 'public',
  timestamps: true,
  indexes: [{
    name: "permissions_name_key",
    unique: true,
    fields: [
     { name: "name" },
    ]
   },
   {
    name: "permissions_pkey",
    unique: true,
    fields: [
     { name: "id" },
    ]
   },
  ]
 });
};