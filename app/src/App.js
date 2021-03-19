import * as React from "react";

import * as apiClient from "./apiClient";

const App = () => {
  return (
    <main className="App">
      <TaskList />
      <AddTask />
    </main>
  );
};

const TaskList = () => {
  const [taskList, setTaskList] = React.useState([]);
  React.useEffect(() => {
    const loadTasks = async () => setTaskList(await apiClient.getTasks());
    loadTasks();
  }, []);

  return (
    <ul>
      {taskList.map((task) => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
};

const AddTask = () => {
  const [task, setTask] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    apiClient.addTask(task);
    setTask("");
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Add task:{" "}
        <input onChange={(e) => setTask(e.currentTarget.value)} value={task} />
      </label>
      <button>Add</button>
    </form>
  );
};

export default App;
