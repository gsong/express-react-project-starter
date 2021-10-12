import express from "express";
import got from "got";

import * as db from "./db.mjs";

const router = express.Router();

router.post("/", async (request, response) => {
  const userInfo = await got
    .get(request.user.aud[1], {
      headers: {
        authorization: request.headers.authorization,
      },
    })
    .json();

  const user = await db.addOrUpdateUser(userInfo);
  response.status(201).json(user);
});

export default router;
