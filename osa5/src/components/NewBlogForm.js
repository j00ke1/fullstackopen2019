import React, { useState } from 'react';

import blogService from '../services/blogs';

const NewBlogForm = ({
  blogs,
  setBlogs,
  message,
  setMessage,
  messageStyle,
  setMessageStyle,
  successStyle,
  errorStyle
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = async e => {
    try {
      e.preventDefault();
      const res = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      });
      setBlogs(blogs.concat(res));
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      setMessage(`New blog ${res.title} added`);
      setMessageStyle(successStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.error(err);
      setMessage(`Error in adding blog`);
      setMessageStyle(errorStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

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

export default NewBlogForm;
