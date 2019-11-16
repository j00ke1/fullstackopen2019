import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = props => {
  const [expanded, setExpanded] = useState(false);

  const showWhenExpanded = { display: expanded ? '' : 'none' };
  const showWhenBlogOwner = {
    display: props.user.username === props.blog.user.username ? '' : 'none'
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
        {props.blog.title} by {props.blog.author}
      </div>
      <div style={showWhenExpanded} className='hidden'>
        <a href={props.blog.url}>{props.blog.url}</a>
        <br />
        {props.blog.likes} likes{' '}
        <button onClick={() => props.like(props.blog)}>Like</button>
        <br />
        Added by {props.blog.user.name}
        <br />
        <button
          onClick={() => props.remove(props.blog)}
          style={showWhenBlogOwner}
        >
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
