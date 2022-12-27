const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('sp_section', {
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
  name_ru: {
   type: DataTypes.STRING(150),
   allowNull: true
  },
  name_uz: {
   type: DataTypes.STRING(150),
   allowNull: true
  },
  name_uzl: {
   type: DataTypes.STRING(150),
   allowNull: true
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
  tableName: 'sp_section',
  schema: 'public',
  timestamps: true,
  indexes: [{
   name: "sp_section_pkey",
   unique: true,
   fields: [
    { name: "id" },
   ]
  }, ]
 });
};