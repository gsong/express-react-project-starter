import * as React from "react";

import * as apiClient from "./apiClient";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  const getUsers = () => apiClient.getUsers().then(setUsers);
  const deleteUser = (id) => apiClient.deleteUser(id).then(getUsers);

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <ul>
        {users.map(({ id, username, email }) => (
          <li key={id}>
            <dl>
              <dt>ID</dt>
              <dd>{id}</dd>
              <dt>Username</dt>
              <dd>{username}</dd>
              <dt>Email</dt>
              <dd>{email}</dd>
            </dl>
            <button onClick={() => deleteUser(id)}>delete</button>
          </li>
        ))}
      </ul>
      <AddUserForm {...{ getUsers }} />
    </>
  );
};

const AddUserForm = ({ getUsers }) => {
  const onSubmit = (event) => {
    const {
      username: { value: username },
      email: { value: email },
    } = event.currentTarget.elements;

    event.preventDefault();
    apiClient.addUser({ username, email }).then(getUsers);
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Username
        <input name="username" required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <button>add</button>
    </form>
  );
};

export default Users;
