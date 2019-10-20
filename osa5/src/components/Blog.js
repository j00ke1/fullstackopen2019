import React, { useState, useEffect } from 'react';

import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs }) => {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenExpanded = { display: expanded ? '' : 'none' };

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    borderRadius: '5px'
  };

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
    });
  }, [likes, setBlogs]);

  const addLike = async () => {
    try {
      const res = await blogService.update(blog);
      setLikes(res.likes);
      console.log('Like added');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenExpanded}>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={addLike}>Like</button>
        <br />
        Added by {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
