const express = require('express');
const asyncHandler = require('express-async-handler');

const BlogRepo = require('../repos/BlogRepo');

const router = express.Router();

// @dec Fetch all blogs
// @route GET /api/blogs
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const blogs = await BlogRepo.getAllBlogsWithUser();

    res.json(blogs);
  })
);

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

// @dec Fetch a single blog
// @route GET /api/blogs/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const blog = await BlogRepo.getBlogByIdWithUser(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
  })
);

// @dec Create a single blog
// @route POST /api/blogs/
// @access Private
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const blog = await BlogRepo.insertBlog(req.body);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Blog can not create');
    }
  })
);

// @dec update a single blog
// @route PUT /api/blogs/:id
// @access Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const blog = await BlogRepo.updateBlog(req.params.id, req.body);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Blog can not update');
    }
  })
);

// @dec delete a single blog
// @route DELETE /api/blogs/:id
// @access Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const blog = await BlogRepo.deleteBlogById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error('Blog can not update');
    }
  })
);

module.exports = router;
