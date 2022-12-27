const Router = require('express');
const router = Router();
const Permissions = require('../../controllers/admin/c_permissions');

const check_role = require('../../middleware/role_checking_middleware');

router.get('/', check_role({permission: "permissions.view"}), Permissions.getAll);
router.get('/:id', Permissions.getOneById);
router.post('/', Permissions.getByOffset);

router.post('/add',   check_role({permission: "permissions.edit"}), Permissions.addData);
router.put('/:id',    check_role({permission: "permissions.edit"}), Permissions.updateData);
router.delete('/:id', check_role({permission: "permissions.delete"}), Permissions.deleteData);

module.exports = router;