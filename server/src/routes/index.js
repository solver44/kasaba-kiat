const Router = require('express');
const router = Router();

const user = require('./admin/user.routes');
const dy_sections = require('./directory/dy_section.routes');
const app_translate = require('./admin/app_translate.routes');
const logs = require('./logs.routes');
const roles = require('./admin/roles.routes');
const permissions = require('./admin/permissions.routes');

router.use('/dy/section', dy_sections);
router.use('/app/translate', app_translate);

router.use('/user', user);
router.use('/logs', logs);
router.use('/roles', roles);
router.use('/permissions', permissions);

module.exports = router;