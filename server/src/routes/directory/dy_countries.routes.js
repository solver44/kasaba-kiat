const Router = require('express');
const DYCountries = require('../../controllers/directory/c_dy_countries');
const router = Router();

router.get('/', DYCountries.getAll);
router.get('/:id', DYCountries.getOneById);
router.post('/', DYCountries.getByOffset);

router.post('/add', DYCountries.addSection);
router.put('/:id', DYCountries.updateSection);
router.delete('/:id', DYCountries.deleteSection);

module.exports = router;