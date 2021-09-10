import express from "express";

import * as db from "./db.mjs";

const userRouter = express.Router();

userRouter.get("/", async (request, response) =>
  response.json(await db.getUsers()),
);

userRouter
  .get("/:userId", async (request, response) =>
    response.json(await db.getUser(request.params.userId)),
  )
  .delete("/:userId", async (request, response) => {
    await db.deleteUser(request.params.userId);
    response.status(204).end();
  });

userRouter.use(express.json());
userRouter.post("/", async (request, response) => {
  response.status(201).json(await db.addUser(request.body));
});

userRouter.post("/:userId/favoriteEvent", async (request, response) => {
  await db.favoriteEvent(request.params.userId, request.body.eventId);
  return response.status(204).end();
});

userRouter.post("/:userId/unfavoriteEvent", async (request, response) => {
  await db.unfavoriteEvent(request.params.userId, request.body.eventId);
  return response.status(204).end();
});

export default userRouter;
