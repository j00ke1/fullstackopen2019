const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => console.log(err));
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
