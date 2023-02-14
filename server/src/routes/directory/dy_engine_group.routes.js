const Router = require('express');
const DYEngine = require('../../controllers/directory/c_dy_engine_group');
const router = Router();

router.get('/', DYEngine.getAll);
router.get('/:id', DYEngine.getOneById);
router.post('/', DYEngine.getByOffset);

router.post('/add', DYEngine.addSection);
router.put('/:id', DYEngine.updateSection);
router.delete('/:id', DYEngine.deleteSection);

module.exports = router;