module.exports = function(sequelize, DataTypes) {
 return sequelize.define('user_logs', {
  id: {
   autoIncrement: true,
   type: DataTypes.BIGINT,
   allowNull: false,
   primaryKey: true
  },
  user_id: {
   type: DataTypes.BIGINT,
   allowNull: false,
   references: {
    model: 'users',
    key: 'id'
   }
  },
  version: {
   type: DataTypes.STRING(10),
   allowNull: true
  },
  title: {
   type: DataTypes.TEXT,
   allowNull: false
  },
  body: {
   type: DataTypes.TEXT,
   allowNull: true
  },
  type: {
   type: DataTypes.STRING(10),
   allowNull: true
  }
 }, {
  sequelize,
  tableName: 'user_logs',
  schema: 'public',
  timestamps: true,
  indexes: [{
   name: "user_logs_pkey",
   unique: true,
   fields: [
    { name: "id" },
   ]
  }, ]
 });
};