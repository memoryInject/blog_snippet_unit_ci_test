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

router.route('/').get(getUsers).post(registerUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
