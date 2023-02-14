const Router = require('express');
const DYCoato = require('../../controllers/directory/c_dy_coato');
const router = Router();

router.get('/', DYCoato.getAll);
router.get('/:id', DYCoato.getOneById);
router.post('/', DYCoato.getByOffset);

router.post('/add', DYCoato.addSection);
router.put('/:id', DYCoato.updateSection);
router.delete('/:id', DYCoato.deleteSection);

module.exports = router;