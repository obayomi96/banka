import query from './index';

const queryString = `
  DROP TABLE IF EXISTS users, accounts, transactions CASCADE;

  CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(250) PRIMARY KEY,
    email VARCHAR(250) UNIQUE NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    type VARCHAR(50) DEFAULT 'client',
    "isadmin" BOOLEAN DEFAULT NULL
  );
  CREATE TABLE IF NOT EXISTS accounts(
    id VARCHAR(250) PRIMARY KEY,
    "accountnumber" BIGINT UNIQUE NOT NULL,
    "createdon" TIMESTAMP NOT NULL,
    owner VARCHAR(250) REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft',
    balance NUMERIC(250, 2) DEFAULT 0.00
  );
  CREATE TABLE IF NOT EXISTS transactions(
    id VARCHAR(250) PRIMARY KEY,
    "createdon" TIMESTAMP NOT NULL,
    type VARCHAR(50) NOT NULL,
    "accountnumber" BIGINT REFERENCES accounts("accountnumber") ON DELETE CASCADE,
    cashier VARCHAR(250) REFERENCES users(id),
    amount NUMERIC(250, 2) NOT NULL,
    "oldbalance" NUMERIC(250, 2) NOT NULL,
    "newbalance" NUMERIC(250, 2) NOT NULL
  );
`;

query(queryString);
