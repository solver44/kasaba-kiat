const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../db');

const _permissions = require('./permissions');
const _role_permission = require('./role_permission');
const _roles = require('./roles');
const _dy_class_name = require('./dy_class_name');
const _dy_section = require('./dy_section');
const _app_translate = require('./app_translate');
const _user_actions = require('./user_actions');
const _user_activity = require('./user_activity');
const _users = require('./users');
const _users_roles = require('./users_roles');
const _user_logs = require('./user_logs');

const users = _users(sequelize, DataTypes);
const user_logs = _user_logs(sequelize, DataTypes);
const user_actions = _user_actions(sequelize, DataTypes);
const user_activity = _user_activity(sequelize, DataTypes);
const roles = _roles(sequelize, DataTypes);
const users_roles = _users_roles(sequelize, DataTypes);
const permissions = _permissions(sequelize, DataTypes);
const role_permission = _role_permission(sequelize, DataTypes);
const app_translate = _app_translate(sequelize, DataTypes);
const dy_class_name = _dy_class_name(sequelize, DataTypes);
const dy_section = _dy_section(sequelize, DataTypes);

permissions.belongsToMany(roles, {
  through: 'role_permission',
  foreignKey: 'permission_id'
});
roles.belongsToMany(permissions, {
  through: 'role_permission',
  foreignKey: 'role_id'
});

roles.belongsToMany(users, { through: 'users_roles', foreignKey: 'role_id' });
users.belongsToMany(roles, {
  through: 'users_roles',
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

user_actions.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
users.hasMany(user_actions, { as: 'user_actions', foreignKey: 'user_id' });

user_activity.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
users.hasMany(user_activity, { as: 'user_activities', foreignKey: 'user_id' });

user_logs.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
users.hasMany(user_logs, { as: 'user_logs', foreignKey: 'user_id' });

module.exports = {
  permissions,
  role_permission,
  roles,
  dy_class_name,
  dy_section,
  app_translate,
  user_actions,
  user_activity,
  users,
  user_logs,
  users_roles
};
