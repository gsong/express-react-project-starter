import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";

import Nav from "../Nav";
import Tasks from "../Tasks";
import useApi from "../auth/useApi";
import { Protected } from "../auth/widgets";

import styles from "./styles.module.scss";

const App = () => {
  const { isAuthenticated } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser();
    }
  }, [isAuthenticated, loading, apiClient]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Protected component={Dashboard} />}
          />
        </Routes>
      </main>
    </>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
        <p>{process.env.REACT_APP_SUBTITLE}</p>
      </header>
      {isAuthenticated ? <Tasks /> : null}
    </>
  );
};

const Dashboard = () => <h1>Dashboard</h1>;

export default App;
