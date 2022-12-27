const { Sequelize } = require('sequelize');
const permissions = require('./models/permissions');
const roles = require('./models/roles');
const users = require('./models/users');

module.exports = !process.env.DB_URL
  ? new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false
    })
  : new Sequelize(process.env.DB_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });

module.exports.initData = async function () {};
