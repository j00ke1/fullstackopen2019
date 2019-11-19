import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
  // Link,
  // Redirect,
  // withRouter
} from 'react-router-dom';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Input from './components/Input';
import UserList from './components/UserList';

import loginService from './services/login';
import blogService from './services/blogs';
import { useField } from './hooks';

import { setMessage, removeMessage } from './reducers/notificationReducer';
import { setUser, removeUser } from './reducers/userReducer';
import { initUsers } from './reducers/usersReducer';
import {
  initBlogs,
  createBlog,
  deleteBlog,
  likeBlog
} from './reducers/blogReducer';

const App = ({
  blogs,
  setMessage,
  removeMessage,
  initBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  user,
  setUser,
  removeUser,
  initUsers
}) => {
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
    initBlogs();
  }, [initBlogs]);

  useEffect(() => {
    initUsers();
  }, [initUsers]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [setUser]);

  const addBlog = async e => {
    try {
      e.preventDefault();
      blogFormRef.current.toggleVisibility();
      const newBlog = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      };
      await createBlog(newBlog, user);
      newTitle.reset();
      newAuthor.reset();
      newUrl.reset();
      setMessage({
        message: `New blog ${newBlog.title} added`,
        style: successStyle
      });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Error in adding blog', style: errorStyle });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    }
  };

  const addLike = async blog => {
    try {
      likeBlog(blog);
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
        await deleteBlog(blog);
        setMessage({
          message: `Blog ${removedBlog.title} by ${removedBlog.author} removed`,
          style: successStyle
        });
        setTimeout(() => {
          removeMessage();
        }, 3000);
      } catch (err) {
        console.error(err);
      }
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
      setMessage({
        message: `${user.name} logged in`,
        style: successStyle
      });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Wrong credentials', style: errorStyle });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    }
  };

  const handleLogout = () => {
    try {
      if (window.confirm('Are you sure you want to log out?')) {
        window.localStorage.removeItem('loggedBlogAppUser');
        setMessage({
          message: `${user.name} logged out`,
          style: successStyle
        });
        setTimeout(() => {
          removeMessage();
        }, 3000);
        removeUser();
      }
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Logout failed', style: errorStyle });
      setTimeout(() => {
        removeMessage();
      }, 3000);
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

  if (blogs === []) {
    return null;
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
      <Router>
        <Route
          exact
          path='/'
          render={() => (
            <div>
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
                  user={user}
                  className='blog'
                />
              ))}
            </div>
          )}
        />
        <Route path='/users' render={() => <UserList />} />
      </Router>
    </>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user };
};

const mapDispatchToProps = {
  setMessage,
  removeMessage,
  initBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  setUser,
  removeUser,
  initUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
