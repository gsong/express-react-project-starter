import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const db = initDb();

export const getTasks = () =>
  db.any(
    'SELECT id, name, (image IS NOT NULL) AS "hasImage" FROM tasks ORDER BY id',
  );

export const getTaskImage = (id) =>
  db.one("SELECT image, mimetype FROM tasks WHERE id=$<id>", { id });

export const addTask = (name, image, mimetype) =>
  db.one(
    "INSERT INTO tasks(name, image, mimetype) VALUES($<name>, $<image>, $<mimetype>) RETURNING *",
    { name, image, mimetype },
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
