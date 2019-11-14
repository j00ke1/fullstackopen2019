const blogs = [
  {
    title: 'Blog 2',
    author: 'Jack Sparrow',
    url: 'blogi.blogipaikka.fi',
    likes: 10,
    user: {
      username: 'ttsil',
      name: 'Tauno Silava',
      id: '5d9b77c3810a7d314c8a5681'
    },
    id: '5d9b8e1fb7bd3e260c10c77c'
  },
  {
    title: 'Test blog 1',
    author: 'Pertti Mikkola',
    url: 'https://url.blog.com',
    likes: 1,
    user: {
      username: 'mpet',
      name: 'Mikko Petteri',
      id: '5d9b7721810a7d314c8a5680'
    },
    id: '5daddfebc0efe643ac59e5a3'
  },
  {
    title: 'Test blog 2',
    author: 'Pertti Mikkola',
    url: 'https://url.blog2.com',
    likes: 2,
    user: {
      username: 'mpet',
      name: 'Mikko Petteri',
      id: '5d9b7721810a7d314c8a5680'
    },
    id: '5dade000c0efe643ac59e5a4'
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

let token;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export default { getAll, setToken };
