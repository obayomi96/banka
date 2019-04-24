import query from './index';

const queryString = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(250) UNIQUE NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    type VARCHAR(50) DEFAULT 'client',
    "isadmin" BOOLEAN DEFAULT NULL
  );
  CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    "accountnumber" BIGINT UNIQUE NOT NULL,
    "createdon" TIMESTAMP NOT NULL,
    owner INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    balance NUMERIC(250, 2) DEFAULT 0.00
  );
  CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    "createdon" TIMESTAMP NOT NULL,
    type VARCHAR(50) NOT NULL,
    "accountnumber" BIGINT REFERENCES accounts("accountNumber") ON DELETE CASCADE,
    cashier INTEGER REFERENCES users(id),
    amount NUMERIC(250, 2) NOT NULL,
    "oldbalance" NUMERIC(250, 2) NOT NULL,
    "newbalance" NUMERIC(250, 2) NOT NULL
  );  
`;

query(queryString);
