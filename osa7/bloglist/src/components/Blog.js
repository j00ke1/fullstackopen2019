import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ user, blog, like, remove, isMinimized }) => {
  if (blog === undefined) {
    return null;
  }
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

  if (isMinimized) {
    return (
      <div style={blogStyle}>
        <div className='titlerow'>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='hidden'>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes <button onClick={() => like(blog)}>Like</button>
      <br />
      Added by {blog.user.name}
      <br />
      <button onClick={() => remove(blog)} style={showWhenBlogOwner}>
        Remove
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;
