const jwt = require('jsonwebtoken');
const User = require('./models/User');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded // Assuming the payload contains the user ID
   
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
};

module.exports = { authenticate };
