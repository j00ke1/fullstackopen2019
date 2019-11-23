import React from 'react';

const User = ({ user }) => {
  if (user === undefined) {
    return <div>Loading user...</div>;
  }

  const renderBlogs = blogs => {
    if (blogs.length === 0) {
      return <div>This user has not added any blogs.</div>;
    } else {
      return (
        <ul>
          {user.blogs.map((blog, index) => (
            <li key={index}>{blog.title}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {renderBlogs(user.blogs)}
    </div>
  );
};

export default User;
