import blogService from '../services/blogs';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'INIT_BLOGS':
      return [...state, ...payload];
    case 'NEW_BLOG':
      return [...state, payload];
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== payload);
    case 'LIKE_BLOG':
      return state.map(b => (b.id === payload.id ? payload : b));
    case 'COMMENT_BLOG':
      return state.map(b => (b.id === payload.id ? payload : b));
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    });
  };
};

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    const blogUser = {
      username: user.username,
      name: user.name,
      id: newBlog.user
    };
    newBlog.user = blogUser;
    dispatch({
      type: 'NEW_BLOG',
      payload: newBlog
    });
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch({
      type: 'REMOVE_BLOG',
      payload: blog.id
    });
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog);
    dispatch({
      type: 'LIKE_BLOG',
      payload: updatedBlog
    });
  };
};

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(blog, comment);
    dispatch({
      type: 'COMMENT_BLOG',
      payload: updatedBlog
    });
  };
};
