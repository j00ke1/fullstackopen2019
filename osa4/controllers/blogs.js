const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    });
    res.json(blogs.map(blog => blog.toJSON()));
  } catch (err) {
    console.error(err);
  }
});

blogsRouter.post('/', async (req, res) => {
  if (!req.body.title || !req.body.url) {
    res.status(400).end();
    return;
  }

  const user = await User.findOne();

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());
  } catch (err) {
    console.error(err);
  }
});

blogsRouter.put('/:id', async (req, res) => {
  if (!req.body.likes) {
    res.status(400).end();
    return;
  }

  const updated = {
    likes: req.body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updated, {
      new: true
    });
    res.json(updatedBlog.toJSON());
  } catch (err) {
    console.error(err);
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
  }
});

module.exports = blogsRouter;
