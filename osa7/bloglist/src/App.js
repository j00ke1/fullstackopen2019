import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Input from './components/Input';
import UserList from './components/UserList';
import User from './components/User';

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
  likeBlog,
  commentBlog
} from './reducers/blogReducer';

const App = ({
  blogs,
  setMessage,
  removeMessage,
  initBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  commentBlog,
  user,
  setUser,
  removeUser,
  initUsers,
  users,
  history
}) => {
  const username = useField('text');
  const password = useField('password');
  const newTitle = useField('text');
  const newAuthor = useField('text');
  const newUrl = useField('text');
  const newComment = useField('text');

  const blogFormRef = React.createRef();

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
        style: 'success'
      });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Error in adding blog', style: 'danger' });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    }
  };

  const addLike = blog => {
    try {
      likeBlog(blog);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async (blog, comment) => {
    try {
      await commentBlog(blog, comment);
      newComment.reset();
      setMessage({
        message: 'New comment added',
        style: 'success'
      });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Error in adding comment', style: 'danger' });
      setTimeout(() => {
        removeMessage();
      }, 3000);
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
        history.push('/');
        setMessage({
          message: `Blog ${removedBlog.title} by ${removedBlog.author} removed`,
          style: 'success'
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
        style: 'success'
      });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Wrong credentials', style: 'danger' });
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
          style: 'success'
        });
        setTimeout(() => {
          removeMessage();
        }, 3000);
        removeUser();
      }
    } catch (err) {
      console.error(err);
      setMessage({ message: 'Logout failed', style: 'danger' });
      setTimeout(() => {
        removeMessage();
      }, 3000);
    }
  };

  if (user === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <br />
            <Input {...username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <br />
            <Input {...password} />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Login
          </Button>
        </Form>
      </Container>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  const linkStyle = { color: 'white' };

  return (
    <Router>
      <Navbar bg='primary' variant='dark' expand='md'>
        <Container>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as='span'>
                <Link to='/' style={linkStyle}>
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link as='span'>
                <Link to='/users' style={linkStyle}>
                  Users
                </Link>
              </Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              <Navbar.Text className='mr-2'>{user.name} logged in</Navbar.Text>
              <Button variant='outline-light' onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div>
          <h1>Blogs</h1>
          <Notification />
        </div>
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
                  isMinimized={true}
                />
              ))}
            </div>
          )}
        />
        <Route exact path='/users' render={() => <UserList />} />
        <Route
          exact
          path='/users/:id'
          render={({ match }) => (
            <User user={users.find(user => user.id === match.params.id)} />
          )}
        />
        <Route
          exact
          path='/blogs/:id'
          render={({ match }) => (
            <Blog
              blog={blogs.find(b => b.id === match.params.id)}
              like={addLike}
              remove={removeBlog}
              user={user}
              addComment={addComment}
              newComment={newComment}
            />
          )}
        />
      </Container>
    </Router>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user, users: state.users };
};

const mapDispatchToProps = {
  setMessage,
  removeMessage,
  initBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  commentBlog,
  setUser,
  removeUser,
  initUsers
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
