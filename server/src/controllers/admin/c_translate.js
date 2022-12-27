var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ApiError = require("../../error/api_error");
const { app_translate: model } = require('../../models/init-models');

class APPTranslate {
 async getAll(req, res, next) {
  try {
   const result = await model.findAll({
    attributes: ['id', 'name', "translate_ru", "translate_uz", "translate_uzl"],
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

    const result = !searchText ?
     await model.findAndCountAll({
      order: [
       ['id', 'ASC']
      ],
      where: {
       trash
      },
      offset: offset,
      limit: limit
     }) :
     await model.findAndCountAll({

       order: [
        ['id', 'ASC']
       ],
       where: {
        trash,
        [Op.or]: columns.map((col, i) => Sequelize.literal(`"${col}"::text LIKE '${ col.includes('id') ? `${searchText}%` : `%${searchText}%`}'`))
     },
     offset: offset,
     limit: limit
    });
   res.json({ count: result.count, rows: result.rows });
  } catch (e) {
   next(ApiError.badRequest(e));
  }
 }

 async addTranslate(req, res, next) {
  try {
    const { data } = req.body;
    data.version = process.env.APP_VERSION;

    await model.create(data);
    res.json('created-successfully');
  } catch (e) {
   next(ApiError.badRequest(e));
  }
 }

 async updateTranslate(req, res, next) {
  try {
    const id = req.params.id;
    const { data } = req.body;

    const result = await model.update(
    data,
    {where: { id }}
    );

    if(result[0] === 0)
      res.json('not-found');
    else
      res.json('updated-successfully');
  } catch (e) {
   next(ApiError.badRequest(e));
  }
 }

 async deleteTranslate(req, res, next) {
   try {
    const id = parseInt(req.params.id);
    
    await model.update(
      {trash: true},
      {where: { id }}
    );
    
    res.json('deleted-successfully');
  } catch (e) {
   next(ApiError.badRequest(e));
  }
 }

 async fullDeleteData(req, res, next) {
  try {
   const id = parseInt(req.params.id);
   
   await model.destroy(
     {where: { id }}
   );
   
   res.json('full-deleted-successfully');
 } catch (e) {
  next(ApiError.badRequest(e));
 }
}

}

module.exports = new APPTranslate();