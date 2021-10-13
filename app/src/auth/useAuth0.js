import { useAuth0 as useBaseAuth0 } from "@auth0/auth0-react";
import { parseFullName } from "parse-full-name";

const useAuth0 = () => {
  const { isAuthenticated, user: _user, ...rest } = useBaseAuth0();
  const user = isAuthenticated ? decorateUser(_user) : _user;
  return { isAuthenticated, user, ...rest };
};

const decorateUser = (user) => {
  const name = parseFullName(user.name);
  return {
    given_name: name.first,
    family_name: name.last,
    email: null,
    ...user,
  };
};

export default useAuth0;
