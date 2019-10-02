const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (accumulator, currentValue) =>
    accumulator + currentValue.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes);
  const max = Math.max(...likes);
  const favorite = blogs.find(blog => blog.likes === max);
  const result = {};
  result.title = favorite.title;
  result.author = favorite.author;
  result.likes = favorite.likes;
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
