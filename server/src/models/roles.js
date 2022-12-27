const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('roles', {
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
   unique: "roles_name_key"
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
  tableName: 'roles',
  schema: 'public',
  timestamps: true,
  indexes: [{
    name: "roles_name_key",
    unique: true,
    fields: [
     { name: "name" },
    ]
   },
   {
    name: "roles_pkey",
    unique: true,
    fields: [
     { name: "id" },
    ]
   },
  ]
 });
};