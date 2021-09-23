import * as React from "react";

import Events from "./Events";
import Users from "./Users";

const App = () => {
  const [selectedUser, setSelectedUser] = React.useState();

  return (
    <main>
      <Users {...{ selectedUser, setSelectedUser }} />
      <Events {...{ selectedUser }} />
    </main>
  );
};

export default App;
