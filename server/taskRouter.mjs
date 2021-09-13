import express from "express";

import * as db from "./db.mjs";

const taskRouter = express.Router();

taskRouter.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

taskRouter.use(express.json());
taskRouter.post("/", async (request, response) => {
  const task = await db.addTask(request.body.name);
  response.status(201).json(task);
});

export default taskRouter;
