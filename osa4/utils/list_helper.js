const _ = require('lodash');

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

const mostBlogs = blogs => {
  const authors = _.countBy(blogs, 'author');
  const authorCounts = _.values(authors);
  const max = _.max(authorCounts);
  const favBlogger = _.findKey(authors, o => o === max);
  const result = {};
  result.author = favBlogger;
  result.blogs = max;
  return result;
};

const mostLikes = blogs => {
  const allAuthors = [];
  let topLikes = 0;
  const authors = _.map(blogs, 'author');
  const uniqAuthors = _.uniq(authors);

  for (let i = 0; i < uniqAuthors.length; i++) {
    const lad = uniqAuthors[i];
    const filtered = _.filter(blogs, ['author', lad]);
    const totalLikes = _.reduce(
      filtered,
      (acc, cur) => {
        return acc + cur.likes;
      },
      0
    );

    if (totalLikes > topLikes) {
      topLikes = totalLikes;
    }
    const result = {};
    result.author = lad;
    result.likes = totalLikes;
    allAuthors.push(result);
  }

  const mostLikedBlogger =
    allAuthors[_.findKey(allAuthors, o => o.likes === topLikes)].author;
  const output = {};
  output.author = mostLikedBlogger;
  output.likes = topLikes;
  return output;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
