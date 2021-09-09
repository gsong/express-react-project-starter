export const getUsers = async () => _get("/api/users");

export const addUser = async (user) => _post("/api/users", user);

export const deleteUser = async (userId) => _delete(`/api/users/${userId}`);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
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

const _delete = (url) => fetch(url, { method: "DELETE" });
