const Router = require('express');
const DYSection = require('../../controllers/directory/c_dy_section');
const router = Router();

router.get('/', DYSection.getAll);
router.get('/:id', DYSection.getOneById);
router.post('/', DYSection.getByOffset);

router.post('/add', DYSection.addSection);
router.put('/:id', DYSection.updateSection);
router.delete('/:id', DYSection.deleteSection);

module.exports = router;
