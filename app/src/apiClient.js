export const getTasks = () => _get("/api/tasks");

export const addTask = (data) => _post("/api/tasks", data);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, { method: "POST", body });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
