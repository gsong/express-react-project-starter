import * as React from "react";

import * as apiClient from "../apiClient";

import styles from "./styles.module.scss";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  const loadUsers = async () => setUsers(await apiClient.getUsers());
  const addUser = async (user) => {
    await apiClient.addUser(user);
    loadUsers();
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className={styles.section}>
      <UserList {...{ users }} />
      <AddUser {...{ addUser }} />
    </section>
  );
};

const UserList = ({ users }) => (
  <ul className={styles.list}>
    {users.map(({ id, name, email }) => (
      <li key={id}>
        {name} ({email})
      </li>
    ))}
  </ul>
);

const AddUser = ({ addUser }) => {
  const onSubmit = (e) => {
    const form = e.currentTarget;
    const user = Object.fromEntries(new FormData(form).entries());

    e.preventDefault();
    addUser(user);
    form.reset();
  };

  return (
    <form {...{ onSubmit }} className={styles.form}>
      <label>
        Name: <input name="name" required />
      </label>
      <label>
        Email: <input name="email" type="email" required />
      </label>
      <button>Add user</button>
    </form>
  );
};

export default Users;
