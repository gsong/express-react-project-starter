import express from "express";

import * as db from "./db.mjs";

const userRouter = express.Router();

userRouter.get("/", async (request, response) =>
  response.json(await db.getUsers()),
);

userRouter.delete("/:userId", async (request, response) => {
  await db.deleteUser(request.params.userId);
  response.status(204).end();
});

userRouter.use(express.json());
userRouter.post("/", async (request, response) => {
  response.status(201).json(await db.addUser(request.body));
});

export default userRouter;
