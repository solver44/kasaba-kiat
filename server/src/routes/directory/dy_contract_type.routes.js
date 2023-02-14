const Router = require('express');
const DYConstarct = require('../../controllers/directory/c_dy_contract_type');
const router = Router();

router.get('/', DYConstarct.getAll);
router.get('/:id', DYConstarct.getOneById);
router.post('/', DYConstarct.getByOffset);

router.post('/add', DYConstarct.addSection);
router.put('/:id', DYConstarct.updateSection);
router.delete('/:id', DYConstarct.deleteSection);

module.exports = router;