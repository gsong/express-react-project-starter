import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const db = initDb();

export const getEvents = () => db.any("SELECT * FROM events");

export const addEvent = (event) =>
  db.one(
    "INSERT INTO events(name, date, category) VALUES(${name}, ${date}, ${category}) RETURNING *",
    event,
  );

export const deleteEvent = (eventId) =>
  db.none("DELETE FROM events WHERE id = ${eventId}", { eventId });

export const getUsers = () => db.any("SELECT * FROM users");

export const addUser = (user) =>
  db.one(
    "INSERT INTO users(username, email) VALUES(${username}, ${email}) RETURNING *",
    user,
  );

export const deleteUser = (userId) =>
  db.none("DELETE FROM users WHERE id = ${userId}", { userId });

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
