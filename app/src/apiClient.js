export const getTasks = async () => (await fetch("/tasks")).json();

export const addTask = async (name) =>
  (
    await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
  ).json();
