const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.HASH_KEY);
    req.userData = decoded;
    next();
  } catch(err) {
    res.json({msg: 'Authentication Failed'});
  }
} 