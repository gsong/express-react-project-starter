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
    setTaskList(apiClient.getTasks());
  }, []);

  return (
    <ul>
      {taskList.map((task) => (
        <li>{task.name}</li>
      ))}
    </ul>
  );
};

export default App;
