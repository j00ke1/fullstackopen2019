import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';

import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

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
    } catch (err) {
      console.error(err);
      /* setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); */
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
