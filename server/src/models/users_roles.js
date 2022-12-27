const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('users_roles', {
  user_id: {
   type: DataTypes.BIGINT,
   allowNull: false,
   references: {
    model: 'users',
    key: 'id'
   }
  },
  role_id: {
   type: DataTypes.BIGINT,
   allowNull: false,
   references: {
    model: 'roles',
    key: 'id'
   }
  }
 }, {
  sequelize,
  tableName: 'users_roles',
  schema: 'public',
  timestamps: true,
 });
};