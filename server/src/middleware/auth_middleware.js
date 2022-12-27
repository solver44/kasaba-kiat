const jwebtoken = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwebtoken.verify(token, process.env.SECRET_KEY);
    if (!decoded.email) throw Error('error');

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
