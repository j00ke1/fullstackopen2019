import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async object => {
  const newObject = {
    user: object.user,
    likes: object.likes + 1,
    author: object.author,
    title: object.title,
    url: object.url
  };
  const res = await axios.put(`${baseUrl}/${object.id}`, newObject);
  return res.data;
};

const remove = async object => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.delete(`${baseUrl}/${object.id}`, config);
  return res.data;
};

const comment = async (blog, comment) => {
  const res = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment });
  return res.data;
};

export default { getAll, create, update, remove, comment, setToken };
