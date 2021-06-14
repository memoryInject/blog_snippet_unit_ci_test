const express = require('express');

const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,

  updateUser,
  deleteUser,
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/').get(protect, getUsers).post(registerUser);

router
  .route('/:id')
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
