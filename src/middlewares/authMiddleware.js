const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // Decoded and verify the token
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await Users.findById(decoded.userId);
    // Check if the saved token matches with used on the request
    if (token !== user.token) {
      throw new Error('Invalid token');
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorize',
      data: error.toString(),
    });
  }
};

module.exports = checkAuth;
