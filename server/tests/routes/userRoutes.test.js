const request = require('supertest');

const app = require('../../app');
const UserRepo = require('../../repos/UserRepo');
const Context = require('../context');

let context;
let user;

beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
  user = {
    username: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  };
});

afterAll(() => {
  return context.close();
});

it('can create a user', async () => {
  const startingCount = await UserRepo.userCount();

  await request(app()).post('/api/users').send(user).expect(200);

  const finishCount = await UserRepo.userCount();
  expect(finishCount - startingCount).toEqual(1);
});

it('check a user', async () => {
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  const {
    body: { email },
  } = await request(app()).get(`/api/users/${id}`);
  expect(email).toEqual(email);
});

it('can update a user', async () => {
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  user.email = 'doe@example.com';
  const {
    body: { email },
  } = await request(app()).put(`/api/users/${id}`).send({ email: user.email });
  expect(email).toEqual(user.email);
});

it('can delete a user', async () => {
  const {
    body: { id },
  } = await request(app()).post('/api/users').send(user);

  const {
    body: { email },
  } = await request(app()).delete(`/api/users/${id}`);
  expect(email).toEqual(email);
});
