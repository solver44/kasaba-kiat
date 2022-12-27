const jwebtoken = require('jsonwebtoken');
const c_user = require('../controllers/admin/c_user');
const c_permission = require('../controllers/admin/c_permissions');

module.exports = function ({ permission = 'not passed', role = 'not passed' }) {
  return async function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    if (permission !== 'not passed') {
      try {
        await c_permission.addDataIn({ name: permission });
      } catch (error) {}
    }

    try {
      const token = req?.headers?.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const decoded = jwebtoken.verify(token, process.env.SECRET_KEY);
      if (!decoded?.is_super_admin) {
        const user = await c_user.find_user('', decoded.id);
        if (!user?.is_super_admin) {
          const other = user?.account_locked || user?.account_expired;
          const isEqual =
            decoded?.roles[0] !== role &&
            !decoded?.permissions?.includes(permission);

          if (isEqual || other) {
            return res.status(403).json({ error: 'No access' });
          }
        }
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};
