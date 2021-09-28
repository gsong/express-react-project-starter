import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const db = initDb();

export const getTasks = () =>
  db.any(
    'SELECT id, name, (image IS NOT NULL) as "hasImage" FROM tasks ORDER BY id',
  );

export const getTaskImage = (id) =>
  db.one("SELECT image FROM tasks WHERE id=$<id>", { id });

export const addTask = (name) =>
  db.one("INSERT INTO tasks(name) VALUES($<name>) RETURNING *", { name });

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
