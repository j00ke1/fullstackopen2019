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

test('ID field is called id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('A valid blog can be added ', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Jill Doe'
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

afterAll(async () => {
  await mongoose.connection.close();
});
