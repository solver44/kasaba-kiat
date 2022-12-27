const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('app_translate', {
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
   unique: "app_translate_name_key"
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
  },
  trash: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false
  }
 }, {
  sequelize,
  tableName: 'app_translate',
  schema: 'public',
  timestamps: true,
  indexes: [{
    name: "app_translate_name_key",
    unique: true,
    fields: [
     { name: "name" },
    ]
   },
   {
    name: "app_translate_pkey",
    unique: true,
    fields: [
     { name: "id" },
    ]
   },
  ]
 });
};