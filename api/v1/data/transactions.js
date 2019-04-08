const Transactions = [
  {
    id: 1,
    createdOn: new Date(),
    type: 'Credit', // credit or debit
    accountNumber: 22399029393,
    cashier: 2, // cashier who consummated the transaction
    amount: 230.00,
    oldbalance: 320.65,
    newBalance: 550.65
  },
  {
    id: 2,
    createdOn: new Date(),
    type: 'Credit', // credit or debit
    accountNumber: 20345661020,
    cashier: 2, // cashier who consummated the transaction
    amount: 100.00,
    oldbalance: 320.65,
    newBalance: 420.65
  },
  {
    id: 3,
    createdOn: new Date(),
    type: 'Credit', // credit or debit
    accountNumber: 2076648895,
    cashier: 2, // cashier who consummated the transaction
    amount: 4555.00,
    oldbalance: 17500.65,
    newBalance: 22055.65
  },
  {
    id: 4,
    createdOn: new Date(),
    type: 'Credit', // credit or debit
    accountNumber: 2045549564,
    cashier: 2, // cashier who consummated the transaction
    amount: 340.00,
    oldbalance: 210.65,
    newBalance: 550.65
  }];

export default Transactions;
