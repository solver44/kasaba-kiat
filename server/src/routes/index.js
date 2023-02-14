const Router = require('express');
const router = Router();

const user = require('./admin/user.routes');
const dy_sections = require('./directory/dy_section.routes');
const dy_countries = require('./directory/dy_countries.routes');
const dy_coato = require('./directory/dy_coato.routes');
const dy_okonx = require('./directory/dy_okonx.routes');
const dy_form_of_ownership = require('./directory/dy_form_of_ownership.routes');
const dy_networks = require('./directory/dy_networks.routes');
const dy_type_of_organization =require('./directory/dy_type_of_organization.routes');
const app_translate = require('./admin/app_translate.routes');
const logs = require('./logs.routes');
const roles = require('./admin/roles.routes');
const permissions = require('./admin/permissions.routes');
const dy_opf = require('./directory/dy_opf.routes');
const dy_soogu = require('./directory/dy_soogu.routes');
const dy_engine_group = require('./directory/dy_engine_group.routes');
const dy_contract_type = require('./directory/dy_contract_type.routes');
const dy_type_of_documents = require('./directory/dy_type_of_documents.routes');

router.use('/dy/section', dy_sections);
router.use('/dy/countries', dy_countries);
router.use('/dy/coato', dy_coato);
router.use('/dy/okonx', dy_okonx);
router.use('/dy/opf', dy_opf);
router.use('/dy/form_of_ownership', dy_form_of_ownership);
router.use('/dy/networks', dy_networks);
router.use('/dy/type_of_organization', dy_type_of_organization);
router.use('/dy/soogu', dy_soogu);
router.use('/dy/engine_group', dy_engine_group);
router.use('/dy/contract_type', dy_contract_type);
router.use('/dy/type_of_documents', dy_type_of_documents);
router.use('/app/translate', app_translate);

router.use('/user', user);
router.use('/logs', logs);
router.use('/roles', roles);
router.use('/permissions', permissions);

module.exports = router;