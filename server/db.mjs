import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "../.env" });

const pool = new pg.Pool({
  user: "postgres",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

export const getTasks = async () => {
  const { rows } = await pool.query("SELECT * FROM tasks");
  return rows;
};
