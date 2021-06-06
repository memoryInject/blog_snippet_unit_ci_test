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

// @dec creata a user
// @route POST /api/users
// @access Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const users = await UserRepo.createUser(req.body);
    res.json(users);
  })
);

// @dec update a user
// @route PUT /api/users/id
// @access Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const users = await UserRepo.updateUser(req.params.id, req.body);
    res.json(users);
  })
);

// @dec delte a user
// @route DELETE /api/users/:id
// @access Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const users = await UserRepo.deleteUser(req.params.id);
    res.json(users);
  })
);

module.exports = router;
