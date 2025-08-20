import { Pool } from "pg";

export const sql = new Pool({
  connectionString: process.env.SQL_URI,
});

export const connectSQL = async () => {
  try {
    const client = await sql.connect();
    console.log("PostgreSQL connected");

    // release it back to the pool
    client.release();
  } catch (err) {
    console.error("PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
};
