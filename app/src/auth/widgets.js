import { withAuthenticationRequired } from "@auth0/auth0-react";

import useAuth0 from "./useAuth0";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={loginWithRedirect}>Log in</button>;
};

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log out
    </button>
  );
};

export const Protected = ({ component, ...props }) => {
  const Component = withAuthenticationRequired(component);
  return <Component {...props} />;
};
