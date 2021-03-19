import dotenv from "dotenv";
import pgp from "pg-promise";

dotenv.config({ path: "../.env" });

const db = pgp()({
  user: "postgres",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5442,
});

export const getTasks = async () => await db.any("SELECT * FROM tasks");

export const addTask = async (name) =>
  (
    await db.any("INSERT INTO tasks(name) VALUES($1) RETURNING id, name", [
      name,
    ])
  )[0];
