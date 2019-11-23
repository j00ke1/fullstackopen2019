const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    });
    res.json(blogs.map(blog => blog.toJSON()));
  } catch (err) {
    next(err);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  if (!req.body.title || !req.body.url) {
    res.status(400).end();
    return;
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
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
    }).populate('user', {
      username: 1,
      name: 1
    });
    res.json(updatedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(req.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.post('/:id/comments', async (req, res, next) => {
  if (!req.body.comment) {
    res.status(400).end();
    return;
  }

  try {
    const blog = await Blog.findById(req.params.id).populate('user', {
      username: 1,
      name: 1
    });
    console.log(blog);
    blog.comments.push(req.body.comment.toString());
    const savedBlog = await blog.save();

    res.status(201).json(savedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
