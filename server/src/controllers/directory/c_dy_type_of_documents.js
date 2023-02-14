const { dy_type_of_documents: model } = require('../../models/init-models');

const ControllerTmp = require('../template');
const ControllerTemplate = new ControllerTmp({
  defaultOrder: [['createdAt', 'DESC']]
});

class DYDocument {
  async getAll(req, res, next) {
    ControllerTemplate.getAll(model, req, res, next);
  }
  async getOneById(req, res, next) {
    ControllerTemplate.getOneById(model, req, res, next);
  }
  async getByOffset(req, res, next) {
    ControllerTemplate.getByOffset(model, req, res, next);
  }

  async addSection(req, res, next) {
    ControllerTemplate.addData(model, req, res, next);
  }

  async updateSection(req, res, next) {
    ControllerTemplate.updateData(model, req, res, next);
  }

  async deleteSection(req, res, next) {
    ControllerTemplate.deleteData(model, req, res, next);
  }
}

module.exports = new DYDocument();
