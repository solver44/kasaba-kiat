const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('dy_class_name', {
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
  class_name: {
   type: DataTypes.TEXT,
   allowNull: false,
   unique: "dy_class_name_class_name_key"
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
  label: {
   type: DataTypes.TEXT,
   allowNull: true
  }
 }, {
  sequelize,
  tableName: 'dy_class_name',
  schema: 'public',
  timestamps: true,
  indexes: [{
    name: "dy_class_name_class_name_key",
    unique: true,
    fields: [
     { name: "class_name" },
    ]
   },
   {
    name: "dy_class_name_pkey",
    unique: true,
    fields: [
     { name: "id" },
    ]
   },
  ]
 });
};