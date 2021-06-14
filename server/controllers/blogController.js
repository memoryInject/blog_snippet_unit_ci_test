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

// @dec get blogs by created user
// @route PUT /api/blogs/user
// @access Private
const getBolgsByUser = asyncHandler(async (req, res) => {
  const blogs = await BlogRepo.getBlogsbyUser(req.user.id);
  if (blogs) {
    res.json(blogs);
  } else {
    res.status(404);
    throw new Error('Blog(s) not found');
  }
});

// @dec Create a single blog
// @route POST /api/blogs/
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  req.body.user_id = req.user.id;

  const blog = await BlogRepo.insertBlog(req.body);

  if (blog) {
    res.json(blog);
  } else {
    res.status(500);
    throw new Error('Blog can not create');
  }
});

// @dec update a single blog
// @route PUT /api/blogs/:id
// @access Private
const updateBlog = asyncHandler(async (req, res) => {
  let blog = await BlogRepo.getBlogByIdWithUser(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog does not exists');
  }

  if (blog.userId === req.user.id || req.user.email === process.env.ADMIN) {
    blog = await BlogRepo.updateBlog(req.params.id, req.body);
  } else {
    res.status(403);
    throw new Error('Blog can not update');
  }

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
  let blog = await BlogRepo.getBlogByIdWithUser(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog does not exists');
  }

  if (blog.userId === req.user.id || req.user.email === process.env.ADMIN) {
    blog = await BlogRepo.deleteBlogById(req.params.id);
  } else {
    res.status(403);
    throw new Error('Blog can not delete');
  }

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog can not delete');
  }
});

module.exports = {
  getBlogs,
  getBlogById,
  getBolgsByUser,
  createBlog,
  updateBlog,
  deleteBlog,
};
