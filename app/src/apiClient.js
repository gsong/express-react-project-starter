let userList = [
  { id: 1, name: "Xiao", email: "xiao@email.com" },
  { id: 2, name: "Natalie", email: "natalie@email.com" },
  { id: 3, name: "Tabitha", email: "tabitha@email.com" },
];

let idSequence = 3;

export const getTasks = () => _get("/api/tasks");

export const addTask = (name) => _post("/api/tasks", { name });

export const getUsers = () => userList;

export const addUser = (user) => {
  const newUser = { ...user, id: (idSequence += 1) };
  userList = [...userList, newUser];
  return newUser;
};

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
