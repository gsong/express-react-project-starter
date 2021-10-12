import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = React.useState({
    loading: true,
    error: null,
    apiClient: undefined,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setState({ loading: false, apiClient: makeApi(accessToken) });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};

const makeApi = (accessToken) => {
  const getTasks = () => _get("/api/tasks");
  const addTask = (name) => _post("/api/tasks", { name });

  const _get = async (url) => (await _fetch(url)).json();

  const _post = async (url, body) => {
    const response = await _fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result;
    try {
      result = await response.json();
    } catch {}
    return result;
  };

  const _fetch = (url, options) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return { getTasks, addTask };
};

export default useApi;
