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

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/').get(protect, admin, getUsers).post(registerUser);

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
