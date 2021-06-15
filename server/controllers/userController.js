const asyncHandler = require('express-async-handler');

const generateToken = require('../utils/generateToken');
const UserRepo = require('../repos/UserRepo');

// @dec register a user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const userExists = await UserRepo.getUserByEmail(req.body.email);
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await UserRepo.createUser(req.body);
  if (user) {
    user.token = generateToken(user.id);
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @dec     Authenticate user
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const user = await UserRepo.authUser(req.body);
  if (user) {
    const token = generateToken(user.id);
    user.token = token;
    res.cookie('token', token);
    res.json(user);
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @dec     Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // If the user exists, the user profile will comes with authMiddlware
  if (req.user) {
    delete req.user.password;
    res.json(req.user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @dec     Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Remove if the incoming password is empty
  if (req.body.password === '') {
    delete req.body.password;
  }

  // If the user exists, the user profile will comes with authMiddlware
  if (req.user) {
    const user = await UserRepo.updateUser(req.user.id, req.body);

    if (user) {
      delete user.password;

      const token = generateToken(user.id);
      user.token = token;

      res.json(user);
    } else {
      res.status(404);
      throw new Error('User do not update');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @dec Fetch all users
// @route GET /api/users
// @access Private Admin Only
const getUsers = asyncHandler(async (req, res) => {
  const users = await UserRepo.getAllUsers();
  res.json(users);
});

// @dec Fetch a single user
// @route GET /api/users/:id
// @access Private Admin Only
const getUserById = asyncHandler(async (req, res) => {
  const user = await UserRepo.getUserById(req.params.id, {
    columns: ['password'],
    type: 'invert',
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ msg: 'User not found' });
  }
});

// @dec update a user
// @route PUT /api/users/id
// @access Private Admin Only
const updateUser = asyncHandler(async (req, res) => {
  const user = await UserRepo.updateUser(req.params.id, req.body);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @dec delte a user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserRepo.deleteUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
