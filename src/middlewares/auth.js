const jwt = require('jsonwebtoken')
const ExpressError = require('../utils/ExpressError')

const authenticateUser = (req) => {
    return new Promise((resolve, reject) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ExpressError(
			'Authentifizierungstoken nicht gefunden',
			400,
		)
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        reject(new ExpressError('Ungültiges Authentifizierungstoken', 401));
        }
        resolve(decoded);
      });
    });
  };

  module.exports = authenticateUser