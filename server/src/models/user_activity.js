const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('user_activity', {
  id: {
   autoIncrement: true,
   type: DataTypes.BIGINT,
   allowNull: false,
   primaryKey: true
  },
  last_logged: {
   type: DataTypes.DATE,
   allowNull: true
  },
  last_logged_id: {
   type: DataTypes.BIGINT,
   allowNull: false,
   unique: "user_activity_last_logged_id_key"
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
  tableName: 'user_activity',
  schema: 'public',
  timestamps: true,
  indexes: [{
    name: "user_activity_last_logged_id_key",
    unique: true,
    fields: [
     { name: "last_logged_id" },
    ]
   },
   {
    name: "user_activity_pkey",
    unique: true,
    fields: [
     { name: "id" },
    ]
   },
  ]
 });
};