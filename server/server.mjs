import express from "express";

const app = express();
const port = 4000;

app.get("/tasks", (req, res) => {
  res.json([
    { id: 1, name: "End white supremacy" },
    { id: 2, name: "Enact living wage" },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
