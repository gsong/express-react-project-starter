import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const db = initDb();

export const getEvents = async () => db.any("SELECT * FROM events");

export const addEvent = async (event) =>
  await db.one(
    "INSERT INTO events(name, date, category) VALUES(${name}, ${date}, ${category}) RETURNING *",
    event,
  );

export const deleteEvent = async (eventId) =>
  await db.none("DELETE FROM events WHERE id = ${eventId}", { eventId });

export const getUsers = async () => db.any("SELECT * FROM users");

export const addUser = async (user) =>
  await db.one(
    "INSERT INTO users(username, email) VALUES(${username}, ${email}) RETURNING *",
    user,
  );

export const deleteUser = async (userId) =>
  await db.none("DELETE FROM users WHERE id = ${userId}", { userId });

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
