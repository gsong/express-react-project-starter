import express from "express";

import * as db from "./db.mjs";

const eventRouter = express.Router();

eventRouter.get("/", async (request, response) =>
  response.json(await db.getEvents()),
);

eventRouter.delete("/:eventId", async (request, response) => {
  await db.deleteEvent(request.params.eventId);
  response.status(204).end();
});

eventRouter.use(express.json());
eventRouter.post("/", async (request, response) => {
  const event = await db.addEvent(request.body);
  response.status(201).json(event);
});

export default eventRouter;
