const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('role_permission', {
  permission_id: {
   type: DataTypes.BIGINT,
   allowNull: false,
   references: {
    model: 'permissions',
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
  tableName: 'role_permission',
  schema: 'public',
  timestamps: true
 });
};