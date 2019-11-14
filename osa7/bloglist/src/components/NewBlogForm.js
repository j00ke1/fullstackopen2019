import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const NewBlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h3>Add new blog</h3>
      <form onSubmit={addBlog}>
        Title:
        <Input {...newTitle} />
        <br />
        Author:
        <Input {...newAuthor} />
        <br />
        URL:
        <Input {...newUrl} />
        <br />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.object.isRequired,
  newAuthor: PropTypes.object.isRequired,
  newUrl: PropTypes.object.isRequired
};

export default NewBlogForm;
