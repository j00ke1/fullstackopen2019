import React from 'react';

const User = ({ user }) => {
  if (user === undefined) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
