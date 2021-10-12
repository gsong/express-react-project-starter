import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

import { Login, Logout } from "../auth";

import styles from "./styles.module.scss";

const Nav = () => (
  <nav className={styles.nav}>
    <NavLink to="/" end>
      Home
    </NavLink>{" "}
    | <NavLink to="dashboard">Dashboard</NavLink> | <Auth />
  </nav>
);

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();

  return isAuthenticated ? (
    <>
      <img src={user.picture} alt="" />
      Hello, {user.given_name} <Logout />
    </>
  ) : (
    <Login />
  );
};

export default Nav;
