import * as React from "react";

import * as apiClient from "./apiClient";

const App = () => {
  return (
    <main className="App">
      <TaskList />
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

export default App;
