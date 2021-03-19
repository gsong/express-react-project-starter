import * as React from "react";

import * as apiClient from "./apiClient";

const App = () => {
  const [tasks, setTasks] = React.useState([]);

  const loadTasks = async () => setTasks(await apiClient.getTasks());

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="App">
      <TaskList tasks={tasks} />
      <AddTask loadTasks={loadTasks} />
    </main>
  );
};

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

const AddTask = ({ loadTasks }) => {
  const [task, setTask] = React.useState("");

  const canAdd = task !== "";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await apiClient.addTask(task);
      loadTasks();
      setTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default App;
