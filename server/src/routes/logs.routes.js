const Router = require('express');
const Logs = require('../controllers/c_logs');
const router = Router();

router.get('/', Logs.getAll);
router.get('/:id', Logs.getOneById);
router.post('/', Logs.getByOffset);

router.post('/add', Logs.addLogs);
router.put('/:id', Logs.updateLogs);
router.delete('/:id', Logs.deleteLogs);

module.exports = router;