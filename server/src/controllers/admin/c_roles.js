const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ApiError = require('../../error/api_error');
const {
  roles: model,
  role_permission,
  permissions
} = require('../../models/init-models');

const ControllerTemplate = require('../template');

const INCLUDE = [
  {
    model: permissions,
    where: { trash: false },
    // required: true,
    attributes: ['id', ['name', 'name']]
  }
];

class Roles {
  async getAll(req, res, next) {
    try {
      const result = await model.findAll({
        where: {
          trash: false
        }
      });
      res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
  async getOneById(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const result = await model.findOne({
        include: INCLUDE,
        where: { id }
      });
      res.json(result);
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
  async getByOffset(req, res, next) {
    try {
      const { offset, limit, columns, searchText, trash } = req.body;

      const result = !searchText
        ? await model.findAndCountAll({
            include: INCLUDE,
            order: [['id', 'ASC']],
            where: {
              trash
            },
            offset: offset,
            limit: limit,
            distinct: true
          })
        : await model.findAndCountAll({
            distinct: true,
            include: INCLUDE,
            order: [['id', 'ASC']],
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

  async addData(req, res, next) {
    let role;
    try {
      const { data } = req.body;
      const { permissions, ...dataBody } = data;
      dataBody.version = process.env.APP_VERSION;

      role = (await model.create(dataBody)).dataValues;
      await role_permission.bulkCreate(
        permissions.map((permissionId) => {
          return { role_id: role.id, permission_id: permissionId };
        })
      );

      res.json('created-successfully');
    } catch (e) {
      if (role?.id) {
        await role.destroy();
      }
      next(ApiError.badRequest(e));
    }
  }

  async updateData(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const { data } = req.body;
      let { permissions, ...dataBody } = data;

      if (data?.trash === false && !permissions) {
        await model.update(dataBody, { where: { id } });

        res.json('updated-successfully');
        return;
      }

      if(!permissions)
        throw Error('try_again');
      if (
        typeof permissions[0] === 'object' &&
        !Array.isArray(permissions[0]) &&
        permissions[0] !== null
      ) {
        permissions = permissions.map((i) => i.id);
      }

      await model.update(dataBody, { where: { id } });

      await role_permission.destroy({ where: { role_id: id } });
      await role_permission.bulkCreate(
        permissions.map((permissionId) => {
          return { role_id: id, permission_id: permissionId };
        })
      );

      res.json('updated-successfully');
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }

  async deleteData(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      await model.update({ trash: true }, { where: { id } });

      res.json('deleted-successfully');
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }

  async fullDeleteData(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      await model.destroy({ where: { id } });

      res.json('full-deleted-successfully');
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
}

const getPermissionByRoleId = async (id) => {
  const result = await model.findOne({
    include: INCLUDE,
    where: { id }
  });

  return result;
};

module.exports = new Roles();
module.exports.getPermissionByRoleId = getPermissionByRoleId;
