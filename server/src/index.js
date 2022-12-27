require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const routes = require('./routes');
const errorHandling = require('./middleware/error_handling');
const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(errorHandling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); //{ alter: true }
    await sequelize.initData();
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
