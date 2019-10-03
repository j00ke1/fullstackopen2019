const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs.map(blog => blog.toJSON()));
  } catch (err) {
    console.error(err);
  }
});

blogsRouter.post('/', (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  });

  blog.save().then(result => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
