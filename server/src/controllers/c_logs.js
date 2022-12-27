const { user_logs: model } = require('../models/init-models');
const ControllerTmp = require('./template');
const ControllerTemplate = new ControllerTmp({defaultOrder: [['id', 'ASC']] });

class Logs {
  async getAll(req, res, next) {
    ControllerTemplate.getAll(model, req, res, next);
  }
  async getOneById(req, res, next) {
    ControllerTemplate.getOneById(model, req, res, next);
  }
  async getByOffset(req, res, next) {
    ControllerTemplate.getByOffset(model, req, res, next);
  }

  async addLogs(req, res, next) {
    ControllerTemplate.addData(model, req, res, next);
  }

  async updateLogs(req, res, next) {
    ControllerTemplate.updateData(model, req, res, next);
  }

  async deleteLogs(req, res, next) {
    ControllerTemplate.deleteData(model, req, res, next);
  }

}

module.exports = new Logs();