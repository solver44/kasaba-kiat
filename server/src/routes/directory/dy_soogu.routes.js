const Router = require('express');
const DY = require('../../controllers/directory/c_dy_soogu');
const router = Router();

router.get('/', DY.getAll);
router.get('/:id', DY.getOneById);
router.post('/', DY.getByOffset);

router.post('/add', DY.addSection);
router.put('/:id', DY.updateSection);
router.delete('/:id', DY.deleteSection);

module.exports = router;
