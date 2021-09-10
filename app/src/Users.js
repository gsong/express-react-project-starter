import * as React from "react";

import * as apiClient from "./apiClient";

const Users = () => {
  const { users, addUser, deleteUser } = useUsers();

  return (
    <section>
      <h1>Users</h1>
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
      <AddUser {...{ addUser }} />
    </section>
  );
};

const AddUser = ({ addUser }) => {
  const onSubmit = (event) => {
    const {
      username: { value: username },
      email: { value: email },
    } = event.currentTarget.elements;

    event.preventDefault();
    addUser({ username, email });
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

const useUsers = () => {
  const [users, setUsers] = React.useState([]);

  const getUsers = () => apiClient.getUsers().then(setUsers);
  const deleteUser = (id) => apiClient.deleteUser(id).then(getUsers);
  const addUser = (user) => apiClient.addUser(user).then(getUsers);

  React.useEffect(() => {
    getUsers();
  }, []);

  return { users, addUser, deleteUser };
};

export default Users;
