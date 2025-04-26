import pg from "pg";
import dotenv from "dotenv";
import { tableSchemas } from "../models/tableSchemas.js";

dotenv.config({ path: "../.env" });

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDB_NAME } = process.env;

const { Client } = pg;

const db = new Client({
  user: PGUSER,
  host: PGHOST,
  database: PGDB_NAME,
  password: PGPASSWORD,
  port: PGPORT,
});
await db.connect();

export const connectDB = async () => {
  try {
    const res = await db.query("SELECT $1::text as message", ["Hello world!"]); //Hellow world to show DB has been connected
    await db.query(tableSchemas); //executes the schema to create the tables first
    console.log(res.rows[0].message, "Database initialized successfully!"); //gets Hello world!
  } catch (err) {
    console.error(err);
  }
  // Im not adding this to the code since this terminates the DB but usually this is the norm:
  // finally {
  //     await db.end();
  //   }
};

export default db;
