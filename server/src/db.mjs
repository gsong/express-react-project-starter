import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const db = initDb();

export const getUsers = () => db.any("SELECT * FROM users");

export const getUser = (id) => {
  const sql = `SELECT users.*, ARRAY_AGG(event_id) favorites
  FROM users LEFT JOIN favorite_events ON id = user_id
  WHERE id = $<id> GROUP BY id
  `;

  return db.one(sql, { id });
};

export const addUser = (user) =>
  db.one(
    "INSERT INTO users(username, email) VALUES($<username>, $<email>) RETURNING *",
    user,
  );

export const deleteUser = (userId) =>
  db.none("DELETE FROM users WHERE id = $<userId>", { userId });

export const favoriteEvent = (userId, eventId) =>
  db.none(
    "INSERT INTO favorite_events(user_id, event_id) VALUES($<userId>, $<eventId>)",
    { userId, eventId },
  );

export const unfavoriteEvent = (userId, eventId) =>
  db.none(
    "DELETE FROM favorite_events WHERE user_id = $<userId> AND event_id = $<eventId>",
    { userId, eventId },
  );

export const getEvents = () => db.any("SELECT * FROM events");

export const addEvent = (event) =>
  db.one(
    "INSERT INTO events(name, date, category) VALUES($<name>, $<date>, $<category>) RETURNING *",
    event,
  );

export const deleteEvent = (eventId) =>
  db.none("DELETE FROM events WHERE id = $<eventId>", { eventId });

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
