const request = require('supertest');

const app = require('../../app');
const BlogRepo = require('../../repos/BlogRepo');
const UserRepo = require('../../repos/UserRepo');
const Context = require('../context');

let context;
let user;
let blog;

beforeAll(async () => {
  process.env.JWT_SECRET = 'abc1234';
  process.env.ADMIN = 'admin@example.com';

  context = await Context.build();

  user = {
    username: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  };
});

beforeEach(async () => {
  blog = {
    title: 'Test title',
    content: 'Test content',
    user_id: '',
  };
  await context.reset();
});

afterAll(() => {
  return context.close();
});

it('can create a user and add a blog', async () => {
  // Create a user
  const {
    body: { id, token },
  } = await request(app()).post('/api/users').send(user);

  // Create a blog
  blog.user_id = id;

  const {
    body: { title },
  } = await request(app())
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog);
  expect(title).toEqual(blog.title);
});

it('can check a blog by id', async () => {
  // Create a user
  const {
    body: { id, token },
  } = await request(app()).post('/api/users').send(user);

  // Create a blog
  blog.user_id = id;

  const {
    body: { id: newBlogId },
  } = await request(app())
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog);

  // Check the blog
  const {
    body: { id: blogId },
  } = await request(app()).get(`/api/blogs/${newBlogId}`);

  expect(blogId).toEqual(newBlogId);
});

it('can update a blog', async () => {
  // Create a user
  const {
    body: { id, token },
  } = await request(app()).post('/api/users').send(user);

  // Create a blog
  blog.user_id = id;

  const {
    body: { id: blogId },
  } = await request(app())
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog);

  // Update blog
  const {
    body: { title },
  } = await request(app())
    .put(`/api/blogs/${blogId}`)
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'update title',
      content: 'update content',
    });

  expect(title).toEqual('update title');
});

it('can delete a blog', async () => {
  // Create a user
  const {
    body: { id, token },
  } = await request(app()).post('/api/users').send(user);

  // Create a blog
  blog.user_id = id;

  const {
    body: { id: newBlogId },
  } = await request(app())
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog);

  // Delete a blog
  const {
    body: { id: blogId },
  } = await request(app())
    .delete(`/api/blogs/${newBlogId}`)
    .set('Authorization', 'Bearer ' + token);
  expect(newBlogId).toEqual(blogId);
});

it('can get all blogs by user', async () => {
  // Create a user
  const {
    body: { id, token },
  } = await request(app()).post('/api/users').send(user);

  // Create a blog
  blog.user_id = id;

  const {
    body: { id: firstBlogId },
  } = await request(app())
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog);

  // Create anothor blog
  const {
    body: { id: secondBlogId },
  } = await request(app())
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(blog);

  // Get all blogs by user
  const { body } = await request(app())
    .get('/api/blogs/user')
    .set('Authorization', 'Bearer ' + token);

  expect(body.blogs.length).toEqual(2);
});
