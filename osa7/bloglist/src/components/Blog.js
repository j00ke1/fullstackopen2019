import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

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
    return <Redirect to='/' />;
  }
  const showWhenBlogOwner = {
    display: user.username === blog.user.username ? '' : 'none'
  };

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
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
      {blog.likes} likes <Button onClick={() => like(blog)}>Like</Button>
      <br />
      Added by {blog.user.name}
      <br />
      <Button
        variant='danger'
        onClick={() => remove(blog)}
        style={showWhenBlogOwner}
      >
        Remove
      </Button>
      <h3>Comments</h3>
      <Input {...newComment} />
      <Button onClick={() => addComment(blog, newComment.value)}>
        Add comment
      </Button>
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
