import React, { useState, useEffect } from 'react';

import blogService from '../services/blogs';

const Blog = ({
  blog,
  setBlogs,
  message,
  setMessage,
  messageStyle,
  setMessageStyle,
  successStyle,
  errorStyle,
  user
}) => {
  const [expanded, setExpanded] = useState(true);
  const [likes, setLikes] = useState(blog.likes);

  const showWhenExpanded = { display: expanded ? '' : 'none' };
  const showWhenBlogOwner = {
    display: user.username === blog.user.username ? '' : 'none'
  };

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
    } catch (err) {
      console.error(err);
    }
  };

  const removeBlog = async () => {
    if (
      window.confirm(
        `Do you really want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog);
        const blogs = await blogService.getAll();
        await setBlogs(blogs);
        setMessage(`Blog ${blog.title} removed`);
        setMessageStyle(successStyle);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (err) {
        console.error(err);
      }
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
        <br />
        <button onClick={removeBlog} style={showWhenBlogOwner}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
