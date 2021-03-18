export const getTasks = async () => (await fetch("/tasks")).json();
