import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Tasks from "../Tasks";
import Nav from "../widgets/Nav";
import { Protected } from "../widgets/auth";

import styles from "./styles.module.scss";

const App = () => {
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

const Home = () => (
  <>
    <header className={styles.header}>
      <h1>{process.env.REACT_APP_TITLE}</h1>
      <p>{process.env.REACT_APP_SUBTITLE}</p>
    </header>
    <Tasks />
  </>
);

const Dashboard = () => <h1>Dashboard</h1>;

export default App;
