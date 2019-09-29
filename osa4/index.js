require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
  });

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs);
  });
});

app.post('/api/blogs', (req, res) => {
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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
