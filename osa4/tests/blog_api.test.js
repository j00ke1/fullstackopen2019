const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

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

afterAll(async () => {
  await mongoose.connection.close();
});
