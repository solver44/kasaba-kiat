const Router = require('express');
const router = Router();
const Roles = require('../../controllers/admin/c_roles');

router.get('/', Roles.getAll);
router.get('/:id', Roles.getOneById);
router.post('/', Roles.getByOffset);

router.post('/add', Roles.addData);
router.put('/:id', Roles.updateData);
router.delete('/:id', Roles.deleteData);

module.exports = router;