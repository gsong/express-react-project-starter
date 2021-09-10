import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Events from "./Events";
import Users from "./Users";

const App = () => (
  <>
    <nav>
      <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
    </nav>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  </>
);

const Home = () => (
  <>
    <Users />
    <Events />
  </>
);

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

export default App;
