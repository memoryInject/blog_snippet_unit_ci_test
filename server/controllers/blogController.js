const asyncHandler = require('express-async-handler');

const BlogRepo = require('../repos/BlogRepo');

// @dec Fetch all blogs
// @route GET /api/blogs
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await BlogRepo.getAllBlogsWithUser();

  res.json(blogs);
});

// @dec Fetch a single blog
// @route GET /api/blogs/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogRepo.getBlogByIdWithUser(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @dec Create a single blog
// @route POST /api/blogs/
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  const blog = await BlogRepo.insertBlog(req.body);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog can not create');
  }
});

// @dec update a single blog
// @route PUT /api/blogs/:id
// @access Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await BlogRepo.updateBlog(req.params.id, req.body);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog can not update');
  }
});

// @dec delete a single blog
// @route DELETE /api/blogs/:id
// @access Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogRepo.deleteBlogById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog can not update');
  }
});

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
