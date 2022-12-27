const Router = require('express');
const router = Router();
const APPTranslate = require('../../controllers/admin/c_translate');

const check_role = require('../../middleware/role_checking_middleware');

router.get('/', APPTranslate.getAll);
router.get('/:id', check_role({permission: "translate.view"}), APPTranslate.getOneById);
router.post('/', check_role({permission: "translate.view"}), APPTranslate.getByOffset);

router.post('/add', check_role({permission: "translate.edit"}), APPTranslate.addTranslate);
router.put('/:id', check_role({permission: "translate.edit"}), APPTranslate.updateTranslate);
router.delete('/:id', check_role({permission: "translate.delete"}), APPTranslate.deleteTranslate);

module.exports = router;
