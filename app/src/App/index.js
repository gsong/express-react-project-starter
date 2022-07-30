import * as React from "react";

import gcal from "react-google-calendar-api";
import { Routes, Route, NavLink } from "react-router-dom";

import Tasks from "../Tasks";

import styles from "./styles.module.scss";

const App = () => (
  <>
    <header>
      <nav className={styles.nav}>
        <NavLink to="/" end>
          Home
        </NavLink>{" "}
        | <NavLink to="dashboard">Dashboard</NavLink>
      </nav>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  </>
);

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(gcal.sign);

  React.useEffect(() => {
    gcal.onLoad(() => {
      setIsAuthenticated(gcal.gapi.auth2.getAuthInstance().isSignedIn.get());
      gcal.listenSign((sign) => setIsAuthenticated(sign));
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
        <p>{process.env.REACT_APP_SUBTITLE}</p>
      </header>

      <Login {...{ isAuthenticated }} />
      {isAuthenticated ? <Events /> : null}
      <Tasks />
    </>
  );
};

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

const Login = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <button onClick={gcal.handleSignoutClick}>Log out</button>
  ) : (
    <button onClick={gcal.handleAuthClick}>Log in</button>
  );

const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    gcal
      .listUpcomingEvents(10)
      .then(({ result: { items } }) => setEvents(items));
  }, []);

  return events.length === 0 ? null : (
    <ul>
      {events.map((event) => (
        <li key={event.id}>{event.summary}</li>
      ))}
    </ul>
  );
};

export default App;
