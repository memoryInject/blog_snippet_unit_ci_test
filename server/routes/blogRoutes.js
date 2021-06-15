const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');

const {
  getBlogs,
  getBlogById,
  getBolgsByUser,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.get('/user', protect, getBolgsByUser);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

// TEST ONLY
router.get(
  '/test',
  asyncHandler(async (req, res) => {
    const filter = {
      columns: ['content'],
      type: 'invert',
    };

    const condition = {
      column: 'id',
      value: '8',
      cmp: 'lt',
    };

    const limiter = {
      limit: 4,
      offset: 0,
    };

    const join = {
      tableName: 'users',
      foreignKey: 'user_id',
      columns: ['username'],
    };

    const test = await BlogRepo.find(filter, condition, limiter, join);

    if (test) {
      res.send(test);
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  })
);

module.exports = router;
