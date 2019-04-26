import query from './index';

const queryString = 'DROP users, accounts, transactions CASCADE';

query(queryString);
