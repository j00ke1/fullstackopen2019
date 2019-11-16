import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Input from './components/Input';

import loginService from './services/login';
import blogService from './services/blogs';
import { useField } from './hooks';

import { setMessage, removeMessage } from './reducers/notificationReducer';

const App = props => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

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
      const blogUser = {
        username: user.username,
        name: user.name,
        id: res.user
      };
      res.user = blogUser;
      setBlogs(blogs.concat(res));
      newTitle.reset();
      newAuthor.reset();
      newUrl.reset();
      props.setMessage({
        message: `New blog ${res.title} added`,
        style: successStyle
      });
      setTimeout(() => {
        props.removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      props.setMessage({ message: 'Error in adding blog', style: errorStyle });
      setTimeout(() => {
        props.removeMessage();
      }, 3000);
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
      props.setMessage({
        message: `${user.name} logged in`,
        style: successStyle
      });
      setTimeout(() => {
        props.removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      props.setMessage({ message: 'Wrong credentials', style: errorStyle });
      setTimeout(() => {
        props.removeMessage();
      }, 3000);
    }
  };

  const handleLogout = () => {
    try {
      if (window.confirm('Are you sure you want to log out?')) {
        window.localStorage.removeItem('loggedBlogAppUser');
        props.setMessage({
          message: `${user.name} logged out`,
          style: successStyle
        });
        setTimeout(() => {
          props.removeMessage();
        }, 3000);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      props.setMessage({ message: 'Logout failed', style: errorStyle });
      setTimeout(() => {
        props.removeMessage();
      }, 3000);
    }
  };

  const addLike = async blog => {
    try {
      const updatedBlog = await blogService.update(blog);
      updatedBlog.user = blog.user;
      setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)));
    } catch (err) {
      console.error(err);
    }
  };

  const removeBlog = async blog => {
    if (
      window.confirm(
        `Do you really want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        const removedBlog = blog;
        await blogService.remove(blog);
        setBlogs(blogs.filter(b => b.id !== blog.id));
        props.setMessage({
          message: `Blog ${removedBlog.title} by ${removedBlog.author} removed`,
          style: successStyle
        });
        setTimeout(() => {
          props.removeMessage();
        }, 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
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

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
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

      {blogs.sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          like={addLike}
          remove={removeBlog}
          setBlogs={setBlogs}
          successStyle={successStyle}
          errorStyle={errorStyle}
          user={user}
          className='blog'
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { setMessage, removeMessage };

export default connect(mapStateToProps, mapDispatchToProps)(App);
