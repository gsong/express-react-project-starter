import express from "express";

import * as db from "./db.mjs";

const app = express();
const port = 4000;

app.get("/tasks", async (req, res) => {
  const tasks = await db.getTasks();
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
