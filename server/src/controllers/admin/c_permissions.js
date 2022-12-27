const { permissions: model } = require('../../models/init-models');
const ControllerTmp = require('../template');
const ControllerTemplate = new ControllerTmp({defaultOrder: [['name', 'ASC']] });

class Permissions {
  async getAll(req, res, next) {
    ControllerTemplate.getAll(model, req, res, next);
  }
  async getOneById(req, res, next) {
    ControllerTemplate.getOneById(model, req, res, next);
  }
  async getByOffset(req, res, next) {
    ControllerTemplate.getByOffset(model, req, res, next);
  }

  async addData(req, res, next) {
    ControllerTemplate.addData(model, req, res, next);
  }

  async updateData(req, res, next) {
    ControllerTemplate.updateData(model, req, res, next);
  }

  async deleteData(req, res, next) {
    ControllerTemplate.deleteData(model, req, res, next);
  }
}

const addDataIn = async (data) => {
  data.version = process.env.APP_VERSION;
  if (!(await model.findOne({ where: { name: data.name } })))
    await model.create(data);
};

module.exports = new Permissions();
module.exports.addDataIn = addDataIn;
