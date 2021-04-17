export const getTasks = async () => {
  const response = await fetch("/api/tasks");
  return response.json();
};

export const addTask = async (name) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};
