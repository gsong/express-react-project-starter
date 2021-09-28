import express from "express";
import multer from "multer";

import * as db from "./db.mjs";

const upload = multer({ storage: multer.memoryStorage() });
const taskRouter = express.Router();

taskRouter.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

taskRouter.get("/:id/image", async (request, response) => {
  const { image, mimetype } = await db.getTaskImage(request.params.id);
  response.set("Content-Type", mimetype).send(image);
});

taskRouter.post("/", upload.single("image"), async (request, response) => {
  const task = await db.addTask(
    request.body.name,
    request.file?.buffer,
    request.file?.mimetype,
  );
  response.status(201).json(task);
});

export default taskRouter;
