import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// const connectionString = 'postgres://postgres:pg1996@localhost:5432/banka';
const {
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_DB,
  DB_PORT,
  DB_PASSWORD
} = process.env;

const client = new Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: DATABASE_DB,
  password: DB_PASSWORD,
  port: DB_PORT
});

client.connect((err) => {
  if (!err) return console.log('DB connected');
});

export default client;
