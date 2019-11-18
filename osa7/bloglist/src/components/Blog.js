import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ user, blog, like, remove }) => {
  const [expanded, setExpanded] = useState(false);

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

  return (
    <div style={blogStyle}>
      <div className='titlerow' onClick={() => setExpanded(!expanded)}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenExpanded} className='hidden'>
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
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;
