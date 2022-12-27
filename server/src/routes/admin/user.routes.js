const Router = require('express');
const router = Router();
const UserController = require('../../controllers/admin/c_user');

const auth_middleware = require('../../middleware/auth_middleware');
const check_role = require('../../middleware/role_checking_middleware');


router.post('/registration', check_role({permission: "user.edit"}), UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', auth_middleware, UserController.check);
router.get('/language/:id', UserController.setLanguage);

router.put('/:id',  check_role({permission: "user.edit"}), UserController.updateData);
router.post('/all', check_role({permission: "user.view"}), UserController.getByOffset);
router.get('/:id',  check_role({permission: "user.view"}), UserController.getOneById);
router.delete('/:id', check_role({permission: "user.delete"}), UserController.fullDeleteData);

module.exports = router;