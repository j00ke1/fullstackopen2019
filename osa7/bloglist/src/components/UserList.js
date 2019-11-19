import React from 'react';
import { connect } from 'react-redux';

const UserList = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>
      <table>
        <th></th>
        <th>Blogs</th>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(mapStateToProps, null)(UserList);
