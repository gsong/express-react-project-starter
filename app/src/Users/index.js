import * as React from "react";

import * as apiClient from "../apiClient";

import styles from "./styles.module.scss";

const Users = ({ selectedUser, setSelectedUser }) => {
  const { users, addUser, deleteUser } = useUsers(
    selectedUser,
    setSelectedUser,
  );

  return (
    <section>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, email }) => {
            const isSelected = selectedUser === id;

            return (
              <tr key={id} className={isSelected ? styles.selected : null}>
                <td>{id}</td>
                <td>
                  <a href={`mailto: ${email}`}>{username}</a>
                </td>
                <td>{email}</td>
                <td>
                  <button onClick={() => deleteUser(id)}>Delete</button>
                </td>
                <td>
                  {isSelected ? null : (
                    <button type="button" onClick={() => setSelectedUser(id)}>
                      Select user
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AddUser {...{ addUser }} />
    </section>
  );
};

const AddUser = ({ addUser }) => {
  const onSubmit = (event) => {
    const form = event.currentTarget;
    const {
      username: { value: username },
      email: { value: email },
    } = form.elements;

    event.preventDefault();
    addUser({ username, email });
    form.reset();
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
      <button>Add user</button>
    </form>
  );
};

const useUsers = (selectedUser, setSelectedUser) => {
  const [users, setUsers] = React.useState([]);

  const getUsers = () => apiClient.getUsers().then(setUsers);
  const deleteUser = (id) => apiClient.deleteUser(id).then(getUsers);
  const addUser = (user) => apiClient.addUser(user).then(getUsers);

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    const userIds = users.map((u) => u.id);
    if (selectedUser === undefined || !userIds.includes(selectedUser))
      setSelectedUser(userIds?.[0]);
  }, [users, selectedUser, setSelectedUser]);

  return { users, addUser, deleteUser };
};

export default Users;
