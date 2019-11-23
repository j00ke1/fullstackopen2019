import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from './Input';

const Blog = ({
  user,
  blog,
  like,
  remove,
  isMinimized,
  addComment,
  newComment
}) => {
  if (blog === undefined) {
    return <div>Loading blog...</div>;
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

  const renderComments = comments => {
    if (comments.length === 0) {
      return <div>No comments</div>;
    } else {
      return (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      );
    }
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
      <h3>Comments</h3>
      <Input {...newComment} />
      <button onClick={() => addComment(blog, newComment.value)}>
        Add comment
      </button>
      {renderComments(blog.comments)}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  isMinimized: PropTypes.bool
};

export default Blog;
