import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
console.log('conStr', connectionString);
console.log('nodeEnv', process.env.NODE_ENV);
const client = new Pool({
  connectionString
});

client.connect((err) => {
  console.log('DB error', err);
  if (!err) return console.log('DB connected');
});

export default client;
