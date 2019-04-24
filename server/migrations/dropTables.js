import query from './index';

const queryString = 'DROP TABLE IF EXISTS users, accounts, transactions CASCADE';

query(queryString);
