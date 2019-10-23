import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Input from './components/Input';

import loginService from './services/login';
import blogService from './services/blogs';
import { useField } from './hooks';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState({});

  const username = useField('text');
  const password = useField('password');
  const newTitle = useField('text');
  const newAuthor = useField('text');
  const newUrl = useField('text');

  const blogFormRef = React.createRef();

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
    setSortedBlogs(sortedBlogs);
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async e => {
    try {
      e.preventDefault();
      blogFormRef.current.toggleVisibility();
      const res = await blogService.create({
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      });
      setBlogs(blogs.concat(res));
      newTitle.reset();
      newAuthor.reset();
      newUrl.reset();
      setMessage(`New blog ${res.title} added`);
      setMessageStyle(successStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.error(err);
      setMessage('Error in adding blog');
      setMessageStyle(errorStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      setMessage(`${user.name} logged in`);
      setMessageStyle(successStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.error(err);
      setMessage('Wrong credentials');
      setMessageStyle(errorStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      if (window.confirm('Are you sure you want to log out?')) {
        window.localStorage.removeItem('loggedBlogAppUser');
        setMessage(`${user.name} logged out`);
        setMessageStyle(successStyle);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setMessage('Logout failed');
      setMessageStyle(errorStyle);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} messageStyle={messageStyle} />
        <form onSubmit={handleLogin}>
          <div>
            Username <Input {...username} />
          </div>{' '}
          <div>
            Password <Input {...password} />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} messageStyle={messageStyle} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>

      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <NewBlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
        />
      </Togglable>

      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          message={message}
          setMessage={setMessage}
          successStyle={successStyle}
          errorStyle={errorStyle}
          setMessageStyle={setMessageStyle}
          user={user}
          className='blog'
        />
      ))}
    </div>
  );
};

export default App;
