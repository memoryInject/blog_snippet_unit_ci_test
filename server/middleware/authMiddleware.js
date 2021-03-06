const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const UserRepo = require('../repos/UserRepo');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserRepo.findById(decoded.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user.email === process.env.ADMIN) {
    next();
  } else {
    res.status(401);
    throw new Error('Admin only access!');
  }
});

module.exports = { protect, admin };
