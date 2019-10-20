import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState({});
  // const [blogFormVisible, setBlogFormVisible] = useState(false);

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

  // const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
  // const showWhenVisible = { display: blogFormVisible ? '' : 'none' };

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
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
        window.localStorage.removeItem('loggedBlogappUser');
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
            Username{' '}
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>{' '}
          <div>
            Password{' '}
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
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
      {/* <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>Add new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          message={message}
          setMessage={setMessage}
          successStyle={successStyle}
          errorStyle={errorStyle}
          setMessageStyle={setMessageStyle}
        />
        <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
      </div> */}

      <Togglable buttonLabel='Add new blog'>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          message={message}
          setMessage={setMessage}
          successStyle={successStyle}
          errorStyle={errorStyle}
          setMessageStyle={setMessageStyle}
        />
      </Togglable>

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
