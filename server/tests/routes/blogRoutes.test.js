const request = require('supertest');

const app = require('../../app');
const BlogRepo = require('../../repos/BlogRepo');
const UserRepo = require('../../repos/UserRepo');
const Context = require('../context');

let context;
let user;
let blog;

beforeAll(async () => {
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
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  blog.user_id = id;

  const {
    body: { title },
  } = await request(app()).post('/api/blogs').send(blog);
  expect(title).toEqual(blog.title);
});

it('can check a blog by id', async () => {
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  blog.user_id = id;

  const {
    body: { id: newBlogId },
  } = await request(app()).post('/api/blogs').send(blog);

  const {
    body: { id: blogId },
  } = await request(app()).get(`/api/blogs/${newBlogId}`);

  expect(blogId).toEqual(newBlogId);
});

it('can update a blog', async () => {
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  blog.user_id = id;

  const {
    body: { id: blogId },
  } = await request(app()).post('/api/blogs').send(blog);

  const {
    body: { title },
  } = await request(app()).put(`/api/blogs/${blogId}`).send({
    title: 'update title',
    content: 'update content',
  });

  expect(title).toEqual('update title');
});

it('can delete a blog', async () => {
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  blog.user_id = id;

  const {
    body: { id: newBlogId },
  } = await request(app()).post('/api/blogs').send(blog);

  const {
    body: { id: blogId },
  } = await request(app()).delete(`/api/blogs/${newBlogId}`);

  expect(newBlogId).toEqual(blogId);
});
