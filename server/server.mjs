import express from "express";

import * as db from "./db.mjs";

const app = express();
const port = process.env.PORT || 4000;

process.env?.SERVE_REACT?.toLowerCase() === "true" &&
  app.use(express.static("/app"));

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" })
);

app.get("/tasks", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

app.use(express.json());
app.post("/tasks", async (request, response) => {
  const { name } = request.body;
  const task = await db.addTask(name);
  response.status(201).json(task);
});

app.listen(port, () => {
  console.info(`Example app listening at http://localhost:${port}`);
});
