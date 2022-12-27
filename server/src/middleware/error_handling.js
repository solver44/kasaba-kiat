const ApiError = require('../error/api_error');

module.exports = function(err, req, res, next) {
 if (err instanceof ApiError) {
  return res.status(err.status).json({ error: err.message });
 }
 return res.status(500).json({ message: 'error invalid' });
}