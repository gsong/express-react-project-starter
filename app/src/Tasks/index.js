import * as React from "react";

import * as apiClient from "../apiClient";

import styles from "./styles.module.scss";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());
  const addTask = (task) => apiClient.addTask(task).then(loadTasks);

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <section>
      <TaskList {...{ tasks }} />
      <AddTask {...{ addTask }} />
    </section>
  );
};

const TaskList = ({ tasks }) => (
  <ul className={styles.list}>
    {tasks.map(({ id, name, hasImage }) => (
      <li key={id}>
        {name}
        {hasImage ? (
          <img
            src={`/api/tasks/${id}/image`}
            alt={name}
            style={{ width: 200, objectFit: "contain", marginLeft: "1rem" }}
          />
        ) : null}
      </li>
    ))}
  </ul>
);

const AddTask = ({ addTask }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd} className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default Tasks;
