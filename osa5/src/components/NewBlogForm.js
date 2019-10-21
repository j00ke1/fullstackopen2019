import React from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl
}) => {
  return (
    <div>
      <h3>Add new blog</h3>
      <form onSubmit={addBlog}>
        Title:
        <input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
        <br />
        Author:
        <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br />
        URL:
        <input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <br />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  setNewTitle: PropTypes.func.isRequired,
  setNewAuthor: PropTypes.func.isRequired,
  setNewUrl: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
};

export default NewBlogForm;
