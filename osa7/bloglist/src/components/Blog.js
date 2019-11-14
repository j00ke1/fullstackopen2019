import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import blogService from '../services/blogs';

import { setMessage, removeMessage } from '../reducers/notificationReducer';

const Blog = props => {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(props.blog.likes);

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

  useEffect(() => {
    blogService.getAll().then(blogs => {
      props.setBlogs(blogs);
    });
  }, [likes, props.setBlogs]);

  const addLike = async () => {
    try {
      const res = await blogService.update(props.blog);
      setLikes(res.likes);
    } catch (err) {
      console.error(err);
    }
  };

  const removeBlog = async () => {
    if (
      window.confirm(
        `Do you really want to remove ${props.blog.title} by ${props.blog.author}?`
      )
    ) {
      try {
        await blogService.remove(props.blog);
        const blogs = await blogService.getAll();
        await props.setBlogs(blogs);
        props.setMessage({
          message: `Blog ${props.blog.title} removed`,
          style: props.successStyle
        });
        setTimeout(() => {
          props.removeMessage();
        }, 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div className='titlerow' onClick={() => setExpanded(!expanded)}>
        {props.blog.title} by {props.blog.author}
      </div>
      <div style={showWhenExpanded} className='hidden'>
        <a href={props.blog.url}>{props.blog.url}</a>
        <br />
        {props.blog.likes} likes <button onClick={addLike}>Like</button>
        <br />
        Added by {props.blog.user.name}
        <br />
        <button onClick={removeBlog} style={showWhenBlogOwner}>
          Remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  successStyle: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  setMessage,
  removeMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
