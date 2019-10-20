import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    borderRadius: '5px'
  };

  if (expanded) {
    return (
      <div style={blogStyle}>
        <div onClick={() => setExpanded(!expanded)}>
          {blog.title} by {blog.author}
          <br />
          <a href={blog.url}>{blog.url}</a>
          <br />
          {blog.likes} likes <button>Like</button>
          <br />
          Added by {blog.user.name}
        </div>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)}>
        {blog.title} by {blog.author}
      </div>
    </div>
  );
};

export default Blog;
