const express = require('express');
const asyncHandler = require('express-async-handler');

const UserRepo = require('../repos/UserRepo');

const router = express.Router();

// @dec Fetch all users
// @route GET /api/users
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await UserRepo.getAllUsers();
    res.json(users);
  })
);

// @dec Fetch a single user
// @route GET /api/users/:id
// @access Private
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await UserRepo.getUserById(req.params.id, {
      columns: ['password'],
      type: 'invert',
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  })
);

module.exports = router;
