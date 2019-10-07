const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'John Doe'
  },
  {
    title: 'Blog 2',
    author: 'Jane Doe'
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('There are two notes', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(initialBlogs.length);
});

test('The first blog is Blog 1', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].title).toBe('Blog 1');
});

test('ID field is called id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Jill Doe',
    url: 'blogspot.com'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map(r => r.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(titles).toContain('Blog 3');
});

test('Likes defaults to 0', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Jack Doe',
    url: 'blogspot.com'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const i = response.body.length - 1;
  const newest = response.body[i];
  expect(newest.likes).toBe(0);
});

test('Return 400 if url missing', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Jack Doe'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(initialBlogs.length);
});

test('Return 400 if title missing', async () => {
  const newBlog = {
    url: 'blog4.blogspot.com',
    author: 'Jack Doe'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(initialBlogs.length);
});

describe('When there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'sekret' });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'pertti',
      name: 'Pertti Mikkola',
      password: 'salainen'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'shorter than the minimum allowed length'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'rooot',
      name: 'Superuser',
      password: 's'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Password missing or too short');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
