import express from "express";
import mime from "mime-types";

import * as db from "./db.mjs";

const app = express();

const tasksRouter = express.Router();
tasksRouter.use(express.json());

tasksRouter.get("/", async (request, response) => {
  const tasks = await db.getTasks();
  response.json(tasks);
});

tasksRouter.post("/", async (request, response) => {
  const { name } = request.body;
  const task = await db.addTask(name);
  response.status(201).json(task);
});

app.use("/api/tasks", tasksRouter);

app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
