import express from "express";
import mm from "mmmagic";

import * as db from "./db.mjs";

const taskRouter = express.Router();

taskRouter.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

taskRouter.get("/:id/image", async (request, response) => {
  const { image } = await db.getTaskImage(request.params.id);

  new mm.Magic(mm.MAGIC_MIME_TYPE).detect(image, (err, result) => {
    response.set("Content-Type", result).send(image);
  });
});

taskRouter.use(express.json());
taskRouter.post("/", async (request, response) => {
  const task = await db.addTask(request.body.name);
  response.status(201).json(task);
});

export default taskRouter;
