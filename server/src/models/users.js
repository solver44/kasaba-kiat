const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('users', {
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
  username: {
    type: DataTypes.STRING(150),
    allowNull: true,
    unique: "users_username_key"
   },
  email: {
   type: DataTypes.STRING(150),
   allowNull: false,
   unique: "users_email_key"
  },
  password: {
   type: DataTypes.STRING(255),
   allowNull: false
  },
  language: {
   type: DataTypes.STRING(6),
   allowNull: false,
   defaultValue: "uz"
  },
  is_super_admin: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false
  },
  account_expired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   },
   account_locked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   },
  is_active: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: true
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
   },
 }, {
  sequelize,
  tableName: 'users',
  schema: 'public',
  timestamps: true,
  indexes: [{
    name: "users_email_key",
    unique: true,
    fields: [
     { name: "email" },
    ]
   },
   {
    name: "users_pkey",
    unique: true,
    fields: [
     { name: "id" },
    ]
   },
   {
    name: "users_username_key",
    unique: true,
    fields: [
     { name: "username" },
    ]
   },
  ]
 });
};