import { useAuth0 as useBaseAuth0 } from "@auth0/auth0-react";
import { parseFullName } from "parse-full-name";

const useAuth0 = () => {
  const { isAuthenticated, user: _user, ...rest } = useBaseAuth0();

  const user = { ..._user };

  if (isAuthenticated && user.sub.startsWith("github")) {
    const name = parseFullName(user.name);
    user.given_name = name.first;
    user.family_name = name.last;
  }

  return { isAuthenticated, user, ...rest };
};

export default useAuth0;
