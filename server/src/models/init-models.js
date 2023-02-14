const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../db');

const _permissions = require('./permissions');
const _role_permission = require('./role_permission');
const _roles = require('./roles');
const _dy_class_name = require('./dy_class_name');
const _dy_section = require('./dy_section');
const _dy_countries = require('./dy_countries');
const _dy_coato = require('./dy_coato');
const _dy_okonx = require('./dy_okonx');
const _dy_opf = require('./dy_opf');
const _dy_form_of_ownership = require('./dy_form_of_ownership');
const _dy_networks = require('./dy_networks');
const _dy_type_of_organization = require('./dy_type_of_organization');
const _dy_soogu = require('./dy_soogu');
const _dy_engine_group = require('./dy_engine_group');
const _dy_contract_type = require('./dy_contract_type');
const _dy_sp_type_of_documents = require('./dy_type_of_documents')
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
const dy_countries = _dy_countries(sequelize, DataTypes);
const dy_coato = _dy_coato(sequelize, DataTypes);
const dy_okonx = _dy_okonx(sequelize, DataTypes);
const dy_form_of_ownership = _dy_form_of_ownership(sequelize, DataTypes);
const dy_networks = _dy_networks(sequelize, DataTypes);
const dy_type_of_organization = _dy_type_of_organization(sequelize, DataTypes);
const dy_opf = _dy_opf(sequelize, DataTypes);
const dy_soogu = _dy_soogu(sequelize, DataTypes);
const dy_engine_group = _dy_engine_group(sequelize, DataTypes);
const dy_contract_type = _dy_contract_type(sequelize,DataTypes);
const dy_type_of_documents = _dy_sp_type_of_documents(sequelize,DataTypes);

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
  dy_countries,
  dy_coato,
  dy_okonx,
  dy_opf,
  dy_form_of_ownership,
  dy_networks,
  dy_type_of_organization,
  dy_soogu,
  dy_engine_group,
  dy_contract_type,
  dy_type_of_documents,
  app_translate,
  user_actions,
  user_activity,
  users,
  user_logs,
  users_roles
};
