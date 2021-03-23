export const getTasks = async () => {
  const response = await fetch("/tasks");
  return response.json();
};

export const addTask = async (name) => {
  const response = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};
