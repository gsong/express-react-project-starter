import express from "express";

import * as db from "./db.mjs";

const app = express();
const port = 4000;

app.get("/tasks", async (req, res) => res.json(await db.getTasks()));

app.use(express.json());
app.post("/tasks", async (req, res) => {
  const { name } = req.body;
  res.json(await db.addTask(name));
});

app.listen(port, () => {
  console.info(`Example app listening at http://localhost:${port}`);
});
