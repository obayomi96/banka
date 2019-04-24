import moment from 'moment';
import query from './index';

const queryString = `
  INSERT INTO users ("firstName", "lastName", email, password, type, "isAdmin") 
  VALUES ('martins', 'obayomi', 'martinsoluwaseun47@gmail.com', 'martinsPW', 'staff', true),
         ('seun', 'chris', 'chris.s@gmail.com', ''chrisPW', 'staff', false);
         
  INSERT INTO users ("firstName", "lastName", email, password) 
  VALUES ('Lara', 'kemi', 'larak.k@gmail.com', 'laraPW'),
         ('john', 'smith', 'jsmith@gmail.com', 'jsmithPW'),
         ('nick', 'doe', 'ndoe@gmail.com', 'nickPW'),
         ('brad', 'dan', 'brad@gmail.com', 'bradPW');
         
  INSERT INTO accounts("accountnumber", "createdOn", owner, type, status, balance) 
  VALUES(178964523, '${moment(new Date())}', 3, 'savings', 'active', 500.54),
        (759681530, '${moment(new Date())}', 7, 'current', 'active', 550.25),
        (325125869, '${moment(new Date())}', 5, 'current', 'dormant', 420.45),
        (542845632, '${moment(new Date())}', 3, 'savings', 'dormant', 252.00);
        
  INSERT INTO transactions("createdOn", type, "accountNumber", cashier, amount, "oldBalance", "newBalance")
  VALUES('${moment(new Date())}', 'credit', 759681530, 2, 100.00.00, 320.65, 420.65),
        ('${moment(new Date())}', 'credit', 325125869, 2, 230.00, 320.65, 550.65),
        ('${moment(new Date())}', 'credit', 178964523, 2, 4555.00, 17500.65, 22055.65),
        ('${moment(new Date())}', 'credit', 874521633, 2, 340.00, 210.65,  550.65),
        ('${moment(new Date())}', 'debit', 5428745632, 2, 500.00, 1500.00, 1000.00),
        ('${moment(new Date())}', 'debit', 759641530, 2, 150.00, 500.00, 350.00);
`;

query(queryString);
