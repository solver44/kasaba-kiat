var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ApiError = require('../error/api_error');

class ControllerTemplate {
  constructor({ defaultOrder }) {
    this.defaultOrder = defaultOrder;
  }

  // *GET data
  async getAll(model, req, res, next) {
    try {
      const result = await model.findAll({
        where: {
          trash: false
        },
        // order: this.defaultOrder
        order: [['createdAt', 'DESC']]
      });
      res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
  async getOneById(model, req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const result = await model.findOne({
        where: { id }
      });
      res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
  async getByOffset(model, req, res, next) {
    try {
      const { offset, limit, columns, searchText, trash } = req.body;

      const result = !searchText
        ? await model.findAndCountAll({
            order: this.defaultOrder ?? [['createdAt', 'DESC']],
            where: {
              trash
            },
            offset: offset,
            limit: limit
          })
        : await model.findAndCountAll({
            order: this.defaultOrder ?? [['createdAt', 'DESC']],
            where: {
              trash,
              [Op.or]: columns.map((col, i) =>
                Sequelize.literal(
                  `"${col}"::text LIKE '${
                    col.includes('id') ? `${searchText}%` : `%${searchText}%`
                  }'`
                )
              )
            },
            offset: offset,
            limit: limit
          });
      res.json({ count: result.count, rows: result.rows });
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }

  // *SET data
  async deleteData(model, req, res, next) {
    try {
      const { id } = req.params;
      const { full } = req.query;

      if (+full) await model.destroy({ where: { id } });
      else await model.update({ trash: true }, { where: { id } });

      res.json('deleted-successfully');
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }

  async addData(model, req, res, next) {
    try {
      const { data } = req.body;
      data.version = process.env.APP_VERSION;

      await model.create(data);
      res.json('created-successfully');
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }

  async updateData(model, req, res, next) {
    try {
      const id = req.params.id;
      const { data } = req.body;

      const result = await model.update(data, { where: { id } });

      if (result[0] === 0) res.json('not-found');
      else res.json('updated-successfully');
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
}

module.exports = ControllerTemplate;
